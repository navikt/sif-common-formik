import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import './unansweredQuestionsInfo.less';

interface Props {
    children: React.ReactNode;
}

const UnansweredQuestionsInfo = ({ children }: Props) => (
    <div className="unansweredQuestionsInfo">
        <Alertstripe type="info" form="inline">
            {children}
        </Alertstripe>
    </div>
);

export default UnansweredQuestionsInfo;
