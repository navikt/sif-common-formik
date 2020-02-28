import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Textarea, TextareaControlledProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { TypedFormikFormContext } from '../../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<TextareaControlledProps, 'name' | 'defaultValue'> {
    name: FieldName;
}

export type FormikTextareaProps<FieldName> = OwnProps<FieldName> & FormikInputCommonProps;

function FormikTextarea<FieldName>({
    label,
    name,
    validate,
    info,
    feil,
    ...restProps
}: FormikTextareaProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Textarea
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        {...restProps}
                        {...field}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                        onChange={(evt) => {
                            form.setFieldValue(field.name, evt.target.value);
                        }}
                        value={field.value || ''}
                    />
                );
            }}
        </Field>
    );
}

export default FormikTextarea;
