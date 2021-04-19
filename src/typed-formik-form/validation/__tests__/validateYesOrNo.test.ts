import { YesOrNo } from '../../types';
import validateYesOrNoIsAnswered, { validateYesOrNoIsAnsweredError } from '../validateYesOrNoIsAnswered';

describe(`validateYesOrNo`, () => {
    it(`returns undefined when the answer is ${YesOrNo.YES}, ${YesOrNo.NO}, ${YesOrNo.DO_NOT_KNOW},  has  value`, () => {
        expect(validateYesOrNoIsAnswered(YesOrNo.YES)).toBeUndefined();
        expect(validateYesOrNoIsAnswered(YesOrNo.NO)).toBeUndefined();
        expect(validateYesOrNoIsAnswered(YesOrNo.DO_NOT_KNOW)).toBeUndefined();
    });
    it(`returns ${validateYesOrNoIsAnsweredError.yesOrNoIsUnanswered} when the field has no value`, () => {
        expect(validateYesOrNoIsAnswered(undefined)).toBe(validateYesOrNoIsAnsweredError.yesOrNoIsUnanswered);
        expect(validateYesOrNoIsAnswered('')).toBe(validateYesOrNoIsAnsweredError.yesOrNoIsUnanswered);
        expect(validateYesOrNoIsAnswered(null)).toBe(validateYesOrNoIsAnsweredError.yesOrNoIsUnanswered);
    });
});
