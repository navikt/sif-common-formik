import { ValidationFunction, ValidationError } from './types';
import { hasValue } from './validationUtils';

export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError | ValidationError;

type Errors = {
    [ValidateRequiredFieldError.noValue]: ValidateRequiredFieldError.noValue | ValidationError;
};

const defaultErrors: Errors = {
    noValue: ValidateRequiredFieldError.noValue,
};

const getRequiredFieldValidator = (customErrors?: Errors): ValidationFunction<RequiredFieldValidationResult> => (
    value: any
) => {
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };
    if (hasValue(value) === false) {
        return errors[ValidateRequiredFieldError.noValue];
    }
    return undefined;
};

export default getRequiredFieldValidator;
