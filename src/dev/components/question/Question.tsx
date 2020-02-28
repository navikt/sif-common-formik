import React from 'react';

interface Props {}

const Question: React.FunctionComponent<Props> = (props) => (
    <div style={{ marginBottom: '2rem' }}>{props.children}</div>
);

export default Question;
