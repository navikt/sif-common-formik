import { FieldInputProps, FormikErrors, FormikProps, getIn } from 'formik';
import { TypedFormikFormContextType } from '../components/typed-formik-form/TypedFormikForm';
import { NavFrontendSkjemaFeil } from '../types';

export const getFeilPropForFormikInput = ({
    feil,
    field,
    form,
    context,
}: {
    feil: NavFrontendSkjemaFeil;
    field: FieldInputProps<any>;
    form: FormikProps<any>;
    context?: TypedFormikFormContextType;
}): NavFrontendSkjemaFeil | undefined => {
    return feil || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined);
};

export const getErrorForField = <FormValues>(
    elementName: string,
    errors: FormikErrors<FormValues>
): any | undefined => {
    const fieldErrors: Array<string> | string = getIn(errors, elementName);
    if (fieldErrors === null) {
        return undefined;
    }
    if (Array.isArray(fieldErrors)) {
        if (fieldErrors.length === 1 && fieldErrors[0] === null) {
            /** Filter out fieldArray errors containing only null item */
            return undefined;
        }
        if (fieldErrors.length >= 1) {
            return fieldErrors[0];
        }
    } else {
        return fieldErrors;
    }
};

export const isValidationErrorsVisible = (formik: FormikProps<any>): boolean => {
    return formik?.status?.showErrors === true;
};

export const getAllFieldsWithErrors = (errors: any, keys: string[] = [], parentKey?: string): string[] => {
    const createFieldKey = (fieldName: string): string => {
        return parentKey ? `${parentKey}.${fieldName}` : fieldName;
    };
    if (errors) {
        Object.keys(errors).forEach((key) => {
            const error = errors[key];
            if (Array.isArray(error)) {
                error.forEach((err, idx) => {
                    getAllFieldsWithErrors(err, keys, createFieldKey(`${key}.${idx}`));
                });
            } else {
                keys.push(createFieldKey(key));
            }
        });
    }

    return keys;
};
