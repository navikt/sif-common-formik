import { ValidationFunction, ValidationErrorRenderFunc } from './types';
import { hasValue } from './validationUtils';

export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError | ValidationErrorRenderFunc;

type Errors = {
    [ValidateRequiredFieldError.noValue]: ValidateRequiredFieldError.noValue | ValidationErrorRenderFunc;
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
