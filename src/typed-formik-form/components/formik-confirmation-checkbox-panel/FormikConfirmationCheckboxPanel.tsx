import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { BekreftCheckboksPanel, BekreftCheckboksPanelProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<BekreftCheckboksPanelProps, 'onChange' | 'checked'> {
    name: FieldName;
}

export type FormikConfirmationCheckboxPanelProps<FieldName> = OwnProps<FieldName> &
    Omit<TypedFormInputCommonProps, 'info'>;

function FormikConfirmationCheckboxPanel<FieldName>({
    children,
    name,
    feil,
    validate,
    ...restProps
}: FormikConfirmationCheckboxPanelProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <BekreftCheckboksPanel
                        {...restProps}
                        {...field}
                        checked={field.value === true}
                        feil={context ? context.renderFieldError(field, form) : feil}
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
