import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps, SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

type LocalCheckboxProps = Omit<CheckboxProps, 'value'> & {
    value: string;
} & TestProps;

interface OwnProps<FieldName> extends Omit<SkjemaGruppeProps, 'onChange' | 'value' | 'children'> {
    name: FieldName;
    checkboxes: LocalCheckboxProps[];
    afterOnChange?: (value: boolean | string[]) => void;
}

export type FormikCheckboxGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps &
    TestProps;

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
                        {checkboxes.map(({ value, label, name, ...cbRestProps }, index) => (
                            <Checkbox
                                key={`${name}_${value || index}`}
                                {...cbRestProps}
                                label={label}
                                name={name as any}
                                value={value}
                                onChange={(evt) => {
                                    const isChecked = evt.target.checked;
                                    const fieldValueArray = getFieldValueArray(field.value);
                                    const newFieldValue = isChecked
                                        ? [...fieldValueArray, value]
                                        : fieldValueArray.filter((v) => v !== value);
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
