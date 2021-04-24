import getRequiredFieldValidator, { ValidateRequiredFieldError } from './getRequiredFieldValidator';
import { ValidationError, ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateStringError {
    notAString = 'notAString',
    stringIsTooShort = 'stringIsTooShort',
    stringIsTooLong = 'stringIsTooLong',
}

type StringValidationResult =
    | undefined
    | ValidateRequiredFieldError.noValue
    | ValidateStringError.notAString
    | ValidateStringError.stringIsTooLong
    | ValidateStringError.stringIsTooShort
    | ValidationError;

interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const getStringValidator = (options: Options = {}): ValidationFunction<StringValidationResult> => (value: any) => {
    const { required, minLength, maxLength } = options;
    if (required) {
        const err = getRequiredFieldValidator()(value);
        if (err) {
            return err;
        }
    }
    if (hasValue(value)) {
        if (typeof value !== 'string') {
            return ValidateStringError.notAString;
        }
        if (minLength !== undefined && value.length < minLength) {
            return ValidateStringError.stringIsTooShort;
        }
        if (maxLength !== undefined && value.length > maxLength) {
            return ValidateStringError.stringIsTooLong;
        }
    }
};

export default getStringValidator;
