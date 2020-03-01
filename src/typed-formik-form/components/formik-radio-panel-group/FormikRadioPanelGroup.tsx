import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { RadioPanelGruppe, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import '../../styles/nav-frontend-skjema-extension.less';

interface OwnProps<FieldName> extends Omit<RadioPanelGruppeProps, 'name' | 'onChange'> {
    name: FieldName;
    useTwoColumns?: boolean;
}

export type FormikRadioPanelGroupProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikRadioPanelGroup<FieldName>({
    name,
    validate,
    legend,
    radios,
    info,
    feil,
    useTwoColumns,
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
                        className={useTwoColumns ? 'twoColumnPanelGruppe' : undefined}
                        checked={field.value}
                        legend={<LabelWithInfo info={info}>{legend}</LabelWithInfo>}
                        feil={context ? context.renderFieldError(field, form) : feil}
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