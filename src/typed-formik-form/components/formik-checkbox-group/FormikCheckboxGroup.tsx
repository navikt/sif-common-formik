import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps, SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

interface LocalCheckboxProps extends Omit<CheckboxProps, 'value'> {
    value: string;
}

interface OwnProps<FieldName> extends Omit<SkjemaGruppeProps, 'onChange' | 'value' | 'children'> {
    name: FieldName;
    checkboxes: LocalCheckboxProps[];
    afterOnChange?: (value: boolean | string[]) => void;
}

export type FormikCheckboxGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
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

function FormikCheckboxGroup<FieldName, ErrorType>({
    name,
    validate,
    afterOnChange,
    legend,
    feil,
    checkboxes,
    useFastField,
    ...restProps
}: FormikCheckboxGroupProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemaGruppe
                        {...restProps}
                        {...field}
                        legend={legend ? <Element tag="div">{legend}</Element> : undefined}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        {checkboxes.map((cb, index) => (
                            <Checkbox
                                key={`${name}_${cb.value || index}`}
                                label={cb.label}
                                name={name as any}
                                value={cb.value}
                                onChange={(evt) => {
                                    const isChecked = evt.target.checked;
                                    const fieldValueArray = getFieldValueArray(field.value);
                                    const newFieldValue = isChecked
                                        ? [...fieldValueArray, cb.value]
                                        : fieldValueArray.filter((v) => v !== cb.value);
                                    form.setFieldValue(field.name, newFieldValue);
                                    if (afterOnChange) {
                                        afterOnChange(newFieldValue);
                                    }
                                }}
                            />
                        ))}
                    </SkjemaGruppe>
                );
            }}
        </FieldComponent>
    );
}

export default FormikCheckboxGroup;
