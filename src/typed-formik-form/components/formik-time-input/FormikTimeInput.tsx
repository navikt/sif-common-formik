import React, { useRef } from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { InputProps } from 'nav-frontend-skjema';
import { Time, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';

import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import TimeInput, { TimeInputLayoutProps } from './TimeInput';
import { focusFirstElement } from '../../utils/focusUtils';
import bemUtils from '../../utils/bemUtils';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'onChange' | 'description'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
    timeInputLayout?: TimeInputLayoutProps;
}

export type FormikTimeInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps;

const bem = bemUtils('formikTimeInput');

function FormikTimeInput<FieldName, ErrorType>({
    label,
    name,
    validate,
    feil,
    timeInputLayout,
    useFastField,
    ...restProps
}: FormikTimeInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const ref = useRef<any>();
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemagruppeQuestion
                        tag={'div'}
                        className={bem.classNames(
                            bem.block,
                            bem.modifierConditional(
                                timeInputLayout?.direction,
                                timeInputLayout?.direction !== undefined
                            )
                        )}
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
                            {...timeInputLayout}
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
        </FieldComponent>
    );
}

export default FormikTimeInput;
