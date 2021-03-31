import datepickerUtils from '../../components/formik-datepicker/datepickerUtils';
import { YesOrNo } from '../../types';
import formikFieldValidation, {
    DateIsValidErrors,
    EmptyListErrors,
    FieldHasValueErrors,
    YesOrNoIsAnsweredErrors,
    NumberIsValidErrors,
    DateIsWithinRangeError,
    NumberIsValidAndWithinRangeErrors,
    OrgNumberIsValidErrors,
    FødselsnummerIsValidErrors,
} from '../formikFieldValidation';

describe('formikValidation', () => {
    const {
        fieldHasValue,
        listHasItems,
        dateIsValid,
        yesOrNoIsAnswered,
        numberIsValid,
        numberIsValidAndWithinRange,
        dateIsWithinRange,
        orgNumberIsValid,
        fødselsnummerIsValid,
    } = formikFieldValidation;

    describe('fieldHasValue', () => {
        const errorMessages: FieldHasValueErrors = { noValue: 'No value' };
        it('returns undefined when value is defined', () => {
            expect(fieldHasValue('a', errorMessages)).toBeUndefined();
            expect(fieldHasValue(1, errorMessages)).toBeUndefined();
            expect(fieldHasValue({}, errorMessages)).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(fieldHasValue('', errorMessages)).toEqual(errorMessages.noValue);
            expect(fieldHasValue(null, errorMessages)).toEqual(errorMessages.noValue);
            expect(fieldHasValue(undefined, errorMessages)).toEqual(errorMessages.noValue);
        });
    });

    describe('listHasItems', () => {
        const errorMessages: EmptyListErrors = { listIsEmpty: 'empty list' };
        it('returns undefined when list is defined and has items', () => {
            expect(listHasItems([1], errorMessages)).toBeUndefined();
        });
        it('returns error when list is undefined or has no items', () => {
            expect(listHasItems(undefined, errorMessages)).toEqual(errorMessages.listIsEmpty);
            expect(listHasItems(null, errorMessages)).toEqual(errorMessages.listIsEmpty);
            expect(listHasItems([], errorMessages)).toEqual(errorMessages.listIsEmpty);
        });
    });

    describe('dateIsValid', () => {
        const errorMessages: DateIsValidErrors = { dateHasInvalidFormat: 'invalidFormat' };
        it('returns undefined when date is valid', () => {
            expect(dateIsValid('2020-10-10', errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.dateHasInvalidFormat} when date is invalid`, () => {
            expect(dateIsValid('2020-10-1', errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
            expect(dateIsValid('2020.10.10', errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
            expect(dateIsValid(null, errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
            expect(dateIsValid(undefined, errorMessages)).toEqual(errorMessages.dateHasInvalidFormat);
        });
    });

    describe('yesOrNoIsAnswered', () => {
        const errorMessages: YesOrNoIsAnsweredErrors = { yesOrNoUnanswered: 'unanswered' };
        it(`returns undefined when answer is ${YesOrNo.YES} is valid`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.YES, errorMessages)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.NO} is valid`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.NO, errorMessages)).toBeUndefined();
        });
        it(`returns undefined when answer is ${YesOrNo.DO_NOT_KNOW} is valid`, () => {
            expect(yesOrNoIsAnswered(YesOrNo.DO_NOT_KNOW, errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.yesOrNoUnanswered} when answer is not set`, () => {
            expect(yesOrNoIsAnswered(null, errorMessages)).toEqual(errorMessages.yesOrNoUnanswered);
            expect(yesOrNoIsAnswered(YesOrNo.UNANSWERED, errorMessages)).toEqual(errorMessages.yesOrNoUnanswered);
            expect(yesOrNoIsAnswered(undefined, errorMessages)).toEqual(errorMessages.yesOrNoUnanswered);
            expect(yesOrNoIsAnswered({}, errorMessages)).toEqual(errorMessages.yesOrNoUnanswered);
        });
    });

    describe('numberIsValid', () => {
        const errorMessages: NumberIsValidErrors = { invalidNumber: 'invalidNumber' };
        it('returns undefined when value is a valid number string', () => {
            expect(numberIsValid('1', errorMessages)).toBeUndefined();
            expect(numberIsValid('1.2', errorMessages)).toBeUndefined();
            expect(numberIsValid('1,2', errorMessages)).toBeUndefined();
            expect(numberIsValid('-1', errorMessages)).toBeUndefined();
            expect(numberIsValid(1, errorMessages)).toBeUndefined();
            expect(numberIsValid(2, errorMessages)).toBeUndefined();
        });
        it('returns error when value is not empty, undefined or null', () => {
            expect(numberIsValid('', errorMessages)).toEqual(errorMessages.invalidNumber);
            expect(numberIsValid('1.2.3', errorMessages)).toEqual(errorMessages.invalidNumber);
            expect(numberIsValid([1], errorMessages)).toEqual(errorMessages.invalidNumber);
        });
    });

    describe('isNumberWithinRange', () => {
        const errorMessages: NumberIsValidAndWithinRangeErrors = {
            invalidNumber: 'invalidNumber',
            numberToLarge: 'numberToLarge',
            numberToSmall: 'numberToSmall',
        };
        it('returns undefined if value is valid number and within range', () => {
            expect(numberIsValidAndWithinRange({ min: 2 })('3', errorMessages)).toBeUndefined();
            expect(numberIsValidAndWithinRange({ max: 3 })('2', errorMessages)).toBeUndefined();
            expect(numberIsValidAndWithinRange({ min: 2, max: 3 })('2', errorMessages)).toBeUndefined();
            expect(numberIsValidAndWithinRange({ min: 2, max: 3 })('3', errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.invalidNumber} if value is not a valid number`, () => {
            expect(numberIsValidAndWithinRange({ min: 3 })('abc', errorMessages)).toEqual(errorMessages.invalidNumber);
        });
        it(`returns ${errorMessages.numberToSmall} if value is smaller than min`, () => {
            expect(numberIsValidAndWithinRange({ min: 3 })('2', errorMessages)).toEqual(errorMessages.numberToSmall);
            expect(numberIsValidAndWithinRange({ min: 3, max: 10 })('2', errorMessages)).toEqual(
                errorMessages.numberToSmall
            );
        });
        it(`returns ${errorMessages.numberToLarge} if value is larger than max`, () => {
            expect(numberIsValidAndWithinRange({ min: 1, max: 3 })('4', errorMessages)).toEqual(
                errorMessages.numberToLarge
            );
            expect(numberIsValidAndWithinRange({ max: 3 })('4', errorMessages)).toEqual(errorMessages.numberToLarge);
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
            expect(dateIsWithinRange({ min })('2020-10-10', errorMessages)).toBeUndefined();
            expect(dateIsWithinRange({ max })('2020-10-10', errorMessages)).toBeUndefined();
            expect(dateIsWithinRange({ min, max })('2020-10-10', errorMessages)).toBeUndefined();
            expect(dateIsWithinRange({ min, max })('2020-10-12', errorMessages)).toBeUndefined();
        });

        it(`returns ${errorMessages.dateBeforeMin} if value is smaller than min date`, () => {
            expect(dateIsWithinRange({ min })('2020-10-09', errorMessages)).toEqual(errorMessages.dateBeforeMin);
        });

        it(`returns ${errorMessages.dateAfterMax} if value is larger than max date`, () => {
            expect(dateIsWithinRange({ max })('2020-10-15', errorMessages)).toEqual(errorMessages.dateAfterMax);
        });
    });

    describe('orgNumberIsValid', () => {
        const errorMessages: OrgNumberIsValidErrors = { invalidNorwegianOrgNumber: 'invalidOrgNum' };
        it('returns undefined when the org number is valid', () => {
            expect(orgNumberIsValid('979312059', errorMessages)).toBeUndefined();
        });
        it(`returns ${errorMessages.invalidNorwegianOrgNumber} when the org number is not valid`, () => {
            expect(orgNumberIsValid('213', errorMessages)).toEqual(errorMessages.invalidNorwegianOrgNumber);
            expect(orgNumberIsValid(['979312059'], errorMessages)).toEqual(errorMessages.invalidNorwegianOrgNumber);
            expect(orgNumberIsValid(undefined, errorMessages)).toEqual(errorMessages.invalidNorwegianOrgNumber);
        });
    });

    describe('fødselsnummerIsValid', () => {
        const generatedFnr = '24090014427';
        const errorMessages: FødselsnummerIsValidErrors = {
            fødselsnummerChecksumError: 'fødselsnummerChecksumError',
            fødselsnummerNot11Chars: 'fødselsnummerNot11Chars',
            invalidFødselsnummer: 'invalidFødselsnummer',
        };

        it('returns undefined when the fødselsnummer is valid', () => {
            expect(fødselsnummerIsValid(generatedFnr, errorMessages)).toBeUndefined();
        });

        it(`returns ${errorMessages.fødselsnummerNot11Chars} when the fødselsnummer is not 11 chars`, () => {
            expect(fødselsnummerIsValid('1234567890', errorMessages)).toEqual(errorMessages.fødselsnummerNot11Chars);
            expect(fødselsnummerIsValid('123456789012', errorMessages)).toEqual(errorMessages.fødselsnummerNot11Chars);
        });

        it(`returns ${errorMessages.fødselsnummerChecksumError} when the fødselsnummer has invalid checksum`, () => {
            expect(fødselsnummerIsValid('24090014428', errorMessages)).toEqual(
                errorMessages.fødselsnummerChecksumError
            );
        });
    });
});
