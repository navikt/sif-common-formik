import React from 'react';
import { Field, FieldProps } from 'formik';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element, Feilmelding } from 'nav-frontend-typografi';
import { NavFrontendSkjemaFeil, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import './formikInputGroup.less';

interface OwnProps<FieldName> extends SkjemaGruppeProps {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
}

export type FormikInputGroupProps<FieldName> = OwnProps<FieldName> & TypedFormInputValidationProps<FieldName>;

function FormikInputGroup<FieldName = string>({
    legend,
    name,
    feil,
    children,
    validate,
    className,
    ...restProps
}: FormikInputGroupProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate ? (value) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps) => {
                const feilProp = getFeilPropForFormikInput({ field, form, context, feil });
                const isRenderableErrorMsgType = ['string', 'object'].includes(typeof feilProp);
                return (
                    <SkjemaGruppe
                        {...restProps}
                        legend={legend ? <Element tag="div">{legend}</Element> : undefined}
                        className={`${className ? className : ''} singleInputWrapper`}>
                        {children}
                        {/** Må sette inn denne selv pga feil på SkjemaGruppe påvirker styling av alle elementer i gruppen*/}
                        <div
                            aria-live="polite"
                            className={`formikInputGroup__error ${
                                isRenderableErrorMsgType ? 'formikInputGroup__error--with-message' : ''
                            }`}>
                            <div tabIndex={-1} id={field.name} className="focusable-feilmelding">
                                {isRenderableErrorMsgType && (
                                    <div>
                                        <Feilmelding>{feilProp}</Feilmelding>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SkjemaGruppe>
                );
            }}
        </Field>
    );
}
export default FormikInputGroup;
