import React from 'react';
import VisibilityBlock from './VisibilityBlock';

interface Props {
    fieldName: string;
    children: React.ReactNode;
}

const QuestionWrapper: React.FunctionComponent<Props> = ({ fieldName, children }) => (
    <VisibilityBlock fieldName={fieldName}>
        <div style={{ marginTop: '2rem' }}>{children}</div>
    </VisibilityBlock>
);

export default QuestionWrapper;
