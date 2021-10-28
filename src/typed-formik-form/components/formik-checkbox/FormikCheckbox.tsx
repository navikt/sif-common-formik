import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<CheckboxProps, 'name'> {
    name: FieldName;
    afterOnChange?: (newValue: boolean) => void;
}

export type FormikCheckboxProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps;

function FormikCheckbox<FieldName, ErrorType>({
    name,
    validate,
    afterOnChange,
    feil,
    useFastField,
    ...restProps
}: FormikCheckboxProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
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
        </FieldComponent>
    );
}

export default FormikCheckbox;
