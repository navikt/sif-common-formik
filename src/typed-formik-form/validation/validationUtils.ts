import { ValidationResult } from './types';

export const hasValue = (value: any): boolean => value !== '' && value !== undefined && value !== null;

export const validateAll = <ResultType = string>(validations: Array<() => ValidationResult<any>>): ResultType => {
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
