import React from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import LabelWithInfo from '../label-with-info/LabelWithInfo';
import './customInput.less';

interface Props extends SkjemaGruppeProps {
    info?: React.ReactNode;
}

const CustomInput: React.FunctionComponent<Props> = ({ legend, feil, info, tag, children, className }) => (
    <SkjemaGruppe
        className={`${className} singleInputWrapper`}
        tag={tag ? tag : legend ? 'fieldset' : 'div'}
        feil={feil}
        legend={legend ? <LabelWithInfo info={info}>{legend}</LabelWithInfo> : undefined}>
        {children}
    </SkjemaGruppe>
);

export default CustomInput;
