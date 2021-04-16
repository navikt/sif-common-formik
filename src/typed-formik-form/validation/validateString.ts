import { ValidationFunction } from './types';
import { hasValue } from './utils/hasValue';

export enum ValidateStringErrors {
    noValue = 'noValue',
    invalidType = 'invalidType',
    tooShort = 'tooShort',
    tooLong = 'tooLong',
}

interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const validateString = (options: Options = {}): ValidationFunction<ValidateStringErrors> => (value: any) => {
    const { required, minLength, maxLength } = options;
    if (hasValue(value) === false && required) {
        return ValidateStringErrors.noValue;
    }
    if (hasValue(value)) {
        if (typeof value !== 'string') {
            return ValidateStringErrors.invalidType;
        }
        if (minLength !== undefined && value.length < minLength) {
            return ValidateStringErrors.tooShort;
        }
        if (maxLength !== undefined && value.length > maxLength) {
            return ValidateStringErrors.tooLong;
        }
    }
    return undefined;
};

export default validateString;
