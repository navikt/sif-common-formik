import { ValidationFunction } from './types';

export enum ValidateListError {
    listIsEmpty = 'listIsEmpty',
    invalidType = 'invalidType',
    listHasTooFewItems = 'listHasTooFewItems',
    listHasTooManyItems = 'listHastooManyItems',
}

type ListValidationResult =
    | undefined
    | ValidateListError.invalidType
    | ValidateListError.listHasTooFewItems
    | ValidateListError.listHasTooManyItems
    | ValidateListError.listIsEmpty;

interface Options {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
    validateType?: boolean;
}

const validateList = (options: Options = {}): ValidationFunction<ListValidationResult> => (value: any) => {
    const { required = false, minItems = undefined, maxItems = undefined, validateType = false } = options;
    if (Array.isArray(value)) {
        const numItems = value.length;
        if (required && numItems === 0) {
            return ValidateListError.listIsEmpty;
        }
        if (minItems !== undefined && minItems > numItems) {
            return ValidateListError.listHasTooFewItems;
        }
        if (maxItems !== undefined && maxItems < numItems) {
            return ValidateListError.listHasTooManyItems;
        }
        return undefined;
    }
    if (required) {
        if (validateType) {
            return ValidateListError.invalidType;
        }
        return ValidateListError.listIsEmpty;
    }
    return undefined;
};

export default validateList;
