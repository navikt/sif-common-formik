import { YesOrNo } from '../../types';
import validateYesOrNoIsAnswered, { ValidateYesOrNoErrors } from '../validateYesOrNo';

describe(`validateYesOrNo`, () => {
    it(`returns undefined when the answer is ${YesOrNo.YES}, ${YesOrNo.NO}, ${YesOrNo.DO_NOT_KNOW},  has  value`, () => {
        expect(validateYesOrNoIsAnswered(YesOrNo.YES)).toBeUndefined();
        expect(validateYesOrNoIsAnswered(YesOrNo.NO)).toBeUndefined();
        expect(validateYesOrNoIsAnswered(YesOrNo.DO_NOT_KNOW)).toBeUndefined();
    });
    it(`returns ${ValidateYesOrNoErrors.unanswered} when the field has no value`, () => {
        expect(validateYesOrNoIsAnswered(undefined)).toBe(ValidateYesOrNoErrors.unanswered);
        expect(validateYesOrNoIsAnswered('')).toBe(ValidateYesOrNoErrors.unanswered);
        expect(validateYesOrNoIsAnswered(null)).toBe(ValidateYesOrNoErrors.unanswered);
    });
});
