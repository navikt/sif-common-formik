import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';

/**
 * Midlertidig plassering av kode
 * Todo - flytte all validation til sif-common-soknad
 *
 * */

type valueFunction = (intl: IntlShape) => string;

interface FieldValidationResultValues {
    [key: string]: string | number | Date | valueFunction | undefined;
}

interface IntlFieldValidationError {
    key: string;
    values?: FieldValidationResultValues;
}

type FieldValidationResult = IntlFieldValidationError | undefined | void;

declare type FormikValidateFunction = (value: any) => any;

type FieldValidationArray = (validations: FormikValidateFunction[]) => (value: any) => FieldValidationResult;

export const validateAll: FieldValidationArray = (validations: FormikValidateFunction[]) => (
    value: any
): FieldValidationResult => {
    let result: FieldValidationResult;
    validations.some((validate) => {
        const r = validate(value);
        if (r) {
            result = r;
            return true;
        }
        return false;
    });
    return result;
};

export const validateDateString = (dateString = '', errorIntlKey: string): FieldValidationResult => {
    if (dateString !== undefined && dateString !== '' && isISODateString(dateString) === false) {
        return {
            key: errorIntlKey,
            values: { dateString },
        };
    }
    return undefined;
};
