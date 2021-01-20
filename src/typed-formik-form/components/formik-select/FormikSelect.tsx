import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select, SelectProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name'> {
    name: FieldName;
}

export type FormikSelectProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikSelect<FieldName>({ name, children, validate, feil, ...restProps }: FormikSelectProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
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
