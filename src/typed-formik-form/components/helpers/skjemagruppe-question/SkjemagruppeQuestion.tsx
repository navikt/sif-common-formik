import React from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

const SkjemagruppeQuestion: React.FunctionComponent<SkjemaGruppeProps> = ({
    legend,
    feil,
    tag,
    children,
    className,
    id,
}) => (
    <SkjemaGruppe
        id={id}
        tabIndex={id ? -1 : undefined}
        className={`${className ? className : ''} singleInputWrapper`}
        tag={tag ? tag : legend ? 'fieldset' : 'div'}
        feil={feil}
        legend={legend ? <Element tag="div">{legend}</Element> : undefined}>
        {children}
    </SkjemaGruppe>
);

export default SkjemagruppeQuestion;
