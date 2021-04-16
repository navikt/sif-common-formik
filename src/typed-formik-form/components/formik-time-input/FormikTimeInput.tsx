import React from 'react';
import { Field, FieldProps } from 'formik';
import { InputProps, Label } from 'nav-frontend-skjema';
import { Time, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';

import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import TimeInput from './TimeInput';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'onChange'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
}

export type FormikTimeInputProps<FieldName> = OwnProps<FieldName> & TypedFormInputValidationProps;

function FormikTimeInput<FieldName>({ label, name, validate, feil, ...restProps }: FormikTimeInputProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={field.name}>{label}</Label>

                        <TimeInput
                            {...restProps}
                            {...field}
                            time={field.value || undefined}
                            onChange={(time: Partial<Time> | undefined) => {
                                form.setFieldValue(field.name, time);
                                if (context) {
                                    context.onAfterFieldValueSet();
                                }
                            }}
                        />
                    </SkjemagruppeQuestion>
                );
            }}
        </Field>
    );
}

export default FormikTimeInput;
