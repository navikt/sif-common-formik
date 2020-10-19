import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import { FormikDatepickerValue } from './FormikDatepicker';

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

const createFieldValidationError = <T extends string>(key: T | undefined, values?: any): FieldValidationResult => {
    return key
        ? {
              key,
              values,
          }
        : undefined;
};

export const validateFormikDatepickerDate = (
    value: FormikDatepickerValue | undefined,
    errorKey: string
): FieldValidationResult => {
    const { dateString = '' } = value || {};
    if (dateString.trim() === '') {
        return undefined;
    }
    if (isISODateString(dateString) === false) {
        return createFieldValidationError(errorKey);
    }
    return undefined;
};
