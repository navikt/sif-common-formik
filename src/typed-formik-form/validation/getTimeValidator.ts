import { Time } from '../types';
import { ValidationFunction } from './types';
import { getNumberFromStringInput } from './validationUtils';

export enum ValidateTimeError {
    timeHasNoValue = 'timeHasNoValue',
    hoursAreInvalid = 'hoursAreInvalid',
    minutesAreInvalid = 'minutesAreInvalid',
    tooManyHours = 'tooManyHours',
    tooManyMinutes = 'tooManyMinutes',
    durationIsTooLong = 'durationIsTooLong',
    durationIsTooShort = 'durationIsTooShort',
}

type TimeValidationResult =
    | undefined
    | ValidateTimeError.timeHasNoValue
    | ValidateTimeError.hoursAreInvalid
    | ValidateTimeError.minutesAreInvalid
    | ValidateTimeError.durationIsTooLong
    | ValidateTimeError.durationIsTooShort
    | ValidateTimeError.tooManyHours
    | ValidateTimeError.tooManyMinutes;

type TimeRange = {
    hours: number;
    minutes: number;
};

interface Options {
    required?: boolean;
    min?: TimeRange;
    max?: TimeRange;
}

const getMinutes = (hours: number, minutes: number): number => hours * 60 + minutes;

const getTimeValidator = (options: Options = {}): ValidationFunction<TimeValidationResult> => (
    value: Partial<Time>
) => {
    const { required, max, min } = options;
    const { hours: inputHours, minutes: inputMinutes } = value || {};

    const hours = getNumberFromStringInput(inputHours || '0');
    const minutes = getNumberFromStringInput(inputMinutes || '0');

    if (hours === undefined) {
        return ValidateTimeError.hoursAreInvalid;
    } else if (hours > 23) {
        return ValidateTimeError.tooManyHours;
    }
    if (minutes === undefined) {
        return ValidateTimeError.minutesAreInvalid;
    } else if (minutes > 59) {
        return ValidateTimeError.tooManyMinutes;
    }

    if (required && hours === 0 && minutes === 0) {
        return ValidateTimeError.timeHasNoValue;
    }

    if (max) {
        if (getMinutes(hours, minutes) > getMinutes(max.hours, max.minutes)) {
            return ValidateTimeError.durationIsTooLong;
        }
    }

    if (min) {
        if (getMinutes(hours, minutes) < getMinutes(min.hours, min.minutes)) {
            return ValidateTimeError.durationIsTooShort;
        }
    }

    return undefined;
};

export default getTimeValidator;
