import React from 'react';
import { Field, FieldProps } from 'formik';
import { Radio, RadioGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

interface OwnProps<FieldName> extends Omit<RadioPanelGruppeProps, 'name' | 'onChange'> {
    name: FieldName;
}

export type FormikRadioGroupProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikRadioGroup<FieldName>({ name, validate, radios, feil, ...restProps }: FormikRadioGroupProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <RadioGruppe {...restProps} feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        {radios.map((rb, idx) => {
                            const isSelected = field.value === rb.value;
                            return (
                                <Radio
                                    key={idx}
                                    {...rb}
                                    name={(name as any) as string}
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
        </Field>
    );
}

export default FormikRadioGroup;
