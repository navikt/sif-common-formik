import flatten from 'flat';
import { FieldInputProps, FormikErrors, FormikProps, getIn } from 'formik';
import { TypedFormikFormContextType } from '../components/typed-formik-form/TypedFormikForm';
import { NavFrontendSkjemaFeil } from '../types';

interface ErrorNodeInObject {
    field: string;
    error: {
        key: string;
        values: object;
    };
}

export const getFeilPropForFormikInput = ({
    feil,
    field,
    form,
    context
}: {
    feil: NavFrontendSkjemaFeil;
    field: FieldInputProps<any>;
    form: FormikProps<any>;
    context?: TypedFormikFormContextType;
}): NavFrontendSkjemaFeil | undefined => {
    return feil || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined);
};

export const getErrorsForField = <FormValues>(
    elementName: string,
    errors: FormikErrors<FormValues>
): FormikErrors<FormValues> | undefined => {
    const fieldErrors = getIn(errors, elementName);
    if (Array.isArray(fieldErrors) && fieldErrors.length === 1 && fieldErrors[0] === null) {
        // Filter out fieldArray errors containing only null item
        return undefined;
    }
    return fieldErrors;
};

export const isValidationErrorsVisible = (formik: FormikProps<any>): boolean => {
    return formik?.status?.showErrors === true;
};

export function flattenFieldArrayErrors<FormValues>(errors: FormValues): FormValues {
    let allErrors: any = {};
    Object.keys(errors).forEach((key) => {
        const error = errors[key];
        if (isFieldArrayErrors(error)) {
            (error as FormValues[]).forEach((err, idx) => {
                allErrors = {
                    ...allErrors,
                    ...(err ? getErrorsFromFieldArrayErrors(err, key, idx) : undefined)
                };
            });
        } else if (error.key) {
            allErrors[key] = error;
        } else if (typeof error === 'object') {
            const errorNode = findErrorNodeInObject(key, error);
            if (errorNode) {
                allErrors[errorNode.field] = errorNode.error;
            }
        }
    });
    return allErrors;
}

const findErrorNodeInObject = (key: string, error: object): undefined | ErrorNodeInObject => {
    const flatError: object = flatten({ [key]: error });
    const keys = Object.keys(flatError);
    if (keys.length === 2) {
        const field = keys[0].split('.key')[0];
        return {
            field,
            error: {
                key: flatError[keys[0]],
                values: flatten.unflatten(flatError[keys[1]])
            }
        };
    }
    return undefined;
};

const isFieldArrayErrors = (error: any): boolean => {
    if (typeof error === 'object' && error.length && error.length > 0) {
        return true;
    }
    return false;
};

function getErrorsFromFieldArrayErrors<FieldName>(field: FieldName, fieldArrayKey: string, index: number): {} {
    const errors: any = {};
    Object.keys(field).forEach((key) => {
        errors[`${fieldArrayKey}.${index}.${key}`] = field[key];
    });
    return errors;
}

function removeNullArrayErrors(errors: FormikErrors<any>) {
    const filteredErrors = {};
    Object.keys(errors).forEach((key) => {
        const error = errors[key];
        if (error && Array.isArray(error) && error.length === 1 && error[0] === null) {
            return;
        } else {
            filteredErrors[key] = error;
        }
    });
    return filteredErrors;
}

export function getAllErrors<FormValues>(formik: FormikProps<FormValues>): FormikErrors<FormValues> | undefined {
    const errors = formik.errors ? removeNullArrayErrors(formik.errors) : undefined;
    if (errors) {
        const numberOfErrors = Object.keys(errors).length;
        if (numberOfErrors > 0 && isValidationErrorsVisible(formik)) {
            return flattenFieldArrayErrors(errors);
        }
    }
    return undefined;
}
