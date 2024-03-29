import { YesOrNo } from '../../types';
import validateYesOrNo, { ValidateYesOrNoError } from '../getYesOrNoValidator';

describe(`validateYesOrNo`, () => {
    it(`returns undefined when the answer is ${YesOrNo.YES}, ${YesOrNo.NO}, ${YesOrNo.DO_NOT_KNOW},  has  value`, () => {
        expect(validateYesOrNo()(YesOrNo.YES)).toBeUndefined();
        expect(validateYesOrNo()(YesOrNo.NO)).toBeUndefined();
        expect(validateYesOrNo()(YesOrNo.DO_NOT_KNOW)).toBeUndefined();
    });
    it(`returns ${ValidateYesOrNoError.yesOrNoIsUnanswered} when the field has no value`, () => {
        expect(validateYesOrNo()(undefined)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(validateYesOrNo()('')).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
        expect(validateYesOrNo()(null)).toBe(ValidateYesOrNoError.yesOrNoIsUnanswered);
    });
});
