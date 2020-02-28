import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FieldValidationError } from '../../../types/FieldValidationError';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

interface FormikInputGroupProps<FieldName> extends SkjemaGruppeProps {
    name: FieldName;
    feil?: FieldValidationError;
}

type Props<FieldName> = FormikInputGroupProps<FieldName> & FormikInputCommonProps;

function FormikInputGroup<FieldName>({
    name,
    legend,
    feil,
    children,
    helperText,
    validate,
    ...restProps
}: Props<FieldName>) {
    const context = React.useContext(FormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemaGruppe
                        {...restProps}
                        legend={<LabelWithInfo helperText={helperText}>{legend}</LabelWithInfo>}
                        feil={context ? context.renderFieldError(field, form, context) : feil}>
                        {children}
                    </SkjemaGruppe>
                );
            }}
        </Field>
    );
}
export default FormikInputGroup;
