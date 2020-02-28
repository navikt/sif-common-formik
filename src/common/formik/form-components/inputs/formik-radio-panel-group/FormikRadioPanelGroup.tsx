import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { RadioPanelGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { TypedFormikFormContext } from '../../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<RadioPanelGruppeProps, 'name' | 'onChange'> {
    name: FieldName;
}

export type FormikRadioPanelGroupProps<FieldName> = OwnProps<FieldName> & FormikInputCommonProps;

function FormikRadioPanelGroup<FieldName>({
    name,
    validate,
    legend,
    radios,
    info,
    feil,
    ...restProps
}: FormikRadioPanelGroupProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <RadioPanelGruppe
                        {...restProps}
                        name={field.name}
                        checked={field.value}
                        legend={<LabelWithInfo info={info}>{legend}</LabelWithInfo>}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                        onChange={(evt, value) => form.setFieldValue(field.name, value)}
                        radios={radios.map((rb) => ({
                            name: `${name}`,
                            ...rb
                        }))}
                    />
                );
            }}
        </Field>
    );
}

export default FormikRadioPanelGroup;
