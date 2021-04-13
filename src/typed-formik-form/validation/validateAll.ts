import { ValidationResult } from './types';

export const validateAll = (validation: any) => (value): ValidationResult => {
    if (Array.isArray(validation)) {
        let result: ValidationResult | undefined;
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
