import { FormikValidateFunction } from './FormikValidateFunction';

export interface TypedFormInputCommonProps {
    validate?: FormikValidateFunction;
    info?: React.ReactNode;
}
