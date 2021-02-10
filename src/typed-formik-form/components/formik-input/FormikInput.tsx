import React from 'react';
import { Field, FieldProps } from 'formik';
import { Input, InputProps, Label } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import { guid } from 'nav-frontend-js-utils';
import './formikInput.less';
import bemUtils from '../../utils/bemUtils';

interface OwnProps<FieldName> extends Omit<InputProps, 'name'> {
    name: FieldName;
    suffix?: string;
    suffixStyle?: 'box' | 'text';
}

export type FormikInputProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

const bem = bemUtils('formikInput');

function FormikInput<FieldName>({
    name,
    feil,
    id = guid(),
    suffix,
    suffixStyle = 'box',
    label,
    description,
    validate,
    autoComplete,
    ...restProps
}: FormikInputProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                if (suffix === undefined) {
                    return (
                        <Input
                            {...restProps}
                            {...field}
                            id={id}
                            description={description}
                            label={label}
                            autoComplete={autoComplete || 'off'}
                            feil={getFeilPropForFormikInput({ field, form, context, feil })}
                            value={field.value === undefined ? '' : field.value}
                        />
                    );
                }
                return (
                    <div
                        className={bem.classNames(
                            bem.block,
                            bem.modifierConditional('withSuffix', suffix !== undefined),
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
                                feil={getFeilPropForFormikInput({ field, form, context, feil })}
                                value={field.value === undefined ? '' : field.value}
                            />
                            {suffix && (
                                <span className={bem.element('suffix', suffixStyle)} aria-hidden={true}>
                                    {suffix}
                                </span>
                            )}
                        </div>
                    </div>
                );
            }}
        </Field>
    );
}

export default FormikInput;
