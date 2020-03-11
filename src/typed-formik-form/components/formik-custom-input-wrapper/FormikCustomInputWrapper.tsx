import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { TypedFormInputCommonProps } from '../../types';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> {
    name: FieldName;
    label?: React.ReactNode;
    children: React.ReactNode;
}

export type FormikCustomInputWrapperProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikCustomInputWrapper<FieldName>({
    label,
    name,
    info,
    validate,
    children
}: FormikCustomInputWrapperProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemagruppeQuestion
                        legend={(label = <LabelWithInfo info={info}>{label}</LabelWithInfo>)}
                        feil={context ? context.getAndRenderFieldErrorMessage(field, form) : undefined}>
                        {children}
                    </SkjemagruppeQuestion>
                );
            }}
        </Field>
    );
}

export default FormikCustomInputWrapper;
