import React from 'react';
import { Field, FieldProps } from 'formik';
import { Input, InputProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'type' | 'pattern'> {
    name: FieldName;
    integerValue?: boolean;
}

export type FormikNumberInputProps<FieldName> = OwnProps<FieldName> & Omit<TypedFormInputCommonProps, 'inputMode'>;

function FormikNumberInput<FieldName>({
    name,
    feil,
    validate,
    autoComplete,
    bredde = 'S',
    integerValue = false,
    ...restProps
}: FormikNumberInputProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Input
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
