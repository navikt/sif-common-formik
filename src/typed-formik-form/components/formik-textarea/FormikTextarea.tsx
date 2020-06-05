import React from 'react';
import { Field, FieldProps } from 'formik';
import { Textarea, TextareaControlledProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
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
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        onChange={(evt) => {
                            form.setFieldValue(field.name, evt.target.value);
                            context?.onAfterFieldValueSet();
                        }}
                        value={field.value || ''}
                    />
                );
            }}
        </Field>
    );
}

export default FormikTextarea;
