import * as React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element } from 'nav-frontend-typografi';
import './labelWithInfo.less';

interface LabelWithHelperText {
    children: React.ReactNode;
    info?: React.ReactNode;
}

const LabelWithInfo: React.FunctionComponent<LabelWithHelperText> = ({ children, info }) => {
    if (!children) {
        return null;
    }
    if (info === undefined) {
        return <Element tag="span">{children}</Element>;
    }
    return (
        <Element tag="span" className="labelWithInfo">
            {children}
            {info && <Hjelpetekst className="labelWithInfo__info">{info}</Hjelpetekst>}
        </Element>
    );
};

export default LabelWithInfo;
