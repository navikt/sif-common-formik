import React from 'react';
import Question from '../../components/question/Question';
import VisibilityBlock from './VisibilityBlock';

interface Props {
    forField: string;
    children: React.ReactNode;
}

const ConditionalQuestion = ({ forField, children }: Props) => (
    <VisibilityBlock fieldName={forField}>
        <Question>{children}</Question>
    </VisibilityBlock>
);

export default ConditionalQuestion;
