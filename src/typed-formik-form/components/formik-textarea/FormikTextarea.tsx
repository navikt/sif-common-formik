import React from 'react';
import { Field, FieldProps } from 'formik';
import { Textarea, TextareaControlledProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<TextareaControlledProps, 'name' | 'defaultValue'> {
    name: FieldName;
}

export type FormikTextareaProps<FieldName> = OwnProps<FieldName> & TypedFormInputValidationProps;

function FormikTextarea<FieldName>({ name, validate, feil, ...restProps }: FormikTextareaProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Textarea
                        {...restProps}
                        {...field}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        onChange={(evt) => {
                            form.setFieldValue(field.name, evt.target.value);
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        autoComplete="off"
                        value={field.value || ''}
                    />
                );
            }}
        </Field>
    );
}

export default FormikTextarea;
