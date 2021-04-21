import { ValidationError, ValidationFunction } from './types';

export enum ValidateCheckedError {
    'notChecked' = 'notChecked',
}

type CheckedValidationResult = ValidateCheckedError.notChecked | ValidationError;

type Errors = {
    [ValidateCheckedError.notChecked]?: ValidateCheckedError.notChecked | ValidationError;
};

const defaultErrors: Errors = {
    notChecked: ValidateCheckedError.notChecked,
};

const validateChecked = (customErrors?: Errors): ValidationFunction<CheckedValidationResult> => (value: any) => {
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };
    if (value !== true) {
        return errors[ValidateCheckedError.notChecked];
    }
    return undefined;
};

export default validateChecked;
