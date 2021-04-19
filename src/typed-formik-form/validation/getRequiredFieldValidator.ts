import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

const getRequiredFieldValidator = (): ValidationFunction<ValidateRequiredFieldError> => (value: any) => {
    if (hasValue(value) === false) {
        return ValidateRequiredFieldError.noValue;
    }
    return undefined;
};

export default getRequiredFieldValidator;
