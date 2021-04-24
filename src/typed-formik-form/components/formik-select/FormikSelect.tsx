import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select, SelectProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name'> {
    name: FieldName;
}

export type FormikSelectProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType>;

function FormikSelect<FieldName, ErrorType>({
    name,
    children,
    validate,
    feil,
    ...restProps
}: FormikSelectProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value) => validate(value, name) : undefined} name={name}>
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
        </Field>
    );
}

export default FormikSelect;
