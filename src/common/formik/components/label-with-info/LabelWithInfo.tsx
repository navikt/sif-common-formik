import * as React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Element } from 'nav-frontend-typografi';
import bemUtils from '../../../../dev/utils/bemUtils';
import './labelWithInfo.less';

interface LabelWithHelperText {
    children: React.ReactNode;
    helperText?: React.ReactNode;
}

const bem = bemUtils('labelWithInfo');

const LabelWithInfo: React.FunctionComponent<LabelWithHelperText> = ({ children, helperText }) => {
    if (!children) {
        return null;
    }
    if (helperText === undefined) {
        return <Element tag="span">{children}</Element>;
    }
    return (
        <Element tag="span" className={bem.block}>
            {children}
            {helperText && <Hjelpetekst className={bem.element('info')}>{helperText}</Hjelpetekst>}
        </Element>
    );
};

export default LabelWithInfo;
