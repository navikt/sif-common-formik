import React from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../label-with-info/LabelWithInfo';

interface Props extends SkjemaGruppeProps {
    info?: React.ReactNode;
}

const SkjemagruppeQuestion: React.FunctionComponent<Props> = ({ legend, feil, info, tag, children, className }) => (
    <SkjemaGruppe
        className={`${className ? className : ''} singleInputWrapper`}
        tag={tag ? tag : legend ? 'fieldset' : 'div'}
        feil={feil}
        legend={legend ? <LabelWithInfo info={info}>{legend}</LabelWithInfo> : undefined}>
        {children}
    </SkjemaGruppe>
);

export default SkjemagruppeQuestion;
