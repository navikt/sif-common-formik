import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select, SelectProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name'> {
    name: FieldName;
}

export type FormikSelectProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikSelect<FieldName>({
    label,
    name,
    children,
    validate,
    info,
    feil,
    ...restProps
}: FormikSelectProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Select
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        {...field}
                        {...restProps}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        value={field.value === undefined ? '' : field.value}>
                        {children}
                    </Select>
                );
            }}
        </Field>
    );
}

export default FormikSelect;
