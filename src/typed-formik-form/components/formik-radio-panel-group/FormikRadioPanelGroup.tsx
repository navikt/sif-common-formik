import React from 'react';
import { Field, FieldProps } from 'formik';
import { RadioPanelGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

interface OwnProps<FieldName> extends Omit<RadioPanelGruppeProps, 'name' | 'onChange'> {
    name: FieldName;
    useTwoColumns?: boolean;
}

export type FormikRadioPanelGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType>;

function FormikRadioPanelGroup<FieldName, ErrorType>({
    name,
    validate,
    radios,
    feil,
    useTwoColumns,
    ...restProps
}: FormikRadioPanelGroupProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value) => validate(value, name) : undefined} name={name}>
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
        </Field>
    );
}

export default FormikRadioPanelGroup;
