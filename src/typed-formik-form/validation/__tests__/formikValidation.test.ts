import datepickerUtils from '../../components/formik-datepicker/datepickerUtils';
import { YesOrNo } from '../../types';
import {
    DateIsValidErrors,
    EmptyListErrors,
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
} from '../formikFieldValidation';

describe('formikValidation', () => {
    describe('validateFieldHasValue', () => {
        const errorMessages: FieldHasValueErrors = { noValue: 'No value' };
        it('returns undefined when value is defined', () => {
            expect(validateFieldHasValue('a', errorMessages)).toBeUndefined();
            expect(validateFieldHasValue(1, errorMessages)).toBeUndefined();
            expect(validateFieldHasValue({}, errorMessages)).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(validateFieldHasValue('', errorMessages)).toEqual(errorMessages.noValue);
            expect(validateFieldHasValue(null, errorMessages)).toEqual(errorMessages.noValue);
            expect(validateFieldHasValue(undefined, errorMessages)).toEqual(errorMessages.noValue);
        });
    });

    describe('validateListHasItems', () => {
        const errorMessages: EmptyListErrors = { listIsEmpty: 'empty list' };
        it('returns undefined when list is defined and has items', () => {
            expect(validateListHasItems([1], errorMessages)).toBeUndefined();
        });
        it('returns error when list is undefined or has no items', () => {
            expect(validateListHasItems(undefined, errorMessages)).toEqual(errorMessages.listIsEmpty);
            expect(validateListHasItems(null, errorMessages)).toEqual(errorMessages.listIsEmpty);
            expect(validateListHasItems([], errorMessages)).toEqual(errorMessages.listIsEmpty);
        });
    });

    describe('validateDatePickerString', () => {
        const errorMessages: DateIsValidErrors = { dateHasInvalidFormat: 'invalidFormat' };
        it('returns undefined when date is valid', () => {
            expect(validateDatePickerString('2020-10-10', errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.dateHasInvalidFormat} when date is invalid`, () => {
            expect(validateDatePickerString('2020-10-1', errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
            expect(validateDatePickerString('2020.10.10', errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
            expect(validateDatePickerString(null, errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
            expect(validateDatePickerString(undefined, errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
        });
    });

    describe('validateYesOrNoIsAnswered', () => {
        const errorMessages: YesOrNoIsAnsweredErrors = { yesOrNoUnanswered: 'unanswered' };
        it(`returns undefined when answer is ${YesOrNo.YES} is valid`, () => {
            expect(validateYesOrNoIsAnswered(YesOrNo.YES, errorMessages)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.NO} is valid`, () => {
            expect(validateYesOrNoIsAnswered(YesOrNo.NO, errorMessages)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.DO_NOT_KNOW} is valid`, () => {
            expect(validateYesOrNoIsAnswered(YesOrNo.DO_NOT_KNOW, errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.yesOrNoUnanswered} when answer is not set`, () => {
            expect(validateYesOrNoIsAnswered(null, errorMessages)).toEqual(errorMessages.yesOrNoUnanswered);
            expect(validateYesOrNoIsAnswered(YesOrNo.UNANSWERED, errorMessages)).toEqual(
                errorMessages.yesOrNoUnanswered
            );
            expect(validateYesOrNoIsAnswered(undefined, errorMessages)).toEqual(errorMessages.yesOrNoUnanswered);
            expect(validateYesOrNoIsAnswered({}, errorMessages)).toEqual(errorMessages.yesOrNoUnanswered);
        });
    });

    describe('validateNumber', () => {
        const errorMessages: NumberIsValidErrors = { invalidNumber: 'invalidNumber' };
        it('returns undefined when value is a valid number string', () => {
            expect(validateNumber('1', errorMessages)).toBeUndefined();
            expect(validateNumber('1.2', errorMessages)).toBeUndefined();
            expect(validateNumber('1,2', errorMessages)).toBeUndefined();
            expect(validateNumber('-1', errorMessages)).toBeUndefined();
            expect(validateNumber(1, errorMessages)).toBeUndefined();
            expect(validateNumber(2, errorMessages)).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(validateNumber('', errorMessages)).toEqual(errorMessages.invalidNumber);
            expect(validateNumber('1.2.3', errorMessages)).toEqual(errorMessages.invalidNumber);
            expect(validateNumber([1], errorMessages)).toEqual(errorMessages.invalidNumber);
        });
    });

    describe('validateNumberIsWithinRange', () => {
        const errorMessages: NumberIsValidAndWithinRangeErrors = {
            invalidNumber: 'invalidNumber',
            numberToLarge: 'numberToLarge',
            numberToSmall: 'numberToSmall',
        };
        it('returns undefined if value is valid number and within range', () => {
            expect(validateNumberIsWithinRange({ min: 2 })('3', errorMessages)).toBeUndefined();
            expect(validateNumberIsWithinRange({ max: 3 })('2', errorMessages)).toBeUndefined();
            expect(validateNumberIsWithinRange({ min: 2, max: 3 })('2', errorMessages)).toBeUndefined();
            expect(validateNumberIsWithinRange({ min: 2, max: 3 })('3', errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.invalidNumber} if value is not a valid number`, () => {
            expect(validateNumberIsWithinRange({ min: 3 })('abc', errorMessages)).toEqual(errorMessages.invalidNumber);
        });
        it(`returns ${errorMessages.numberToSmall} if value is smaller than min`, () => {
            expect(validateNumberIsWithinRange({ min: 3 })('2', errorMessages)).toEqual(errorMessages.numberToSmall);
            expect(validateNumberIsWithinRange({ min: 3, max: 10 })('2', errorMessages)).toEqual(
                errorMessages.numberToSmall
            );
        });
        it(`returns ${errorMessages.numberToLarge} if value is larger than max`, () => {
            expect(validateNumberIsWithinRange({ min: 1, max: 3 })('4', errorMessages)).toEqual(
                errorMessages.numberToLarge
            );
            expect(validateNumberIsWithinRange({ max: 3 })('4', errorMessages)).toEqual(errorMessages.numberToLarge);
        });
    });
    describe('dateIsWithinRange', () => {
        const min = datepickerUtils.getDateFromDateString('2020-10-10');
        const max = datepickerUtils.getDateFromDateString('2020-10-12');
        const errorMessages: DateIsWithinRangeError = {
            dateAfterMax: 'dateAfterMax',
            dateBeforeMin: 'dateBeforeMin',
            dateHasInvalidFormat: 'dateHasInvalidFormat',
        };

        it('returns undefined if value is valid datestring and within range', () => {
            expect(validateDateIsWithinRange({ min })('2020-10-10', errorMessages)).toBeUndefined();
            expect(validateDateIsWithinRange({ max })('2020-10-10', errorMessages)).toBeUndefined();
            expect(validateDateIsWithinRange({ min, max })('2020-10-10', errorMessages)).toBeUndefined();
            expect(validateDateIsWithinRange({ min, max })('2020-10-12', errorMessages)).toBeUndefined();
        });

        it(`returns ${errorMessages.dateBeforeMin} if value is smaller than min date`, () => {
            expect(validateDateIsWithinRange({ min })('2020-10-09', errorMessages)).toEqual(
                errorMessages.dateBeforeMin
            );
        });

        it(`returns ${errorMessages.dateAfterMax} if value is larger than max date`, () => {
            expect(validateDateIsWithinRange({ max })('2020-10-15', errorMessages)).toEqual(errorMessages.dateAfterMax);
        });
    });

    describe('validateOrgNumber', () => {
        const errorMessages: OrgNumberIsValidErrors = { invalidNorwegianOrgNumber: 'invalidOrgNum' };
        it('returns undefined when the org number is valid', () => {
            expect(validateOrgNumber('979312059', errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.invalidNorwegianOrgNumber} when the org number is not valid`, () => {
            expect(validateOrgNumber('213', errorMessages)).toEqual(errorMessages.invalidNorwegianOrgNumber);
            expect(validateOrgNumber(['979312059'], errorMessages)).toEqual(errorMessages.invalidNorwegianOrgNumber);
            expect(validateOrgNumber(undefined, errorMessages)).toEqual(errorMessages.invalidNorwegianOrgNumber);
        });
    });

    describe('validateFødselsnummer', () => {
        const generatedFnr = '24090014427';
        const errorMessages: FødselsnummerIsValidErrors = {
            fødselsnummerChecksumError: 'fødselsnummerChecksumError',
            fødselsnummerNot11Chars: 'fødselsnummerNot11Chars',
            invalidFødselsnummer: 'invalidFødselsnummer',
        };

        it('returns undefined when the fødselsnummer is valid', () => {
            expect(validateFødselsnummer(generatedFnr, errorMessages)).toBeUndefined();
        });

        it(`returns ${errorMessages.fødselsnummerNot11Chars} when the fødselsnummer is not 11 chars`, () => {
            expect(validateFødselsnummer('1234567890', errorMessages)).toEqual(errorMessages.fødselsnummerNot11Chars);
            expect(validateFødselsnummer('123456789012', errorMessages)).toEqual(errorMessages.fødselsnummerNot11Chars);
        });

        it(`returns ${errorMessages.fødselsnummerChecksumError} when the fødselsnummer has invalid checksum`, () => {
            expect(validateFødselsnummer('24090014428', errorMessages)).toEqual(
                errorMessages.fødselsnummerChecksumError
            );
        });
    });
});
