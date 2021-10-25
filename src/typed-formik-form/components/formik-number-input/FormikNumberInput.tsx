import React from 'react';
import { Field, FieldProps } from 'formik';
import { InputProps } from 'nav-frontend-skjema';
import { TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import FormikInput, { InputWithSuffix } from '../formik-input/FormikInput';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'type' | 'pattern' | 'inputMode' | 'min' | 'max'> {
    name: FieldName;
    integerValue?: boolean;
}

export type FormikNumberInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    InputWithSuffix;

function FormikNumberInput<FieldName, ErrorType>({
    name,
    feil,
    validate,
    autoComplete,
    bredde = 'S',
    integerValue = false,
    ...restProps
}: FormikNumberInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);

    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <FormikInput
                        {...restProps}
                        {...field}
                        type="text"
                        bredde={bredde}
                        autoComplete={autoComplete || 'off'}
                        inputMode={integerValue ? 'numeric' : 'text'}
                        pattern={integerValue ? '[0-9]*' : undefined}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        value={field.value === undefined ? '' : field.value}
                    />
                );
            }}
        </Field>
    );
}

export default FormikNumberInput;
