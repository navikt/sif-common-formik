import { YesOrNo } from '../../types';
import {
    isValidNumber,
    isAnswerdYesOrNo,
    isFieldWithValue,
    isValidArrayWithItems,
    isValidDatePickerDateString,
    isNumberWithinRange,
    isValidOrgNumber,
} from '../validation';

describe('validation', () => {
    describe('isFieldWithValue', () => {
        it('rejects when value is empty, undefined or null', () => {
            expect(isFieldWithValue('')).toBeFalsy();
            expect(isFieldWithValue(null)).toBeFalsy();
            expect(isFieldWithValue(undefined)).toBeFalsy();
        });
        it('accepts when value is not empty, undefined or null', () => {
            expect(isFieldWithValue('1')).toBeTruthy();
        });
    });
    describe('isValidArrayWithItems', () => {
        it('rejects if value is not an array', () => {
            expect(isValidArrayWithItems(undefined)).toBeFalsy();
            expect(isValidArrayWithItems(null)).toBeFalsy();
            expect(isValidArrayWithItems({})).toBeFalsy();
            expect(isValidArrayWithItems(2)).toBeFalsy();
            expect(isValidArrayWithItems('213')).toBeFalsy();
        });
        it('rejects if value is an empty array', () => {
            expect(isValidArrayWithItems([])).toBeFalsy();
        });
        it('accepts if value is an array with items > 0', () => {
            expect(isValidArrayWithItems([1])).toBeTruthy();
            expect(isValidArrayWithItems([1, 2])).toBeTruthy();
        });
    });
    describe('isValidDatePickerDateString', () => {
        it('rejects if value is not a valid dateString', () => {
            expect(isValidDatePickerDateString(undefined)).toBeFalsy();
            expect(isValidDatePickerDateString('')).toBeFalsy();
            expect(isValidDatePickerDateString('20-10-10')).toBeFalsy();
            expect(isValidDatePickerDateString('2020.10.02')).toBeFalsy();
        });
        it('accepts if value is a valid isValidDatePickerDateString', () => {
            expect(isValidDatePickerDateString('2020-10-10')).toBeTruthy();
            expect(isValidDatePickerDateString('1900-01-01')).toBeTruthy();
        });
    });

    describe('isAnswerdYesOrNoQuestion', () => {
        it(`rejects if value is not ${YesOrNo.YES} or ${YesOrNo.NO}`, () => {
            expect(isAnswerdYesOrNo(undefined)).toBeFalsy();
            expect(isAnswerdYesOrNo(YesOrNo.UNANSWERED)).toBeFalsy();
        });
        it(`accepts if value is ${YesOrNo.YES} or ${YesOrNo.NO}`, () => {
            expect(isAnswerdYesOrNo(YesOrNo.DO_NOT_KNOW)).toBeTruthy();
            expect(isAnswerdYesOrNo(YesOrNo.YES)).toBeTruthy();
            expect(isAnswerdYesOrNo(YesOrNo.NO)).toBeTruthy();
        });
    });

    describe('isValidNumber', () => {
        it(`rejects if value is not a valid number`, () => {
            expect(isValidNumber(undefined)).toBeFalsy();
            expect(isValidNumber({})).toBeFalsy();
            expect(isValidNumber([])).toBeFalsy();
        });
        it(`accepts if value is a string which can beconverted to a valid number`, () => {
            expect(isValidNumber('2.2')).toBeTruthy();
            expect(isValidNumber('2.1')).toBeTruthy();
            expect(isValidNumber('-1')).toBeTruthy();
        });
        it(`accepts if value is a valid number or can be converted to a valid number`, () => {
            expect(isValidNumber('2')).toBeTruthy();
            expect(isValidNumber(-1)).toBeTruthy();
            expect(isValidNumber(0)).toBeTruthy();
            expect(isValidNumber(1)).toBeTruthy();
            expect(isValidNumber(1.123)).toBeTruthy();
        });
    });
    describe('isNumberWithinRange', () => {
        it(`rejects if value is below min value`, () => {
            expect(isNumberWithinRange(0, { min: 10 })).toBeFalsy();
            expect(isNumberWithinRange(-10.2, { min: -10 })).toBeFalsy();
        });
        it(`rejects if value is above max value`, () => {
            expect(isNumberWithinRange(11, { max: 10 })).toBeFalsy();
            expect(isNumberWithinRange(10.1, { max: 10 })).toBeFalsy();
        });
        it(`accepts if value is equal min value`, () => {
            expect(isNumberWithinRange(10, { min: 10 })).toBeTruthy();
            expect(isNumberWithinRange(10, { max: 10 })).toBeTruthy();
        });
    });
    describe('isValidOrgNumber', () => {
        it(`rejects invalid org number`, () => {
            expect(isValidOrgNumber(undefined)).toBeFalsy();
            expect(isValidOrgNumber('')).toBeFalsy();
            expect(isValidOrgNumber(123)).toBeFalsy();
            expect(isValidOrgNumber(979312059)).toBeFalsy();
        });
        it(`rejects valid org number sent in as a number`, () => {
            expect(isValidOrgNumber(979312059)).toBeFalsy();
        });
        it(`accepts valid org number`, () => {
            expect(isValidOrgNumber('979312059')).toBeTruthy();
        });
    });
});
