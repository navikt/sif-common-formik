import React, { useRef } from 'react';
import { Field, FieldProps } from 'formik';
import { InputProps } from 'nav-frontend-skjema';
import { Time, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';

import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import TimeInput, { TimeInputLayoutProps } from './TimeInput';
import { focusFirstElement } from '../../utils/focusUtils';
import bemUtils from '../../utils/bemUtils';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'onChange'> {
    name: FieldName;
    maxHours?: number;
    maxMinutes?: number;
    timeInputLayout?: TimeInputLayoutProps;
}

export type FormikTimeInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType>;

const bem = bemUtils('formikTimeInput');

function FormikTimeInput<FieldName, ErrorType>({
    label,
    name,
    validate,
    feil,
    timeInputLayout,
    ...restProps
}: FormikTimeInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const ref = useRef<any>();
    return (
        <Field validate={validate ? (value) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemagruppeQuestion
                        className={bem.classNames(
                            bem.block,
                            bem.modifierConditional(timeInputLayout?.layout, timeInputLayout?.layout !== undefined)
                        )}
                        {...timeInputLayout}
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
        </Field>
    );
}

export default FormikTimeInput;
