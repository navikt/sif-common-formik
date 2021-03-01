import React from 'react';
import { Field, FieldProps } from 'formik';
import { InputProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { validateAll } from '../../utils/validateAll';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { validateFormikNumberInputValue } from './validateFormikNumberInputValue';
import FormikInput, { InputWithSuffix } from '../formik-input/FormikInput';

interface OwnProps<FieldName> extends Omit<InputProps, 'name' | 'type' | 'pattern'> {
    name: FieldName;
    disableNumberValidation?: boolean;
    invalidNumberErrorKey?: string;
    integerValue?: boolean;
}

export type FormikNumberInputProps<FieldName> = OwnProps<FieldName> &
    Omit<TypedFormInputCommonProps, 'inputMode'> &
    InputWithSuffix;

function FormikNumberInput<FieldName>({
    name,
    feil,
    validate,
    autoComplete,
    bredde = 'S',
    disableNumberValidation,
    invalidNumberErrorKey = 'common.fieldvalidation.ugyldigTall',
    integerValue = false,
    ...restProps
}: FormikNumberInputProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);

    const validations = disableNumberValidation
        ? []
        : [(value) => validateFormikNumberInputValue(value, invalidNumberErrorKey)];
    if (validate) {
        validations.push(validate);
    }

    return (
        <Field validate={validateAll(validations)} name={name}>
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
