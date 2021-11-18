import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<CheckboxProps, 'name' | 'value'> {
    name: FieldName;
    value?: string;
    afterOnChange?: (value: boolean | string[]) => void;
}

export type FormikCheckboxProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps;

const getFieldValueArray = (value: any): string[] => {
    if (value === undefined) {
        return [];
    }
    if (typeof value === 'string') {
        return [value];
    }
    return value;
};

function FormikCheckbox<FieldName, ErrorType>({
    name,
    validate,
    value,
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
                        autoComplete="off"
                        onChange={(evt) => {
                            const isChecked = evt.target.checked;
                            if (value) {
                                // Håndter checkbox som en del av en input gruppe med samme navn
                                const fieldValueArray = getFieldValueArray(field.value);
                                const newFieldValue = isChecked
                                    ? [...fieldValueArray, value]
                                    : fieldValueArray.filter((v) => v !== value);
                                form.setFieldValue(field.name, newFieldValue);
                                if (afterOnChange) {
                                    afterOnChange(newFieldValue);
                                }
                            } else {
                                // Håndter checkbox som en selvstendig checkox med boolsk verdi
                                form.setFieldValue(field.name, isChecked);
                                if (afterOnChange) {
                                    afterOnChange(isChecked);
                                }
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
