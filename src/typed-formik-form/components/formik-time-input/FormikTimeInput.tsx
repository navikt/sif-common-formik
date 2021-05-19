import React, { useRef } from 'react';
import { Field, FieldProps } from 'formik';
import { InputProps } from 'nav-frontend-skjema';
import { Time, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';

import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import TimeInput from './TimeInput';
import { focusFirstElement } from '../../utils/focusUtils';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'onChange'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
}

export type FormikTimeInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType>;

function FormikTimeInput<FieldName, ErrorType>({
    label,
    name,
    validate,
    feil,
    ...restProps
}: FormikTimeInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const ref = useRef<any>();
    return (
        <Field validate={validate ? (value) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemagruppeQuestion
                        ref={ref}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        id={name as any}
                        onFocus={(evt) => {
                            if (evt.target.id === ref.current.props.id) {
                                focusFirstElement(evt.target);
                            }
                        }}
                        legend={label}>
                        <TimeInput
                            {...restProps}
                            {...field}
                            justifyContent="left"
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
