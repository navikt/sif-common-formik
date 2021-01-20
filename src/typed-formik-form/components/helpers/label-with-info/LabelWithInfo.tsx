import React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Element } from 'nav-frontend-typografi';
import './labelWithInfo.less';

interface LabelWithHelperText {
    info?: React.ReactNode;
    infoPlassering?: PopoverOrientering;
}

const LabelWithInfo: React.FunctionComponent<LabelWithHelperText> = ({
    children,
    info,
    infoPlassering = PopoverOrientering.Over,
}) => {
    if (!children) {
        return null;
    }
    if (info === undefined) {
        return <Element tag="span">{children}</Element>;
    }

    const partialPopoverProps: any = {
        orientering: infoPlassering,
    };
    return (
        <Element tag="span" className="labelWithInfo">
            {children}
            {info && (
                <Hjelpetekst popoverProps={partialPopoverProps} className="labelWithInfo__info">
                    {info}
                </Hjelpetekst>
            )}
        </Element>
    );
};

export default LabelWithInfo;
