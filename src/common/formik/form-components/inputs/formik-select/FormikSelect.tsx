import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Select, SelectProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name'> {
    name: FieldName;
}

export type FormikSelectProps<FieldName> = OwnProps<FieldName> & FormikInputCommonProps;

function FormikSelect<FieldName>({
    label,
    name,
    children,
    validate,
    info,
    feil,
    ...restProps
}: FormikSelectProps<FieldName>) {
    const context = React.useContext(FormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Select
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        {...field}
                        {...restProps}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                        value={field.value === undefined ? '' : field.value}>
                        {children}
                    </Select>
                );
            }}
        </Field>
    );
}

export default FormikSelect;
