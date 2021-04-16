import { ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredValueError } from './validateRequiredValue';

export enum ValidateOrgNumberError {
    invalidOrgNumberFormat = 'invalidOrgNumberFormat',
}

type OrgNumberValidationResult =
    | undefined
    | ValidateRequiredValueError.noValue
    | ValidateOrgNumberError.invalidOrgNumberFormat;

interface Options {
    required?: boolean;
}

const getMod11 = (strValue: string): number => {
    let checkNbr = 2;
    let mod = 0;

    for (let i = strValue.length - 2; i >= 0; --i) {
        mod += parseInt(strValue.charAt(i), 10) * checkNbr;
        if (++checkNbr > 7) {
            checkNbr = 2;
        }
    }
    const result = 11 - (mod % 11);
    return result === 11 ? 0 : result;
};

const isValidOrgNumber = (value: any): boolean => {
    if (
        value &&
        typeof value === 'string' &&
        value.length === 9 &&
        /^[0-9]*$/.test(value) &&
        (value.charAt(0) === '8' || value.charAt(0) === '9')
    ) {
        return getMod11(value) === parseInt(value.charAt(8), 10);
    }
    return false;
};

const validateOrgNumber = (options: Options = {}): ValidationFunction<OrgNumberValidationResult> => (value: any) => {
    const { required } = options;
    const isValidFormat = isValidOrgNumber(value);
    if (hasValue(value) === false && required) {
        return ValidateRequiredValueError.noValue;
    }
    if (hasValue(value) && isValidFormat === false) {
        return ValidateOrgNumberError.invalidOrgNumberFormat;
    }
    return undefined;
};

export default validateOrgNumber;
