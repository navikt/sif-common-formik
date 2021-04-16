import { ValidationFunction } from './types';
import { hasValue } from './utils/hasValue';

export enum ValidateRequiredValueErrors {
    'noValue' = 'noValue',
}

const validateRequiredValue: ValidationFunction<ValidateRequiredValueErrors> = (value: any) => {
    if (hasValue(value) === false) {
        return ValidateRequiredValueErrors.noValue;
    }
    return undefined;
};

export default validateRequiredValue;
