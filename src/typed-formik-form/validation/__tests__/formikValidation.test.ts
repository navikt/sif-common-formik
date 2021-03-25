import datepickerUtils from '../../components/formik-datepicker/datepickerUtils';
import { YesOrNo } from '../../types';
import formikValidation, { FORMIK_VALIDATION_ERROR } from '../formikValidation';

describe('formikValidation', () => {
    const {
        fieldHasValue,
        listHasItems,
        dateIsValid,
        yesOrNoIsAnswered,
        numberIsValid,
        numberIsWithinRange,
        dateIsWithinRange,
        orgNumberIsValid,
        fødselsnummerIsValid,
    } = formikValidation;

    describe('fieldHasValue', () => {
        it('returns undefined when value is defined', () => {
            expect(fieldHasValue('a')).toBeUndefined();
            expect(fieldHasValue(1)).toBeUndefined();
            expect(fieldHasValue({})).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(fieldHasValue('')?.error).toEqual(FORMIK_VALIDATION_ERROR.fieldHasNoValue);
            expect(fieldHasValue(null)?.error).toEqual(FORMIK_VALIDATION_ERROR.fieldHasNoValue);
            expect(fieldHasValue(undefined)?.error).toEqual(FORMIK_VALIDATION_ERROR.fieldHasNoValue);
        });
    });

    describe('listHasItems', () => {
        it('returns undefined when list is defined and has items', () => {
            expect(listHasItems([1])).toBeUndefined();
        });
        it('returns error when list is undefined or has no items', () => {
            expect(listHasItems(undefined)?.error).toEqual(FORMIK_VALIDATION_ERROR.listIsEmpty);
            expect(listHasItems(null)?.error).toEqual(FORMIK_VALIDATION_ERROR.listIsEmpty);
            expect(listHasItems([])?.error).toEqual(FORMIK_VALIDATION_ERROR.listIsEmpty);
        });
    });

    describe('dateIsValid', () => {
        it('returns undefined when date is valid', () => {
            expect(dateIsValid('2020-10-10')).toBeUndefined();
        });
        it(`returns ${FORMIK_VALIDATION_ERROR.dateHasInvalidFormat} when date is invalid`, () => {
            expect(dateIsValid('2020-10-1')?.error).toEqual(FORMIK_VALIDATION_ERROR.dateHasInvalidFormat);
            expect(dateIsValid('2020.10.10')?.error).toEqual(FORMIK_VALIDATION_ERROR.dateHasInvalidFormat);
            expect(dateIsValid(null)?.error).toEqual(FORMIK_VALIDATION_ERROR.dateHasInvalidFormat);
            expect(dateIsValid(undefined)?.error).toEqual(FORMIK_VALIDATION_ERROR.dateHasInvalidFormat);
        });
    });

    describe('yesOrNoIsAnswered', () => {
        it(`returns undefined when answer is ${YesOrNo.YES} is valid`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.YES)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.NO} is valid`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.NO)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.DO_NOT_KNOW} is valid`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.DO_NOT_KNOW)).toBeUndefined();
        });
        it(`returns ${FORMIK_VALIDATION_ERROR.yesOrNoUnanswered} when answer is not set`, () => {
            expect(yesOrNoIsAnswered(null)?.error).toEqual(FORMIK_VALIDATION_ERROR.yesOrNoUnanswered);
            expect(yesOrNoIsAnswered(YesOrNo.UNANSWERED)?.error).toEqual(FORMIK_VALIDATION_ERROR.yesOrNoUnanswered);
            expect(yesOrNoIsAnswered(undefined)?.error).toEqual(FORMIK_VALIDATION_ERROR.yesOrNoUnanswered);
            expect(yesOrNoIsAnswered({})?.error).toEqual(FORMIK_VALIDATION_ERROR.yesOrNoUnanswered);
        });
    });

    describe('numberIsValid', () => {
        it('returns undefined when value is a valid number string', () => {
            expect(numberIsValid('1')).toBeUndefined();
            expect(numberIsValid('1.2')).toBeUndefined();
            expect(numberIsValid('1,2')).toBeUndefined();
            expect(numberIsValid('-1')).toBeUndefined();
            expect(numberIsValid(1)).toBeUndefined();
            expect(numberIsValid(2)).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(numberIsValid('')?.error).toEqual(FORMIK_VALIDATION_ERROR.invalidNumber);
            expect(numberIsValid('1.2.3')?.error).toEqual(FORMIK_VALIDATION_ERROR.invalidNumber);
            expect(numberIsValid([1])?.error).toEqual(FORMIK_VALIDATION_ERROR.invalidNumber);
        });
    });

    describe('isNumberWithinRange', () => {
        it('returns undefined if value is valid number and within range', () => {
            expect(numberIsWithinRange({ min: 2 })('3')).toBeUndefined();
            expect(numberIsWithinRange({ max: 3 })('2')).toBeUndefined();
            expect(numberIsWithinRange({ min: 2, max: 3 })('2')).toBeUndefined();
            expect(numberIsWithinRange({ min: 2, max: 3 })('3')).toBeUndefined();
        });
        it(`returns ${FORMIK_VALIDATION_ERROR.invalidNumber} if value is not a valid number`, () => {
            expect(numberIsWithinRange({ min: 3 })('abc')?.error).toEqual(FORMIK_VALIDATION_ERROR.invalidNumber);
        });
        it(`returns ${FORMIK_VALIDATION_ERROR.numberToSmall} if value is smaller than min`, () => {
            expect(numberIsWithinRange({ min: 3 })('2')?.error).toEqual(FORMIK_VALIDATION_ERROR.numberToSmall);
            expect(numberIsWithinRange({ min: 3, max: 10 })('2')?.error).toEqual(FORMIK_VALIDATION_ERROR.numberToSmall);
        });
        it(`returns ${FORMIK_VALIDATION_ERROR.numberToLarge} if value is larger than max`, () => {
            expect(numberIsWithinRange({ min: 1, max: 3 })('4')?.error).toEqual(FORMIK_VALIDATION_ERROR.numberToLarge);
            expect(numberIsWithinRange({ max: 3 })('4')?.error).toEqual(FORMIK_VALIDATION_ERROR.numberToLarge);
        });
    });
    describe('dateIsWithinRange', () => {
        const min = datepickerUtils.getDateFromDateString('2020-10-10');
        const max = datepickerUtils.getDateFromDateString('2020-10-12');

        it('returns undefined if value is valid datestring and within range', () => {
            expect(dateIsWithinRange({ min })('2020-10-10')).toBeUndefined();
            expect(dateIsWithinRange({ max })('2020-10-10')).toBeUndefined();
            expect(dateIsWithinRange({ min, max })('2020-10-10')).toBeUndefined();
            expect(dateIsWithinRange({ min, max })('2020-10-12')).toBeUndefined();
        });

        it(`returns ${FORMIK_VALIDATION_ERROR.dateBeforeMin} if value is smaller than min date`, () => {
            expect(dateIsWithinRange({ min })('2020-10-09')?.error).toEqual(FORMIK_VALIDATION_ERROR.dateBeforeMin);
        });

        it(`returns ${FORMIK_VALIDATION_ERROR.dateAfterMax} if value is larger than max date`, () => {
            expect(dateIsWithinRange({ max })('2020-10-15')?.error).toEqual(FORMIK_VALIDATION_ERROR.dateAfterMax);
        });
    });

    describe('orgNumberIsValid', () => {
        it('returns undefined when the org number is valid', () => {
            expect(orgNumberIsValid('979312059')).toBeUndefined();
        });
        it(`returns ${FORMIK_VALIDATION_ERROR.invalidNorwegianOrgNumber} when the org number is not valid`, () => {
            expect(orgNumberIsValid('213')?.error).toEqual(FORMIK_VALIDATION_ERROR.invalidNorwegianOrgNumber);
            expect(orgNumberIsValid(['979312059'])?.error).toEqual(FORMIK_VALIDATION_ERROR.invalidNorwegianOrgNumber);
            expect(orgNumberIsValid(undefined)?.error).toEqual(FORMIK_VALIDATION_ERROR.invalidNorwegianOrgNumber);
        });
    });

    describe('fødselsnummerIsValid', () => {
        const generatedFnr = '24090014427';

        it('returns undefined when the fødselsnummer is valid', () => {
            expect(fødselsnummerIsValid(generatedFnr)).toBeUndefined();
        });

        it(`returns ${FORMIK_VALIDATION_ERROR.fødselsnummerNot11Chars} when the fødselsnummer is not 11 chars`, () => {
            expect(fødselsnummerIsValid('1234567890')?.error).toEqual(FORMIK_VALIDATION_ERROR.fødselsnummerNot11Chars);
            expect(fødselsnummerIsValid('123456789012')?.error).toEqual(
                FORMIK_VALIDATION_ERROR.fødselsnummerNot11Chars
            );
        });

        it(`returns ${FORMIK_VALIDATION_ERROR.fødselsnummerChecksumError} when the fødselsnummer has invalid checksum`, () => {
            expect(fødselsnummerIsValid('24090014428')?.error).toEqual(
                FORMIK_VALIDATION_ERROR.fødselsnummerChecksumError
            );
        });
    });
});
