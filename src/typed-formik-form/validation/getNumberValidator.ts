import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateNumberError {
    numberHasNoValue = 'numberHasNoValue',
    numberHasInvalidFormat = 'numberHasInvalidFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge',
}

type NumberValidationResult =
    | undefined
    | ValidateNumberError.numberHasNoValue
    | ValidateNumberError.numberHasInvalidFormat
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

const getNumberValidator = (options: Options = {}): ValidationFunction<NumberValidationResult> => (value: any) => {
    const { required, min, max } = options;
    const numberValue = getNumberFromStringInput(value);

    if (hasValue(value) === false && required) {
        return ValidateNumberError.numberHasNoValue;
    }

    if (hasValue(value)) {
        if (numberValue === undefined) {
            return ValidateNumberError.numberHasInvalidFormat;
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

export default getNumberValidator;
