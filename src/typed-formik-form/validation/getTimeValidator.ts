import { Time } from '../types';
import { ValidationFunction } from './types';
import { getNumberFromStringInput, hasValue } from './validationUtils';

export enum ValidateTimeError {
    timeHasNoValue = 'timeHasNoValue',
    hoursAreInvalid = 'hoursAreInvalid',
    hoursAreNegative = 'hoursAreNegative',
    minutesAreInvalid = 'minutesAreInvalid',
    minutesAreNegative = 'minutesAreNegative',
    tooManyHours = 'tooManyHours',
    tooManyMinutes = 'tooManyMinutes',
    durationIsTooLong = 'durationIsTooLong',
    durationIsTooShort = 'durationIsTooShort',
}

type TimeValidationResult =
    | undefined
    | ValidateTimeError.timeHasNoValue
    | ValidateTimeError.hoursAreInvalid
    | ValidateTimeError.hoursAreNegative
    | ValidateTimeError.minutesAreInvalid
    | ValidateTimeError.minutesAreNegative
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

const valueIsValidNumber = (value: string | undefined): boolean => {
    if (value) {
        return value.match(/^[\-0-9]+$/) !== null; // Tillatt - for å kunne gi feil på negative verdier
    }
    return false;
};

const getTimeValidator = (options: Options = {}): ValidationFunction<TimeValidationResult> => (
    value: Partial<Time>
) => {
    const { required, max, min } = options;
    const { hours: inputHours, minutes: inputMinutes } = value || {};

    if (hasValue(inputHours) && valueIsValidNumber(inputHours) === false) {
        return ValidateTimeError.hoursAreInvalid;
    }
    if (hasValue(inputMinutes) && valueIsValidNumber(inputMinutes) === false) {
        return ValidateTimeError.minutesAreInvalid;
    }

    const hours = getNumberFromStringInput(inputHours || '0');
    const minutes = getNumberFromStringInput(inputMinutes || '0');

    if (hours === undefined) {
        return ValidateTimeError.hoursAreInvalid;
    } else if (hours > 23) {
        return ValidateTimeError.tooManyHours;
    } else if (hours < 0) {
        return ValidateTimeError.hoursAreNegative;
    }
    if (minutes === undefined) {
        return ValidateTimeError.minutesAreInvalid;
    } else if (minutes > 59) {
        return ValidateTimeError.tooManyMinutes;
    } else if (minutes < 0) {
        return ValidateTimeError.minutesAreNegative;
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
