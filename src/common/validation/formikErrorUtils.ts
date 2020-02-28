import { IntlShape } from 'react-intl';
import flatten from 'flat';
import { FieldInputProps, FormikErrors, FormikProps, getIn } from 'formik';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { isFieldValidationError, renderFieldValidationError } from './fieldValidationRenderUtils';
import { getValidationErrorWithIntl } from './validationIntlUtils';

interface ErrorNodeInObject {
    field: string;
    error: {
        key: string;
        values: object;
    };
}

export const getFieldValidationErrors = <FormValues>(
    elementName: string,
    errors: FormikErrors<FormValues>
): FormikErrors<FormValues> | undefined => {
    return getIn(errors, elementName);
};

export const getFieldErrorMessage = (
    field: FieldInputProps<any>,
    form: FormikProps<any>,
    intl: IntlShape
): React.ReactNode | undefined => {
    if (isValidationErrorsVisible(form)) {
        return getValidationErrorWithIntl(intl, form.errors, field.name);
    }
    return undefined;
};

export const isValidationErrorsVisible = (form: FormikProps<any>): boolean => {
    if (form) {
        const { status: formikStatus, submitCount } = form;
        return formikStatus !== undefined && formikStatus.stepSubmitCount !== undefined
            ? submitCount > formikStatus.stepSubmitCount
            : formikStatus?.showErrors === true;
    }
    return true;
};

export function resetFieldValue<T extends string, FormDataType>(
    fieldName: T,
    setFieldValue: (field: string, value: any) => void,
    initialValues: FormDataType
) {
    setFieldValue(fieldName, initialValues[fieldName as string]);
}

export function resetFieldValues<T extends string, FormDataType>(
    fieldNames: T[],
    setFieldValue: (field: string, value: any) => void,
    initialValues: FormDataType
) {
    fieldNames.forEach((fieldName) => resetFieldValue(fieldName, setFieldValue, initialValues));
}

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

export function getValidationSummaryErrors<FormValues>(
    formik: FormikProps<FormValues>,
    intl: IntlShape
): FeiloppsummeringFeil[] | undefined {
    const { errors } = formik;
    if (errors) {
        const numberOfErrors = Object.keys(errors).length;
        const errorMessages: FeiloppsummeringFeil[] = [];

        if (numberOfErrors > 0 && isValidationErrorsVisible(formik)) {
            const allErrors = flattenFieldArrayErrors(errors);
            Object.keys(allErrors).forEach((key) => {
                const error = allErrors[key];
                const message = isFieldValidationError(error) ? renderFieldValidationError(intl, error) : error;
                if (message && typeof message === 'string') {
                    errorMessages.push({
                        skjemaelementId: key,
                        feilmelding: message
                    });
                }
            });

            if (errorMessages.length > 0) {
                return errorMessages;
            }
        }
    }
    return undefined;
}
