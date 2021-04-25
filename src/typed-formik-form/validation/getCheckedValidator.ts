import { ValidationFunction } from './types';

export enum ValidateCheckedError {
    'notChecked' = 'notChecked',
}

const getCheckedValidator = (): ValidationFunction<ValidateCheckedError | undefined> => (value: any) => {
    if (value !== true) {
        return ValidateCheckedError.notChecked;
    }
    return undefined;
};

export default getCheckedValidator;
