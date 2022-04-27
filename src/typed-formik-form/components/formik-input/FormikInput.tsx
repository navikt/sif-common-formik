import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { Input, InputProps, Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { TestProps, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { guid } from 'nav-frontend-js-utils';
import './formikInput.less';
import bemUtils from '../../utils/bemUtils';

export interface InputWithSuffix {
    suffix?: string;
    suffixStyle?: 'box' | 'text';
}
interface OwnProps<FieldName> extends Omit<InputProps, 'name'> {
    name: FieldName;
}

export type FormikInputProps<FieldName, ErrorType> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    InputWithSuffix &
    UseFastFieldProps &
    TestProps;

const bem = bemUtils('formikInput');

function FormikInput<FieldName, ErrorType>({
    name,
    feil,
    id = guid(),
    suffix,
    suffixStyle = 'box',
    label,
    description,
    validate,
    autoComplete,
    useFastField,
    ...restProps
}: FormikInputProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                const feilProp = getFeilPropForFormikInput({ field, form, context, feil });
                const harFeil = feilProp !== undefined;
                const feilMessageId = `feil-${id}`;
                if (suffix === undefined) {
                    return (
                        <Input
                            {...restProps}
                            {...field}
                            id={id}
                            description={description}
                            label={label}
                            autoComplete={autoComplete || 'off'}
                            feil={feilProp}
                            value={field.value === undefined ? '' : field.value}
                        />
                    );
                }
                return (
                    <div
                        className={bem.classNames(
                            bem.block,
                            bem.modifierConditional('withSuffix', suffix !== undefined),
                            bem.modifier(`suffixStyle--${suffixStyle}`),
                            bem.modifierConditional('fullbredde', restProps.bredde === 'fullbredde')
                        )}>
                        <Label htmlFor={id}>{label}</Label>
                        {description && <div className="skjemaelement__description">{description}</div>}
                        <div className={bem.element('inputWrapper')}>
                            <Input
                                {...restProps}
                                {...field}
                                id={id}
                                autoComplete={autoComplete || 'off'}
                                feil={harFeil}
                                aria-errormessage={feilMessageId}
                                value={field.value === undefined ? '' : field.value}
                            />
                            {suffix && (
                                <span className={bem.element('suffix', suffixStyle)} aria-hidden={true}>
                                    {suffix}
                                </span>
                            )}
                        </div>
                        <SkjemaelementFeilmelding id={`feil-${id}`}>
                            {getFeilPropForFormikInput({ field, form, context, feil })}
                        </SkjemaelementFeilmelding>
                    </div>
                );
            }}
        </FieldComponent>
    );
}

export default FormikInput;
