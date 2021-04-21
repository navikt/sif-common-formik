import React from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<CheckboxProps, 'name'> {
    name: FieldName;
    afterOnChange?: (newValue: boolean) => void;
}

export type FormikCheckboxProps<FieldName> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName>;

function FormikCheckbox<FieldName>({
    name,
    validate,
    afterOnChange,
    feil,
    ...restProps
}: FormikCheckboxProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Checkbox
                        {...restProps}
                        {...field}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        checked={field.value === true}
                        autoComplete="off"
                        onChange={(evt) => {
                            const newValue = evt.target.checked;
                            form.setFieldValue(field.name, newValue);
                            if (afterOnChange) {
                                afterOnChange(newValue);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCheckbox;
