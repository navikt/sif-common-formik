import datepickerUtils from '../../components/formik-datepicker/datepickerUtils';
import { YesOrNo } from '../../types';
import {
    DateIsValidErrors,
    ListHasItemsErrors,
    FieldHasValueErrors,
    YesOrNoIsAnsweredErrors,
    NumberIsValidErrors,
    DateIsWithinRangeError,
    OrgNumberIsValidErrors,
    FødselsnummerIsValidErrors,
    validateFieldHasValue,
    validateListHasItems,
    validateDatePickerString,
    validateYesOrNoIsAnswered,
    validateNumber,
    validateNumberIsWithinRange,
    validateDateIsWithinRange,
    validateOrgNumber,
    validateFødselsnummer,
    NumberIsValidAndWithinRangeErrors,
} from '../validations';

describe('formikValidation', () => {
    describe('validateFieldHasValue', () => {
        it('returns undefined when value is defined', () => {
            expect(validateFieldHasValue('a')).toBeUndefined();
            expect(validateFieldHasValue(1)).toBeUndefined();
            expect(validateFieldHasValue({})).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(validateFieldHasValue('')).toEqual(FieldHasValueErrors.noValue);
            expect(validateFieldHasValue(null)).toEqual(FieldHasValueErrors.noValue);
            expect(validateFieldHasValue(undefined)).toEqual(FieldHasValueErrors.noValue);
        });
    });

    describe('validateListHasItems', () => {
        it('returns undefined when list is defined and has items', () => {
            expect(validateListHasItems([1])).toBeUndefined();
        });
        it('returns error when list is undefined or has no items', () => {
            expect(validateListHasItems(undefined)).toEqual(ListHasItemsErrors.listIsEmpty);
            expect(validateListHasItems(null)).toEqual(ListHasItemsErrors.listIsEmpty);
            expect(validateListHasItems([])).toEqual(ListHasItemsErrors.listIsEmpty);
        });
    });

    describe('validateDatePickerString', () => {
        it('returns undefined when date is valid', () => {
            expect(validateDatePickerString('2020-10-10')).toBeUndefined();
        });
        it(`returns ${DateIsValidErrors.dateHasInvalidFormat} when date is invalid`, () => {
            expect(validateDatePickerString('2020-10-1')).toEqual(DateIsValidErrors.dateHasInvalidFormat);
            expect(validateDatePickerString('2020.10.10')).toEqual(DateIsValidErrors.dateHasInvalidFormat);
            expect(validateDatePickerString(null)).toEqual(DateIsValidErrors.dateHasInvalidFormat);
            expect(validateDatePickerString(undefined)).toEqual(DateIsValidErrors.dateHasInvalidFormat);
        });
    });

    describe('validateYesOrNoIsAnswered', () => {
        it(`returns undefined when answer is ${YesOrNo.YES} is valid`, () => {
            expect(validateYesOrNoIsAnswered(YesOrNo.YES)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.NO} is valid`, () => {
            expect(validateYesOrNoIsAnswered(YesOrNo.NO)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.DO_NOT_KNOW} is valid`, () => {
            expect(validateYesOrNoIsAnswered(YesOrNo.DO_NOT_KNOW)).toBeUndefined();
        });
        it(`returns ${YesOrNoIsAnsweredErrors.yesOrNoUnanswered} when answer is not set`, () => {
            expect(validateYesOrNoIsAnswered(null)).toEqual(YesOrNoIsAnsweredErrors.yesOrNoUnanswered);
            expect(validateYesOrNoIsAnswered(YesOrNo.UNANSWERED)).toEqual(YesOrNoIsAnsweredErrors.yesOrNoUnanswered);
            expect(validateYesOrNoIsAnswered(undefined)).toEqual(YesOrNoIsAnsweredErrors.yesOrNoUnanswered);
            expect(validateYesOrNoIsAnswered({})).toEqual(YesOrNoIsAnsweredErrors.yesOrNoUnanswered);
        });
    });

    describe('validateNumber', () => {
        it('returns undefined when value is a valid number string', () => {
            expect(validateNumber('1')).toBeUndefined();
            expect(validateNumber('1.2')).toBeUndefined();
            expect(validateNumber('1,2')).toBeUndefined();
            expect(validateNumber('-1')).toBeUndefined();
            expect(validateNumber(1)).toBeUndefined();
            expect(validateNumber(2)).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(validateNumber('')).toEqual(NumberIsValidErrors.invalidNumber);
            expect(validateNumber('1.2.3')).toEqual(NumberIsValidErrors.invalidNumber);
            expect(validateNumber([1])).toEqual(NumberIsValidErrors.invalidNumber);
        });
    });

    describe('validateNumberIsWithinRange', () => {
        it('returns undefined if value is valid number and within range', () => {
            expect(validateNumberIsWithinRange({ min: 2 })('3')).toBeUndefined();
            expect(validateNumberIsWithinRange({ max: 3 })('2')).toBeUndefined();
            expect(validateNumberIsWithinRange({ min: 2, max: 3 })('2')).toBeUndefined();
            expect(validateNumberIsWithinRange({ min: 2, max: 3 })('3')).toBeUndefined();
        });
        it(`returns ${NumberIsValidErrors.invalidNumber} if value is not a valid number`, () => {
            expect(validateNumberIsWithinRange({ min: 3 })('abc')).toEqual(NumberIsValidErrors.invalidNumber);
        });
        it(`returns ${NumberIsValidAndWithinRangeErrors.numberToSmall} if value is smaller than min`, () => {
            expect(validateNumberIsWithinRange({ min: 3 })('2')).toEqual(
                NumberIsValidAndWithinRangeErrors.numberToSmall
            );
            expect(validateNumberIsWithinRange({ min: 3, max: 10 })('2')).toEqual(
                NumberIsValidAndWithinRangeErrors.numberToSmall
            );
        });
        it(`returns ${NumberIsValidAndWithinRangeErrors.numberToLarge} if value is larger than max`, () => {
            expect(validateNumberIsWithinRange({ min: 1, max: 3 })('4')).toEqual(
                NumberIsValidAndWithinRangeErrors.numberToLarge
            );
            expect(validateNumberIsWithinRange({ max: 3 })('4')).toEqual(
                NumberIsValidAndWithinRangeErrors.numberToLarge
            );
        });
    });
    describe('dateIsWithinRange', () => {
        const min = datepickerUtils.getDateFromDateString('2020-10-10');
        const max = datepickerUtils.getDateFromDateString('2020-10-12');
        it('returns undefined if value is valid datestring and within range', () => {
            expect(validateDateIsWithinRange({ min })('2020-10-10')).toBeUndefined();
            expect(validateDateIsWithinRange({ max })('2020-10-10')).toBeUndefined();
            expect(validateDateIsWithinRange({ min, max })('2020-10-10')).toBeUndefined();
            expect(validateDateIsWithinRange({ min, max })('2020-10-12')).toBeUndefined();
        });

        it(`returns ${DateIsWithinRangeError.dateBeforeMin} if value is smaller than min date`, () => {
            expect(validateDateIsWithinRange({ min })('2020-10-09')).toEqual(DateIsWithinRangeError.dateBeforeMin);
        });

        it(`returns ${DateIsWithinRangeError.dateAfterMax} if value is larger than max date`, () => {
            expect(validateDateIsWithinRange({ max })('2020-10-15')).toEqual(DateIsWithinRangeError.dateAfterMax);
        });
    });

    describe('validateOrgNumber', () => {
        it('returns undefined when the org number is valid', () => {
            expect(validateOrgNumber('979312059')).toBeUndefined();
        });
        it(`returns ${OrgNumberIsValidErrors.invalidNorwegianOrgNumber} when the org number is not valid`, () => {
            expect(validateOrgNumber('213')).toEqual(OrgNumberIsValidErrors.invalidNorwegianOrgNumber);
            expect(validateOrgNumber(['979312059'])).toEqual(OrgNumberIsValidErrors.invalidNorwegianOrgNumber);
            expect(validateOrgNumber(undefined)).toEqual(OrgNumberIsValidErrors.invalidNorwegianOrgNumber);
        });
    });

    describe('validateFødselsnummer', () => {
        const generatedFnr = '24090014427';

        it('returns undefined when the fødselsnummer is valid', () => {
            expect(validateFødselsnummer(generatedFnr)).toBeUndefined();
        });

        it(`returns ${FødselsnummerIsValidErrors.fødselsnummerNot11Chars} when the fødselsnummer is not 11 chars`, () => {
            expect(validateFødselsnummer('1234567890')).toEqual(FødselsnummerIsValidErrors.fødselsnummerNot11Chars);
            expect(validateFødselsnummer('123456789012')).toEqual(FødselsnummerIsValidErrors.fødselsnummerNot11Chars);
        });

        it(`returns ${FødselsnummerIsValidErrors.fødselsnummerChecksumError} when the fødselsnummer has invalid checksum`, () => {
            expect(validateFødselsnummer('24090014428')).toEqual(FødselsnummerIsValidErrors.fødselsnummerChecksumError);
        });
    });
});
