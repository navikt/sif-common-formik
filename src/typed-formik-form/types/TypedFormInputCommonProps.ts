// import { FieldValidationResult } from '../../validation/types';

export interface TypedFormInputCommonProps {
    validate?: (value: any) => any; // FieldValidationResult | string | Promise<void> | undefined;
    info?: React.ReactNode;
}
