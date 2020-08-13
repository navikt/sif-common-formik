import flatten, { unflatten } from 'flat';
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

export const returnAllInFrontOfKey = (flattenedKey: string): string | undefined => {
    const searchString = '.key';
    if (flattenedKey.indexOf(searchString) >= 0) {
        const a = flattenedKey.slice().split(searchString);
        if (a[0]) {
            return a[0];
        }
    }
    return undefined;
};

interface FlattendErrors {
    [key: string]: any;
}

const getValuesForFlattenedKey = (flatErrors: FlattendErrors, errorKey: string): any => {
    const allErrorKeys = Object.keys(flatErrors);
    const valueKeys = allErrorKeys.filter((key) => key.indexOf(`${errorKey}.values`) >= 0);
    if (valueKeys.length > 0) {
        const values = {};
        valueKeys.forEach((key) => {
            const valueKey = key.substr(key.indexOf(`.values`) + 8);
            values[valueKey] = unflatten(flatErrors[key]);
        });
        return values;
    }
    return undefined;
};

export const flattenFieldErrors = (errors: any) => {
    const flatErrors = flatten(errors) as FlattendErrors;
    const allErrorKeys = Object.keys(flatErrors);
    const flattendFieldErrors = {};
    allErrorKeys.forEach((key) => {
        const errorKey = returnAllInFrontOfKey(key);
        if (errorKey) {
            const values = getValuesForFlattenedKey(flatErrors, errorKey);
            flattendFieldErrors[errorKey] = {
                key: flatErrors[errorKey + '.key'],
                values,
            };
        }
    });
    return flattendFieldErrors;
};

export function getAllErrors<FormValues>(formik: FormikProps<FormValues>): FormikErrors<FormValues> | undefined {
    const errors = formik && formik.errors && Object.keys(formik.errors).length > 0 ? formik.errors : undefined;
    if (errors) {
        const numberOfErrors = Object.keys(errors).length;
        if (numberOfErrors > 0 && isValidationErrorsVisible(formik)) {
            return flattenFieldErrors(errors);
        }
    }
    return undefined;
}
