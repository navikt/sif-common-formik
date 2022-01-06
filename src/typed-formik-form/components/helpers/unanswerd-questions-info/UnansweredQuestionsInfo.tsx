import React from 'react';
import { useIntl } from 'react-intl';
import Alertstripe from 'nav-frontend-alertstriper';
import './unansweredQuestionsInfo.less';

interface Props {
    children?: React.ReactNode;
}

const UnansweredQuestionsInfo: React.FunctionComponent<Props> = ({ children }) => {
    const intl = useIntl();

    const getDefaultMessage = () => {
        switch (intl.locale) {
            case 'nn':
                return 'For å kome vidare, må du svare på alle spørsmåla ovafor';
            default:
                return 'For å komme videre, må du svare på alle spørsmålene ovenfor';
        }
    };
    return (
        <div className="unansweredQuestionsInfo">
            <Alertstripe type="info" form="inline">
                {children || getDefaultMessage()}
            </Alertstripe>
        </div>
    );
};

export default UnansweredQuestionsInfo;
