import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { Input, InputProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

type InputMode = 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

interface OwnProps<FieldName> extends Omit<InputProps, 'name'> {
    name: FieldName;
    inputmode?: InputMode;
}

const getPatternForInputMode = (inputMode?: InputMode): string | undefined => {
    switch (inputMode) {
        case 'numeric':
            return '[0-9]*';
        default:
            return undefined;
    }
};

export type FormikInputProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikInput<FieldName>({
    label,
    name,
    info,
    feil,
    validate,
    inputMode,
    ...restProps
}: FormikInputProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);

    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <Input
                        {...restProps}
                        {...field}
                        inputMode={inputMode}
                        pattern={getPatternForInputMode(inputMode)}
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        value={field.value === undefined ? '' : field.value}
                    />
                );
            }}
        </Field>
    );
}

export default FormikInput;
