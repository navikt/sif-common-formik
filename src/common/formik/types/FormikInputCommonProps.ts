import { FieldValidationResult } from '../validation/types';

export interface FormikInputCommonProps {
    validate?: (value: any) => FieldValidationResult | string | Promise<void> | undefined;
    helperText?: React.ReactNode;
}
