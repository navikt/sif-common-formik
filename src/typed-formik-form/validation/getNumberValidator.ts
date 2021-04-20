import { ValidationErrorRenderFunc, ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';

export enum ValidateNumberError {
    invalidNumberFormat = 'invalidNumberFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge',
}

type NumberValidationResult =
    | undefined
    | ValidateRequiredFieldError.noValue
    | ValidateNumberError.invalidNumberFormat
    | ValidateNumberError.numberIsTooLarge
    | ValidateNumberError.numberIsTooSmall
    | ValidationErrorRenderFunc;

type Errors = {
    [ValidateRequiredFieldError.noValue]: ValidateRequiredFieldError.noValue | ValidationErrorRenderFunc;
    [ValidateNumberError.invalidNumberFormat]: ValidateNumberError.invalidNumberFormat | ValidationErrorRenderFunc;
    [ValidateNumberError.numberIsTooLarge]: ValidateNumberError.numberIsTooLarge | ValidationErrorRenderFunc;
    [ValidateNumberError.numberIsTooSmall]: ValidateNumberError.numberIsTooSmall | ValidationErrorRenderFunc;
};

const defaultErros: Errors = {
    noValue: ValidateRequiredFieldError.noValue,
    invalidNumberFormat: ValidateNumberError.invalidNumberFormat,
    numberIsTooLarge: ValidateNumberError.numberIsTooLarge,
    numberIsTooSmall: ValidateNumberError.numberIsTooSmall,
};
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

const getNumberValidator = (
    options: Options = {},
    customErrors?: Errors
): ValidationFunction<NumberValidationResult> => (value: any) => {
    const { required, min, max } = options;
    const numberValue = getNumberFromStringInput(value);

    const errors: Errors = {
        ...defaultErros,
        ...customErrors,
    };

    if (hasValue(value) === false && required) {
        return errors[ValidateRequiredFieldError.noValue];
    }

    if (hasValue(value)) {
        if (numberValue === undefined) {
            return errors[ValidateNumberError.invalidNumberFormat];
        }
        if (min !== undefined && numberValue < min) {
            return errors[ValidateNumberError.numberIsTooSmall];
        }
        if (max !== undefined && numberValue > max) {
            return errors[ValidateNumberError.numberIsTooLarge];
        }
    }
    return undefined;
};

export default getNumberValidator;
