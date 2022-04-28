import React from 'react';
import { Field, FieldProps } from 'formik';
import { FnrInput, FnrInputProps } from 'nav-frontend-skjema';
import { TestProps, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';

import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

interface OwnProps<FieldName> extends Omit<FnrInputProps, 'name' | 'onValidate'> {
    name: FieldName;
    inputmode?: InputMode & TestProps;
}

const getPatternForInputMode = (inputMode?: InputMode): string | undefined => {
    switch (inputMode) {
        case 'numeric':
            return '[0-9]*';
        default:
            return undefined;
    }
};

export type FormikInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType>;

function FormikFnrInput<FieldName, ErrorType>({
    name,
    feil,
    validate,
    inputMode = 'numeric',
    autoComplete,
    ...restProps
}: FormikInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);

    return (
        <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <FnrInput
                        {...restProps}
                        {...field}
                        autoComplete={autoComplete || 'off'}
                        onValidate={(valid) => console.log(valid)}
                        inputMode={inputMode}
                        pattern={getPatternForInputMode(inputMode)}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        value={field.value === undefined ? '' : field.value}
                    />
                );
            }}
        </Field>
    );
}

export default FormikFnrInput;
