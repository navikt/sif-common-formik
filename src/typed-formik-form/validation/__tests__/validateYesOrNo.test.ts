import { YesOrNo } from '../../types';
import validateYesOrNoIsAnswered, { ValidateYesOrNoError } from '../validateYesOrNo';

describe(`validateYesOrNo`, () => {
    it(`returns undefined when the answer is ${YesOrNo.YES}, ${YesOrNo.NO}, ${YesOrNo.DO_NOT_KNOW},  has  value`, () => {
        expect(validateYesOrNoIsAnswered(YesOrNo.YES)).toBeUndefined();
        expect(validateYesOrNoIsAnswered(YesOrNo.NO)).toBeUndefined();
        expect(validateYesOrNoIsAnswered(YesOrNo.DO_NOT_KNOW)).toBeUndefined();
    });
    it(`returns ${ValidateYesOrNoError.yesOrNoIsUnanswered} when the field has no value`, () => {
        expect(validateYesOrNoIsAnswered(undefined)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(validateYesOrNoIsAnswered('')).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(validateYesOrNoIsAnswered(null)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
    });
});
