import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { BekreftCheckboksPanel, BekreftCheckboksPanelProps } from 'nav-frontend-skjema';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

interface FormikConfirmationCheckboxPanelProps<FieldName>
    extends Omit<BekreftCheckboksPanelProps, 'onChange' | 'checked'> {
    name: FieldName;
}

type Props<FieldName> = FormikConfirmationCheckboxPanelProps<FieldName> & Omit<FormikInputCommonProps, 'info'>;

function FormikConfirmationCheckboxPanel<FieldName>({
    children,
    name,
    feil,
    validate,
    ...restProps
}: Props<FieldName>) {
    const context = React.useContext(FormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <BekreftCheckboksPanel
                        {...restProps}
                        {...field}
                        checked={field.value === true}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                        onChange={(evt) => {
                            form.setFieldValue(`${name}`, (evt as React.ChangeEvent<HTMLInputElement>).target.checked);
                        }}
                    />
                );
            }}
        </Field>
    );
}

export default FormikConfirmationCheckboxPanel;
