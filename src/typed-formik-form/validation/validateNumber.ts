import { ValidationFunction } from './types';
import { hasValue } from './utils/hasValue';

export enum ValidateNumberErrors {
    noValue = 'validateNumber.noValue',
    invalidFormat = 'validateNumber.invalidFormat',
    tooSmall = 'validateNumber.tooSmall',
    tooLarge = 'validateNumber.tooLarge',
}

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

const validateNumber = (options: Options = {}): ValidationFunction<ValidateNumberErrors> => (value: any) => {
    const { required, min, max } = options;
    const numberValue = getNumberFromStringInput(value);

    if (hasValue(value) === false && required) {
        return ValidateNumberErrors.noValue;
    }

    if (hasValue(value)) {
        if (numberValue === undefined) {
            return ValidateNumberErrors.invalidFormat;
        }
        if (min !== undefined && numberValue < min) {
            return ValidateNumberErrors.tooSmall;
        }
        if (max !== undefined && numberValue > max) {
            return ValidateNumberErrors.tooLarge;
        }
    }
    return undefined;
};

export default validateNumber;
