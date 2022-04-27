import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Select, SelectProps } from 'nav-frontend-skjema';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name'> {
    name: FieldName;
}

export type FormikSelectProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

function FormikSelect<FieldName, ErrorType>({
    name,
    children,
    validate,
    feil,
    useFastField,
    ...restProps
}: FormikSelectProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Select
                        {...field}
                        {...restProps}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        autoComplete="off"
                        value={field.value === undefined ? '' : field.value}>
                        {children}
                    </Select>
                );
            }}
        </FieldComponent>
    );
}

export default FormikSelect;
