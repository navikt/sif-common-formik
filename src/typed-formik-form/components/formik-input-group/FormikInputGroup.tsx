import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends SkjemaGruppeProps {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
}

export type FormikInputGroupProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikInputGroup<FieldName>({
    name,
    legend,
    feil,
    children,
    info,
    validate,
    ...restProps
}: FormikInputGroupProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemaGruppe
                        {...restProps}
                        legend={<LabelWithInfo info={info}>{legend}</LabelWithInfo>}
                        feil={context ? context.getAndRenderFieldErrorMessage(field, form) : feil}>
                        {children}
                    </SkjemaGruppe>
                );
            }}
        </Field>
    );
}
export default FormikInputGroup;
