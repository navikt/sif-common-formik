import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

interface FormikCheckboxProps<FieldName> extends Omit<CheckboxProps, 'name'> {
    name: FieldName;
    afterOnChange?: (newValue: boolean) => void;
}

type Props<FieldName> = FormikCheckboxProps<FieldName> & FormikInputCommonProps;

function FormikCheckbox<FieldName>({
    name,
    label,
    validate,
    afterOnChange,
    helperText,
    feil,
    ...restProps
}: Props<FieldName>) {
    const context = React.useContext(FormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Checkbox
                        {...restProps}
                        {...field}
                        label={<LabelWithInfo helperText={helperText}>{label}</LabelWithInfo>}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                        checked={field.value === true}
                        onChange={(evt) => {
                            const newValue = evt.target.checked;
                            form.setFieldValue(field.name, newValue);
                            if (afterOnChange) {
                                afterOnChange(newValue);
                            }
                        }}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCheckbox;
