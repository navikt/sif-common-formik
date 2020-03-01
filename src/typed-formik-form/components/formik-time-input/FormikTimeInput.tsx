import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { InputProps, Label } from 'nav-frontend-skjema';
import { Time } from '../../types/Time';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import CustomInput from '../helpers/custom-input/CustomInput';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import TimeInput from './TimeInput';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'onChange'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
}

export type FormikTimeInputProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikTimeInput<FieldName>({
    label,
    name,
    validate,
    info,
    feil,
    ...restProps
}: FormikTimeInputProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CustomInput feil={context ? context.renderFieldError(field, form) : feil}>
                        <Label htmlFor={field.name}>
                            <LabelWithInfo info={info}>{label}</LabelWithInfo>
                        </Label>

                        <TimeInput
                            {...restProps}
                            {...field}
                            time={field.value || undefined}
                            onChange={(time: Partial<Time> | undefined) => {
                                form.setFieldValue(field.name, time);
                            }}
                        />
                    </CustomInput>
                );
            }}
        </Field>
    );
}

export default FormikTimeInput;
