import { ValidationFunction } from './types';

export enum ValidateCheckedError {
    'notChecked' = 'notChecked',
}

type CheckedValidationResult = ValidateCheckedError | undefined;

const getCheckedValidator = (): ValidationFunction<CheckedValidationResult> => (value: any) => {
    if (value !== true) {
        return ValidateCheckedError.notChecked;
    }
    return undefined;
};

export default getCheckedValidator;
