import { ValidationFunction, ValidationResult } from './types';

export const validateAll: ValidationFunction<any> = (validation: any) => (value) => {
    let result: ValidationResult<any>;
    if (Array.isArray(validation)) {
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
