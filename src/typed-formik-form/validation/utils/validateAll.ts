import { ValidationResult } from '../types';

const validateAll = (validations: Array<() => ValidationResult<any>>) => {
    let result: ValidationResult<any>;
    validations.some((validateFunc) => {
        const validationResult = validateFunc();
        if (validationResult) {
            result = validationResult;
            return true;
        }
        return false;
    });
    return result;
};

export default validateAll;
