import React from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';

const SkjemagruppeQuestion: React.FunctionComponent<SkjemaGruppeProps> = ({
    legend,
    feil,
    tag,
    children,
    className,
}) => (
    <SkjemaGruppe
        className={`${className ? className : ''} singleInputWrapper`}
        tag={tag ? tag : legend ? 'fieldset' : 'div'}
        feil={feil}
        legend={legend ? <Element>{legend}</Element> : undefined}>
        {children}
    </SkjemaGruppe>
);

export default SkjemagruppeQuestion;
