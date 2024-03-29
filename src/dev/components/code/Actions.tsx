import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Element } from 'nav-frontend-typografi';

const Actions: React.FunctionComponent = ({ children }) => (
    <Panel border={true} style={{ padding: '1rem  1rem 1rem 1rem', borderStyle: 'dashed' }}>
        <Element tag="span">Actions: </Element>
        {children}
    </Panel>
);

export default Actions;
