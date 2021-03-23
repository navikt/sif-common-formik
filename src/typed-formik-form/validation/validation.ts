import { FormikValidateFunction, YesOrNo } from '../types';

export const hasValue = (v: any) => v !== '' && v !== undefined && v !== null;

enum VALIDATION_ERROR_TYPE {
    'yesOrNoUnanswered' = 'yesOrNoUnanswered',
    'emptyField' = 'emptyField',
    'emptyList' = 'emptyList',
}
interface ValidationError {
    error: VALIDATION_ERROR_TYPE;
    field?: string;
}

type ValidationResult = ValidationError | undefined;

const createValidationError = (error: VALIDATION_ERROR_TYPE, field?: string): ValidationError => ({
    error,
    field,
});

const requiredYesOrNo: FormikValidateFunction = (answer: YesOrNo, field?: string): ValidationResult => {
    if (answer === YesOrNo.UNANSWERED || answer === undefined) {
        return { error: VALIDATION_ERROR_TYPE.yesOrNoUnanswered, field };
    }
    return undefined;
};

const requiredField: FormikValidateFunction = (value: any, field?: string): ValidationResult => {
    return !hasValue(value) ? createValidationError(VALIDATION_ERROR_TYPE.emptyField, field) : undefined;
};

const requiredList: FormikValidateFunction = (value: any, field?: string): ValidationResult => {
    return hasValue(value) && value?.length > 0
        ? createValidationError(VALIDATION_ERROR_TYPE.emptyList, field)
        : undefined;
};

const validationUtils = {
    requiredYesOrNo,
    requiredField,
    requiredList,
};

export default validationUtils;
