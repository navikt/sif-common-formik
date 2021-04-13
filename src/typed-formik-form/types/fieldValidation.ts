export type FormikFieldValidationResult = React.ReactNode | undefined;
export type FormikValidateFieldFunction<ValueType = any> = (value: ValueType) => any;
export type FormikFieldValidation<ValueType = any> =
    | FormikValidateFieldFunction<ValueType>
    | FormikValidateFieldFunction<ValueType>[];
