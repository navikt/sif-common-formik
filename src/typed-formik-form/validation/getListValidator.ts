import { ValidationError, ValidationFunction } from './types';

export enum ValidateListError {
    listIsEmpty = 'listIsEmpty',
    listHasTooFewItems = 'listHasTooFewItems',
    listHasTooManyItems = 'listHastooManyItems',
}

type ListValidationResult =
    | undefined
    | ValidateListError.listHasTooFewItems
    | ValidateListError.listHasTooManyItems
    | ValidateListError.listIsEmpty
    | ValidationError;

type Errors = {
    [ValidateListError.listHasTooFewItems]?: ValidateListError.listHasTooFewItems | ValidationError;
    [ValidateListError.listHasTooManyItems]?: ValidateListError.listHasTooManyItems | ValidationError;
    [ValidateListError.listIsEmpty]?: ValidateListError.listIsEmpty | ValidationError;
};

const defaultErrors: Errors = {
    listHasTooFewItems: ValidateListError.listHasTooFewItems,
    listHastooManyItems: ValidateListError.listHasTooManyItems,
    listIsEmpty: ValidateListError.listIsEmpty,
};
interface Options {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
}

const getListValidator = (options: Options = {}, customErrors?: Errors): ValidationFunction<ListValidationResult> => (
    value: any
) => {
    const { required = false, minItems = undefined, maxItems = undefined } = options;
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };
    if (Array.isArray(value)) {
        const numItems = value.length;
        if (required && numItems === 0) {
            return errors[ValidateListError.listIsEmpty];
        }
        if (minItems !== undefined && minItems > numItems) {
            return errors[ValidateListError.listHasTooFewItems];
        }
        if (maxItems !== undefined && maxItems < numItems) {
            return errors[ValidateListError.listHasTooManyItems];
        }
        return undefined;
    }
    if (required) {
        return errors[ValidateListError.listIsEmpty];
    }
    return undefined;
};

export default getListValidator;
