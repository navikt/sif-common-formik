import React, { useContext } from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Radio, RadioGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

interface OwnProps<FieldName> extends Omit<RadioPanelGruppeProps, 'name' | 'onChange'> {
    name: FieldName;
}

export type FormikRadioGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps;

function FormikRadioGroup<FieldName, ErrorType>({
    name,
    validate,
    radios,
    feil,
    useFastField,
    ...restProps
}: FormikRadioGroupProps<FieldName, ErrorType>) {
    const context = useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <RadioGruppe {...restProps} feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        {radios.map((rb, idx) => {
                            const isSelected = field.value === rb.value;
                            return (
                                <Radio
                                    key={idx}
                                    {...rb}
                                    name={name as any}
                                    checked={isSelected}
                                    autoComplete="off"
                                    onChange={(evt) => {
                                        form.setFieldValue(field.name, evt.target.value);
                                        if (context) {
                                            context.onAfterFieldValueSet();
                                        }
                                    }}
                                />
                            );
                        })}
                    </RadioGruppe>
                );
            }}
        </FieldComponent>
    );
}

export default FormikRadioGroup;
