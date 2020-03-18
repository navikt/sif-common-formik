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
    return getIn(errors, elementName);
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
                    ...getErrorsFromFieldArrayErrors(err, key, idx)
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

export function getAllErrors<FormValues>(formik: FormikProps<FormValues>): FormikErrors<FormValues> | undefined {
    const { errors } = formik;
    if (errors) {
        const numberOfErrors = Object.keys(errors).length;
        if (numberOfErrors > 0 && isValidationErrorsVisible(formik)) {
            return flattenFieldArrayErrors(errors);
        }
    }
    return undefined;
}
