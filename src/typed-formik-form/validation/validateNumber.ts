import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredValueError } from './validateRequiredValue';

export enum ValidateNumberError {
    invalidNumberFormat = 'invalidNumberFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge',
}

type NumberValidationResult =
    | undefined
    | ValidateRequiredValueError.noValue
    | ValidateNumberError.invalidNumberFormat
    | ValidateNumberError.numberIsTooLarge
    | ValidateNumberError.numberIsTooSmall;

interface Options {
    required?: boolean;
    min?: number;
    max?: number;
}

const getNumberFromStringInput = (inputValue: string | undefined): number | undefined => {
    if (inputValue === undefined || inputValue === '' || Array.isArray(inputValue)) {
        return undefined;
    }
    if (typeof inputValue === 'number' && isNaN(inputValue)) {
        return undefined;
    }
    const value = `${inputValue}`.replace(/\,/g, '.');
    const numValue = Number(value);
    if (isNaN(numValue)) {
        return undefined;
    }
    return numValue;
};

const validateNumber = (options: Options = {}): ValidationFunction<NumberValidationResult> => (value: any) => {
    const { required, min, max } = options;
    const numberValue = getNumberFromStringInput(value);

    if (hasValue(value) === false && required) {
        return ValidateRequiredValueError.noValue;
    }

    if (hasValue(value)) {
        if (numberValue === undefined) {
            return ValidateNumberError.invalidNumberFormat;
        }
        if (min !== undefined && numberValue < min) {
            return ValidateNumberError.numberIsTooSmall;
        }
        if (max !== undefined && numberValue > max) {
            return ValidateNumberError.numberIsTooLarge;
        }
    }
    return undefined;
};

export default validateNumber;
