import {
    FormikFieldValidation,
    FormikFieldValidationResult,
    FormikValidateFieldFunction,
} from '../types/fieldValidation';

export const validateFormikField = (validation: FormikFieldValidation): FormikValidateFieldFunction<any> => (
    value
): FormikFieldValidationResult => {
    if (Array.isArray(validation)) {
        let result: FormikFieldValidationResult;
        validation.some((validate) => {
            const r = validate(value);
            if (r) {
                result = r;
                return true;
            }
            return false;
        });
        return result;
    }
    return validation(value);
};
