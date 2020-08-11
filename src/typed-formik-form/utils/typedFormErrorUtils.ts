import flatten from 'flat';
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

export const returnAllInFrontOfKey = (input: string): string | undefined => {
    let searchString = '.key';
    if (input.indexOf(searchString) >= 0 ) {
        const a = input.slice().split(searchString);
        if (a[0]) {
            return a[0];
        }
    }
    return undefined;
};

export const flattenFieldErrors = (input: any) => {
    const flattened = flatten(input);
    console.info(JSON.stringify(flattened, null, 4))
    const keysInFlattened = Object.keys(flattened);
    const mutatingResult = {};
    keysInFlattened.forEach((key) => {
        const maybeKey = returnAllInFrontOfKey(key);
        if (maybeKey) {
            mutatingResult[maybeKey] = {
                key: flattened[maybeKey + '.key'],
                values: flattened[maybeKey + '.values'],
            };
        }
    });
    return mutatingResult;
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
