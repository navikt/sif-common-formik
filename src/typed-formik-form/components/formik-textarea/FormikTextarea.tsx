import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Textarea, TextareaControlledProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<TextareaControlledProps, 'name' | 'defaultValue'> {
    name: FieldName;
}

export type FormikTextareaProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

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
                        feil={context ? context.getAndRenderFieldErrorMessage(field, form) : feil}
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
