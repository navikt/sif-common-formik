import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Textarea, TextareaControlledProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<TextareaControlledProps, 'name' | 'defaultValue'> {
    name: FieldName;
}

export type FormikTextareaProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps;

function FormikTextarea<FieldName, ErrorType>({
    name,
    validate,
    feil,
    useFastField,
    ...restProps
}: FormikTextareaProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
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
        </FieldComponent>
    );
}

export default FormikTextarea;
