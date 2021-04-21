import { ValidationErrorRenderFunc, ValidationFunction } from './types';
import { hasValue } from './validationUtils';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';

export enum ValidateOrgNumberError {
    invalidOrgNumberFormat = 'invalidOrgNumberFormat',
}

type OrgNumberValidationResult =
    | undefined
    | ValidateRequiredFieldError.noValue
    | ValidateOrgNumberError.invalidOrgNumberFormat
    | ValidationErrorRenderFunc;

type Errors = {
    [ValidateRequiredFieldError.noValue]: ValidateRequiredFieldError.noValue | ValidationErrorRenderFunc;
    [ValidateOrgNumberError.invalidOrgNumberFormat]:
        | ValidateOrgNumberError.invalidOrgNumberFormat
        | ValidationErrorRenderFunc;
};

const defaultErrors: Errors = {
    noValue: ValidateRequiredFieldError.noValue,
    invalidOrgNumberFormat: ValidateOrgNumberError.invalidOrgNumberFormat,
};

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

const getOrgNumberValidator = (
    options: Options = {},
    customErrors?: Errors
): ValidationFunction<OrgNumberValidationResult> => (value: any) => {
    const { required } = options;
    const errors: Errors = {
        ...defaultErrors,
        ...customErrors,
    };
    const isValidFormat = isValidOrgNumber(value);
    if (hasValue(value) === false && required) {
        return errors[ValidateRequiredFieldError.noValue];
    }
    if (hasValue(value) && isValidFormat === false) {
        return errors[ValidateOrgNumberError.invalidOrgNumberFormat];
    }
    return undefined;
};

export default getOrgNumberValidator;
