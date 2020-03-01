import React from 'react';
import { SkjemaGruppe, SkjemaGruppeProps } from 'nav-frontend-skjema';
import './customInput.less';

const CustomInput: React.FunctionComponent<SkjemaGruppeProps> = ({ feil, children }) => (
    <SkjemaGruppe className="singleInputWrapper" tag="div" feil={feil}>
        {children}
    </SkjemaGruppe>
);

export default CustomInput;
