import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import './unansweredQuestionsInfo.less';

const UnansweredQuestionsInfo: React.FunctionComponent = ({ children }) => (
    <div className="unansweredQuestionsInfo">
        <Alertstripe type="info" form="inline">
            {children}
        </Alertstripe>
    </div>
);

export default UnansweredQuestionsInfo;
