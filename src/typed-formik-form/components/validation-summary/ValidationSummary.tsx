import React, { useEffect, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import ValidationErrorLink from './ValidationErrorLink';

interface Props {
    title?: string;
    errorMessages: FeiloppsummeringFeil[];
    focusOnMount?: boolean;
}

const ValidationSummary: React.FunctionComponent<Props> = ({ title, errorMessages }) => {
    const summaryEl = useRef(null);
    useEffect(() => {
        if (summaryEl.current !== null) {
            const node: any = findDOMNode(summaryEl.current);
            if (node && node.focus) {
                node.focus();
            }
        }
    }, []);
    return (
        <Feiloppsummering
            ref={summaryEl}
            tittel={title || 'Feil i skjema'}
            feil={errorMessages}
            customFeilRender={(feil) => (
                <ValidationErrorLink
                    className={'lenke'}
                    onClick={() => {
                        const elementById = document.getElementById(feil.skjemaelementId);
                        const elementByName = document.getElementsByName(feil.skjemaelementId)[0];
                        if (elementById) {
                            elementById.focus();
                        } else if (elementByName) {
                            elementByName.focus();
                        }
                    }}>
                    {feil.feilmelding}
                </ValidationErrorLink>
            )}
        />
    );
};
export default ValidationSummary;
