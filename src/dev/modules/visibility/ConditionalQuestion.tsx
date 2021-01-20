import React from 'react';
import Question from '../../components/question/Question';
import VisibilityBlock from './VisibilityBlock';

interface Props {
    forField: string;
}

const ConditionalQuestion: React.FunctionComponent<Props> = ({ forField, children }) => (
    <VisibilityBlock fieldName={forField}>
        <Question>{children}</Question>
    </VisibilityBlock>
);

export default ConditionalQuestion;
