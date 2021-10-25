import React from 'react';
import { Field, FieldProps } from 'formik';
import { CheckboksPanelGruppe, CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

interface OwnProps<FieldName> extends Omit<CheckboksPanelGruppeProps, 'onChange'> {
    name: FieldName;
    useTwoColumns?: boolean;
}

export type FormikCheckboxPanelGroupProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType>;

const removeElementFromArray = (element: any, array: any[], keyProp?: string) =>
    array.filter((el) => {
        return keyProp ? el[keyProp] !== element[keyProp] : el !== element;
    });

const isCheckboxChecked = (fieldValues: any[], value: any): boolean => {
    return (fieldValues || []).includes(value);
};

function FormikCheckboxPanelGroup<FieldName, ErrorType>({
    name,
    validate,
    legend,
    feil,
    checkboxes,
    useTwoColumns,
    ...restProps
}: FormikCheckboxPanelGroupProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CheckboksPanelGruppe
                        {...restProps}
                        {...field}
                        legend={legend ? <Element tag="div">{legend}</Element> : undefined}
                        checkboxes={checkboxes.map((cb) => ({
                            ...cb,
                            checked: isCheckboxChecked(field.value, cb.value),
                            autoComplete: 'off',
                        }))}
                        className={useTwoColumns ? 'twoColumnPanelGruppe' : undefined}
                        onChange={(_evt, value) => {
                            if (isCheckboxChecked(field.value, value)) {
                                form.setFieldValue(`${name}`, removeElementFromArray(value, field.value));
                            } else {
                                if (field.value) {
                                    field.value.push(value);
                                } else {
                                    field.value = [value];
                                }
                                form.setFieldValue(`${name}`, field.value);
                                if (context) {
                                    context.onAfterFieldValueSet();
                                }
                            }
                        }}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCheckboxPanelGroup;
