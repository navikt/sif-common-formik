import { Time } from '../../types';
import getTimeValidator, { ValidateTimeError } from '../getTimeValidator';

const emptyTime: Time = {
    hours: '0',
    minutes: '0',
};

describe(`validateTime`, () => {
    it(`returns undefined when not required and value is empty`, () => {
        expect(getTimeValidator({ required: false })('')).toBeUndefined();
    });
    it(`returns undefined when wither hours and minutes have valid value`, () => {
        expect(getTimeValidator({ required: true })({ ...emptyTime, minutes: 1 })).toBeUndefined();
        expect(getTimeValidator({ required: true })({ ...emptyTime, hours: 1 })).toBeUndefined();
    });
    it(`returns ${ValidateTimeError.timeHasNoValue} when required and no hours and minutes`, () => {
        expect(getTimeValidator({ required: true })(emptyTime)).toEqual(ValidateTimeError.timeHasNoValue);
    });
    it(`returns ${ValidateTimeError.hoursAreInvalid} when hours has invalid value`, () => {
        expect(getTimeValidator()({ hours: 'x' })).toEqual(ValidateTimeError.hoursAreInvalid);
        expect(getTimeValidator()({ hours: 'x', minutes: '2' })).toEqual(ValidateTimeError.hoursAreInvalid);
    });
    it(`returns ${ValidateTimeError.minutesAreInvalid} when hours has invalid value`, () => {
        expect(getTimeValidator()({ minutes: 'x' })).toEqual(ValidateTimeError.minutesAreInvalid);
        expect(getTimeValidator()({ minutes: 'x', hours: '2' })).toEqual(ValidateTimeError.minutesAreInvalid);
    });
    it(`returns ${ValidateTimeError.tooManyHours} when hours are more than 23 hours`, () => {
        expect(getTimeValidator()({ hours: '24' })).toEqual(ValidateTimeError.tooManyHours);
    });
    it(`returns ${ValidateTimeError.tooManyMinutes} when hours are more than 59 minutes`, () => {
        expect(getTimeValidator()({ minutes: '60' })).toEqual(ValidateTimeError.tooManyMinutes);
    });
    it(`returns ${ValidateTimeError.durationIsTooLong} when hours and minutes are more than max duration`, () => {
        expect(getTimeValidator({ max: { hours: 5, minutes: 0 } })({ hours: '5', minutes: '1' })).toEqual(
            ValidateTimeError.durationIsTooLong
        );
        expect(getTimeValidator({ max: { hours: 0, minutes: 10 } })({ hours: '0', minutes: '11' })).toEqual(
            ValidateTimeError.durationIsTooLong
        );
        expect(getTimeValidator({ max: { hours: 5, minutes: 0 } })({ hours: '5', minutes: '0' })).toBeUndefined();
    });
    it(`returns ${ValidateTimeError.durationIsTooShort} when hours and minutes are more than max duration`, () => {
        expect(getTimeValidator({ min: { hours: 5, minutes: 0 } })({ hours: '4', minutes: '59' })).toEqual(
            ValidateTimeError.durationIsTooShort
        );
        expect(getTimeValidator({ min: { hours: 0, minutes: 10 } })({ hours: '0', minutes: '09' })).toEqual(
            ValidateTimeError.durationIsTooShort
        );
        expect(getTimeValidator({ min: { hours: 0, minutes: 10 } })({ hours: '0', minutes: '10' })).toBeUndefined();
    });
});
