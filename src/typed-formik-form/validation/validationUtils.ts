import { CustomError, isIntlErrorObject, ValidationError, ValidationResult } from './types';

export const hasValue = (value: any): boolean => value !== '' && value !== undefined && value !== null;

export const validateAll = <ResultType = string>(
    validations: Array<() => ValidationResult<ValidationError>>
): ResultType => {
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

export const getErrorOrCustomError = (
    error: ValidationError | undefined,
    customErrors: { [key: string]: CustomError }
): ValidationError | undefined => {
    if (!error) {
        return undefined;
    }
    const errorKey = isIntlErrorObject(error) ? error.key : error;
    const customErrorHandler = customErrors[errorKey];
    return customErrorHandler ? customErrorHandler() : error;
};
