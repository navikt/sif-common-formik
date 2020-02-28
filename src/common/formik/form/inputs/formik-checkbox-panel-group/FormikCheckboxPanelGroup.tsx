import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { CheckboksPanelGruppe, CheckboksPanelGruppeProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

interface FormikCheckboxPanelGroupProps<FieldName> extends Omit<CheckboksPanelGruppeProps, 'onChange'> {
    name: FieldName;
}

type Props<FieldName> = FormikCheckboxPanelGroupProps<FieldName> & FormikInputCommonProps;

const removeElementFromArray = (element: any, array: any[], keyProp?: string) =>
    array.filter((el) => {
        return keyProp ? el[keyProp] !== element[keyProp] : el !== element;
    });

const isCheckboxChecked = (fieldValues: any[], value: any): boolean => {
    return fieldValues.includes(value);
};

function FormikCheckboxPanelGroup<FieldName>({
    name,
    validate,
    legend,
    feil,
    checkboxes,
    helperText,
    ...restProps
}: Props<FieldName>) {
    const context = React.useContext(FormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CheckboksPanelGruppe
                        {...restProps}
                        {...field}
                        legend={<LabelWithInfo helperText={helperText}>{legend}</LabelWithInfo>}
                        checkboxes={checkboxes.map((cb) => ({
                            ...cb,
                            checked: isCheckboxChecked(field.value, cb.value)
                        }))}
                        onChange={(evt, value) => {
                            if (isCheckboxChecked(field.value, value)) {
                                form.setFieldValue(`${name}`, removeElementFromArray(value, field.value));
                            } else {
                                if (field.value) {
                                    field.value.push(value);
                                } else {
                                    field.value = [value];
                                }
                                form.setFieldValue(`${name}`, field.value);
                            }
                        }}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCheckboxPanelGroup;
