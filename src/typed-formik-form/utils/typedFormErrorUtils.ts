import flatten from 'flat';
import { FieldInputProps, FormikErrors, FormikProps, getIn } from 'formik';
import { TypedFormikFormContextType } from '../components/typed-formik-form/TypedFormikForm';
import { NavFrontendSkjemaFeil } from '../types';

interface FlattendErrors {
    [key: string]: string;
}

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
    const searchString = '.';
    if (flattenedKey.indexOf(searchString) >= 0) {
        const a = flattenedKey.slice().split(searchString);
        if (a[0]) {
            return a[0];
        }
    }
    return undefined;
};

export const flattenFieldErrors = (errors: any) => {
    const flatErrors = flatten(errors) as FlattendErrors;
    const allErrorKeys = Object.keys(flatErrors);
    const flattendFieldErrors = {};
    allErrorKeys.forEach((key) => {
        if (flatErrors[key] && flatErrors[key] !== null) {
            flattendFieldErrors[key] = flatErrors[key];
        }
    });
    return flattendFieldErrors;
};

export function getAndFlattenAllErrors<FormValues>(
    errors: FormikErrors<FormValues>
): FormikErrors<FormValues> | undefined {
    if (errors) {
        const numberOfErrors = Object.keys(errors).length;
        if (numberOfErrors > 0) {
            return flattenFieldErrors(errors);
        }
    }
    return undefined;
}

export function getAllErrors<FormValues>(formik: FormikProps<FormValues>): FormikErrors<FormValues> | undefined {
    return isValidationErrorsVisible(formik) ? getAndFlattenAllErrors(formik.errors) : undefined;
}
