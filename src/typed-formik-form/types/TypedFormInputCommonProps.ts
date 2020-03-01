// import { FieldValidationResult } from '../../validation/types';

export interface TypedFormInputCommonProps<ErrorType = any> {
    validate?: (value: any) => ErrorType; // FieldValidationResult | string | Promise<void> | undefined;
    info?: React.ReactNode;
}
