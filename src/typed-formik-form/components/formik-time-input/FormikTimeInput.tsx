import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { InputProps, Label } from 'nav-frontend-skjema';
import { Time, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
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
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={field.name}>
                            <LabelWithInfo info={info}>{label}</LabelWithInfo>
                        </Label>

                        <TimeInput
                            {...restProps}
                            {...field}
                            time={field.value || undefined}
                            onChange={(time: Partial<Time> | undefined) => {
                                form.setFieldValue(field.name, time);
                                context?.onAfterFieldValueSet();
                            }}
                        />
                    </SkjemagruppeQuestion>
                );
            }}
        </Field>
    );
}

export default FormikTimeInput;
