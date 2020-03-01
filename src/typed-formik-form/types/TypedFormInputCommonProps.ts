import { FormikValidateFunction } from './FormikValidateFunction';

export interface TypedFormInputCommonProps {
    validate?: FormikValidateFunction; // FieldValidationResult | string | Promise<void> | undefined;
    info?: React.ReactNode;
}
