import validateList, { ValidateListError } from '../validateList';

describe(`validateList`, () => {
    it('returns undefined when list is defined and has items', () => {
        expect(validateList()([1])).toBeUndefined();
    });
    it(`returns undefined when list is valid and number of items is within specified range`, () => {
        expect(validateList({ minItems: 0 })([1, 2])).toBeUndefined();
        expect(validateList({ minItems: 1, maxItems: 1 })([1])).toBeUndefined();
        expect(validateList({ minItems: 0, maxItems: 2 })([1, 2])).toBeUndefined();
        expect(validateList({ minItems: 0, maxItems: 2 })([1, 2])).toBeUndefined();
    });
    it('returns undefined when list is not required and the list is undefined or has no items', () => {
        expect(validateList({ required: false })(undefined)).toBeUndefined();
        expect(validateList({ required: false })(null)).toBeUndefined();
        expect(validateList({ required: false })([])).toBeUndefined();
    });
    it(`returns ${ValidateListError.invalidType} when list is required, validateType=true and value is not array`, () => {
        expect(validateList({ required: true, validateType: true })(undefined)).toEqual(ValidateListError.invalidType);
        expect(validateList({ required: true, validateType: true })(null)).toEqual(ValidateListError.invalidType);
    });
    it(`returns ${ValidateListError.listIsEmpty} when list is required, validateType === false and value is not array`, () => {
        expect(validateList({ required: true, validateType: false })(undefined)).toEqual(ValidateListError.listIsEmpty);
        expect(validateList({ required: true })(null)).toEqual(ValidateListError.listIsEmpty);
    });
    it('returns error when list is required and the list is undefined or has no items', () => {
        expect(validateList({ required: true })([])).toEqual(ValidateListError.listIsEmpty);
    });
    it(`returns ${ValidateListError.listHasTooFewItems} when list contains too feew items`, () => {
        expect(validateList({ minItems: 1 })([])).toEqual(ValidateListError.listHasTooFewItems);
        expect(validateList({ minItems: 3 })([1, 2])).toEqual(ValidateListError.listHasTooFewItems);
    });
    it(`returns ${ValidateListError.listHasTooManyItems} when list contains too many items`, () => {
        expect(validateList({ maxItems: 1 })([1, 2, 3])).toEqual(ValidateListError.listHasTooManyItems);
        expect(validateList({ maxItems: 3 })([1, 2, 3, 4])).toEqual(ValidateListError.listHasTooManyItems);
    });
});
