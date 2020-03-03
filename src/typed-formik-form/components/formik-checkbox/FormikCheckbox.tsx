import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<CheckboxProps, 'name'> {
    name: FieldName;
    afterOnChange?: (newValue: boolean) => void;
}

export type FormikCheckboxProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikCheckbox<FieldName>({
    name,
    label,
    validate,
    afterOnChange,
    info,
    feil,
    ...restProps
}: FormikCheckboxProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Checkbox
                        {...restProps}
                        {...field}
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
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
