import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { RadioPanelGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

interface OwnProps<FieldName> extends Omit<RadioPanelGruppeProps, 'name' | 'onChange'> {
    name: FieldName;
    useTwoColumns?: boolean;
    afterOnChange?: (newValue: string) => void;
}

export type FormikRadioPanelGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps;

function FormikRadioPanelGroup<FieldName, ErrorType>({
    name,
    validate,
    radios,
    feil,
    useTwoColumns,
    useFastField,
    afterOnChange,
    ...restProps
}: FormikRadioPanelGroupProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <RadioPanelGruppe
                        {...restProps}
                        name={field.name}
                        className={useTwoColumns ? 'twoColumnPanelGruppe' : undefined}
                        checked={field.value}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        onChange={(_evt, value) => {
                            form.setFieldValue(field.name, value);
                            if (afterOnChange) {
                                afterOnChange(value);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        radios={radios.map((rb) => {
                            return {
                                name: `${name}`,
                                autoComplete: 'off',
                                'aria-invalid': undefined,
                                ...rb,
                            };
                        })}
                    />
                );
            }}
        </FieldComponent>
    );
}

export default FormikRadioPanelGroup;
