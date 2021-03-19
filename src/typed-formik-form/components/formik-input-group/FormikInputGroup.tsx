import React from 'react';
import { Field, FieldProps } from 'formik';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element, Feilmelding } from 'nav-frontend-typografi';
import { NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import './formikInputGroup.less';

interface OwnProps<FieldName> extends SkjemaGruppeProps {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
}

export type FormikInputGroupProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikInputGroup<FieldName>({
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
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                const errorMsg = getFeilPropForFormikInput({ field, form, context, feil });
                const isRenderableErrorMsgType = ['string', 'object'].includes(typeof errorMsg);
                return (
                    <SkjemaGruppe
                        {...restProps}
                        legend={legend ? <Element tag="div">{legend}</Element> : undefined}
                        className={`${className ? className : ''} singleInputWrapper`}>
                        {children}
                        {/** Må sette inn denne selv pga feil på SkjemaGruppe påvirker styling av alle elementer i gruppen*/}
                        <div aria-live="polite">
                            <div tabIndex={-1} id={field.name} className="focusable-feilmelding">
                                {isRenderableErrorMsgType && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <Feilmelding>{errorMsg}</Feilmelding>
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
