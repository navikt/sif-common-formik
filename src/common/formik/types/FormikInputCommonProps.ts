// import { FieldValidationResult } from '../../validation/types';

export interface FormikInputCommonProps<ErrorType = any> {
    validate?: (value: any) => ErrorType; // FieldValidationResult | string | Promise<void> | undefined;
    info?: React.ReactNode;
}
