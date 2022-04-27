import React from 'react';
import { Field, FieldProps } from 'formik';
import { BekreftCheckboksPanel, BekreftCheckboksPanelProps } from 'nav-frontend-skjema';
import { TestProps, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<BekreftCheckboksPanelProps, 'onChange' | 'checked'> {
    name: FieldName;
}

export type FormikConfirmationCheckboxPanelProps<FieldName, ErrorType> = OwnProps<FieldName> &
    Omit<TypedFormInputValidationProps<FieldName, ErrorType>, 'info'> &
    TestProps;

function FormikConfirmationCheckboxPanel<FieldName, ErrorType>({
    children,
    name,
    feil,
    validate,
    inputProps,
    ...restProps
}: FormikConfirmationCheckboxPanelProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <BekreftCheckboksPanel
                        {...restProps}
                        inputProps={{ ...inputProps, autoComplete: 'off' }}
                        {...field}
                        checked={field.value === true}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        onChange={(evt) => {
                            form.setFieldValue(`${name}`, (evt as React.ChangeEvent<HTMLInputElement>).target.checked);
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}>
                        {children}
                    </BekreftCheckboksPanel>
                );
            }}
        </Field>
    );
}

export default FormikConfirmationCheckboxPanel;
