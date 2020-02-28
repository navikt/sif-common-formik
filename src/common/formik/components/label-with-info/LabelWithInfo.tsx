import * as React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element } from 'nav-frontend-typografi';
import bemUtils from '../../../../dev/utils/bemUtils';
import './labelWithInfo.less';

interface LabelWithHelperText {
    children: React.ReactNode;
    info?: React.ReactNode;
}

const bem = bemUtils('labelWithInfo');

const LabelWithInfo: React.FunctionComponent<LabelWithHelperText> = ({ children, info }) => {
    if (!children) {
        return null;
    }
    if (info === undefined) {
        return <Element tag="span">{children}</Element>;
    }
    return (
        <Element tag="span" className={bem.block}>
            {children}
            {info && <Hjelpetekst className={bem.element('info')}>{info}</Hjelpetekst>}
        </Element>
    );
};

export default LabelWithInfo;
