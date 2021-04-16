import { ValidationFunction } from './types';

export enum ValidateListErrors {
    isEmpty = 'validateNumber.isEmpty',
    invalidType = 'validateNumber.invalidType',
    tooFewItems = 'validateNumber.tooFewItems',
    tooManyItems = 'validateNumber.tooManyItems',
}

interface Options {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
}

const validateList = (options: Options = {}): ValidationFunction<ValidateListErrors> => (value: any) => {
    const { required = false, minItems = undefined, maxItems = undefined } = options;
    if (Array.isArray(value)) {
        const numItems = value.length;
        if (required && numItems === 0) {
            return ValidateListErrors.isEmpty;
        }
        if (minItems !== undefined && minItems > numItems) {
            return ValidateListErrors.tooFewItems;
        }
        if (maxItems !== undefined && maxItems < numItems) {
            return ValidateListErrors.tooManyItems;
        }
        return undefined;
    }
    if (required) {
        return ValidateListErrors.invalidType;
    }
    return undefined;
};

export default validateList;
