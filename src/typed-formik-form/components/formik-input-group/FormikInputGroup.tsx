import React from 'react';
import { FastField, Field, FieldProps } from 'formik';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element, Feilmelding } from 'nav-frontend-typografi';
import { NavFrontendSkjemaFeil, TypedFormInputValidationProps, UseFastFieldProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import './formikInputGroup.less';

interface OwnProps<FieldName> extends SkjemaGruppeProps {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
}

export type FormikInputGroupProps<ErrorType, FieldName> = OwnProps<FieldName> &
    TypedFormInputValidationProps<FieldName, ErrorType> &
    UseFastFieldProps;

function FormikInputGroup<ErrorType, FieldName>({
    legend,
    name,
    feil,
    children,
    validate,
    className,
    useFastField,
    ...restProps
}: FormikInputGroupProps<ErrorType, FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    const FieldComponent = useFastField ? FastField : Field;
    return (
        <FieldComponent validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
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
        </FieldComponent>
    );
}
export default FormikInputGroup;
