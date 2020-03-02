import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Input, InputProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<InputProps, 'name'> {
    name: FieldName;
}

export type FormikInputProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

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
                        feil={context ? context.getAndRenderFieldErrorMessage(field, form) : feil}
                        value={field.value === undefined ? '' : field.value}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
