import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Feilmelding } from 'nav-frontend-typografi';
import { NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import './formikInputGroup.less';

interface OwnProps<FieldName> extends SkjemaGruppeProps {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
}

export type FormikInputGroupProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikInputGroup<FieldName>({
    name,
    legend,
    feil,
    children,
    info,
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
                        className={`${className ? className : ''} singleInputWrapper`}
                        legend={<LabelWithInfo info={info}>{legend}</LabelWithInfo>}>
                        {children}

                        {/** Må sette inn denne selv pga feil på SkjemaGruppe påvirker styling av alle elementer i gruppen*/}
                        <div aria-live="polite">
                            <div tabIndex={-1} id={field.name} className="focusable-feilmelding">
                                {isRenderableErrorMsgType && <Feilmelding>{errorMsg}</Feilmelding>}
                            </div>
                        </div>
                    </SkjemaGruppe>
                );
            }}
        </Field>
    );
}
export default FormikInputGroup;
