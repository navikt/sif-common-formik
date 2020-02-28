import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Input, InputProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { TypedFormikFormContext } from '../../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<InputProps, 'name'> {
    name: FieldName;
}

export type FormikInputProps<FieldName> = OwnProps<FieldName> & FormikInputCommonProps;

function FormikInput<FieldName>({ label, name, info, feil, validate, ...restProps }: FormikInputProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Input
                        {...restProps}
                        {...field}
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                        value={field.value === undefined ? '' : field.value}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
