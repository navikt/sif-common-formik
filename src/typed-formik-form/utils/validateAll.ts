import { FormikValidateFunction } from '../types';
import { FieldValidationArray, FieldValidationResult } from '../types/fieldValidation';

export const validateAll: FieldValidationArray = (validations: FormikValidateFunction[]) => (
    value: any,
    field?: string
): FieldValidationResult => {
    let result: FieldValidationResult;
    validations.some((validate) => {
        const r = validate(value, field);
        if (r) {
            result = r;
            return true;
        }
        return false;
    });
    return result;
};
