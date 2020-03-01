import { YesOrNo } from '../../typed-formik-form/types/YesOrNo';
import { FieldValidationResult } from '../modules/validation/types';
import { erGyldigNorskOrgnummer } from './erGyldigNorskOrgnummer';
import { fødselsnummerIsValid, FødselsnummerValidationErrorReason } from './fødselsnummerValidator';
import { hasValue } from './hasValue';

export enum FieldValidationErrors {
    'påkrevd' = 'common.fieldvalidation.påkrevd',
    'fødselsnummer_11siffer' = 'common.fieldvalidation.fødselsnummer.11siffer',
    'fødselsnummer_ugyldig' = 'common.fieldvalidation.fødselsnummer.ugyldig',
    'orgnum_ugyldig' = 'common.fieldvalidation.orgnum.ugyldig'
}

export const fieldIsRequiredError = () => createFieldValidationError(FieldValidationErrors.påkrevd);

export const validateFødselsnummer = (v: string): FieldValidationResult => {
    const [isValid, reasons] = fødselsnummerIsValid(v);
    if (!isValid) {
        if (reasons.includes(FødselsnummerValidationErrorReason.MustConsistOf11Digits)) {
            return createFieldValidationError(FieldValidationErrors.fødselsnummer_11siffer);
        } else {
            return createFieldValidationError(FieldValidationErrors.fødselsnummer_ugyldig);
        }
    }
};

export const validateYesOrNoIsAnswered = (answer: YesOrNo): FieldValidationResult => {
    if (answer === YesOrNo.UNANSWERED || answer === undefined) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const validateRequiredField = (value: any): FieldValidationResult => {
    if (!hasValue(value)) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const validateTruthyCheckbox = (value: any): FieldValidationResult => {
    if (value !== true) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const validateRequiredList = (value: any): FieldValidationResult => {
    if (!hasValue(value) || value?.length === 0) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const validateRequiredSelect = (value: any): FieldValidationResult => {
    if (!hasValue(value)) {
        return fieldIsRequiredError();
    }
    return undefined;
};

export const createFieldValidationError = <T extends string>(
    key: T | undefined,
    values?: any
): FieldValidationResult => {
    return key
        ? {
              key,
              values
          }
        : undefined;
};

export const validateOrgNumber = (orgnum: string, isNorwegian: boolean): FieldValidationResult => {
    if (isNorwegian) {
        if (!erGyldigNorskOrgnummer(orgnum)) {
            return { key: FieldValidationErrors.orgnum_ugyldig };
        }
        return undefined;
    }
    return validateRequiredField(orgnum);
};
