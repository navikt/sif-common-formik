import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';

export enum ValidateRequiredValueError {
    'noValue' = 'noValue',
}

const validateRequiredValue: ValidationFunction<ValidateRequiredValueError> = (value: any) => {
    if (hasValue(value) === false) {
        return ValidateRequiredValueError.noValue;
    }
    return undefined;
};

export default validateRequiredValue;
