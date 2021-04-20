import { ValidationErrorRenderFunc, ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';

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
    | ValidationErrorRenderFunc;

type Errors = {
    [ValidateRequiredFieldError.noValue]: ValidateRequiredFieldError.noValue | ValidationErrorRenderFunc;
    [ValidateStringError.notAString]: ValidateStringError.notAString | ValidationErrorRenderFunc;
    [ValidateStringError.stringIsTooLong]: ValidateStringError.stringIsTooLong | ValidationErrorRenderFunc;
    [ValidateStringError.stringIsTooShort]: ValidateStringError.stringIsTooShort | ValidationErrorRenderFunc;
};

const defaultErrors: Errors = {
    noValue: ValidateRequiredFieldError.noValue,
    notAString: ValidateStringError.notAString,
    stringIsTooLong: ValidateStringError.stringIsTooLong,
    stringIsTooShort: ValidateStringError.stringIsTooShort,
};
interface Options {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const getStringValidator = (
    options: Options = {},
    customErrors?: Errors
): ValidationFunction<StringValidationResult> => (value: any) => {
    const { required, minLength, maxLength } = options;
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };
    if (hasValue(value) === false && required) {
        return errors[ValidateRequiredFieldError.noValue];
    }
    if (hasValue(value)) {
        if (typeof value !== 'string') {
            return errors[ValidateStringError.notAString];
        }
        if (minLength !== undefined && value.length < minLength) {
            return errors[ValidateStringError.stringIsTooShort];
        }
        if (maxLength !== undefined && value.length > maxLength) {
            return errors[ValidateStringError.stringIsTooLong];
        }
    }
    return undefined;
};

export default getStringValidator;
