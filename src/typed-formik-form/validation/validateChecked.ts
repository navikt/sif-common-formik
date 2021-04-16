import { ValidationFunction } from './types';

export enum ValidateCheckedError {
    'notChecked' = 'notChecked',
}

const validateChecked: ValidationFunction<ValidateCheckedError> = (value: any) => {
    if (value !== true) {
        return ValidateCheckedError.notChecked;
    }
    return undefined;
};

export default validateChecked;
