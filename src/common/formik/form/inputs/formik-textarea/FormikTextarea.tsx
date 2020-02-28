import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Textarea, TextareaControlledProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

interface FormikTextareaProps<FieldName> extends Omit<TextareaControlledProps, 'name' | 'defaultValue'> {
    name: FieldName;
}

type Props<FieldName> = FormikTextareaProps<FieldName> & FormikInputCommonProps;

function FormikTextarea<FieldName>({ label, name, validate, info, feil, ...restProps }: Props<FieldName>) {
    const context = React.useContext(FormikFormContext);
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
