import { isISODateString } from 'nav-datovelger';
import { FieldValidationResult } from '../../types/fieldValidation';

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
