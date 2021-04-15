import validateList, { ValidateListErrors } from '../validateList';

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
    it('returns error when list is required and the list is undefined or has no items', () => {
        expect(validateList({ required: true })(undefined)).toEqual(ValidateListErrors.invalidType);
        expect(validateList({ required: true })(null)).toEqual(ValidateListErrors.invalidType);
        expect(validateList({ required: true })([])).toEqual(ValidateListErrors.isEmpty);
    });
    it(`returns ${ValidateListErrors.tooFewItems} when list contains too feew items`, () => {
        expect(validateList({ minItems: 1 })([])).toEqual(ValidateListErrors.tooFewItems);
        expect(validateList({ minItems: 3 })([1, 2])).toEqual(ValidateListErrors.tooFewItems);
    });
    it(`returns ${ValidateListErrors.tooManyItems} when list contains too many items`, () => {
        expect(validateList({ maxItems: 1 })([1, 2, 3])).toEqual(ValidateListErrors.tooManyItems);
        expect(validateList({ maxItems: 3 })([1, 2, 3, 4])).toEqual(ValidateListErrors.tooManyItems);
    });
});
