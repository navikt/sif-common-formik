import { ValidationFunction, ValidationResult } from '../types';

export const validateAll = (validation: ValidationFunction<any>[]) => (value) => {
    let result: ValidationResult<any>;
    validation.some((validate) => {
        const r = validate(value);
        if (r) {
            result = r;
            return true;
        }
        return false;
    });
    return result;
};
