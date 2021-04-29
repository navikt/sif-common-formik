import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import Box from '../../components/box/Box';

interface Props {
    title: string;
}

const ValideringPanel: React.FunctionComponent<Props> = ({ title, children }) => (
    <Panel style={{ marginBottom: '1rem' }}>
        <Undertittel>{title}</Undertittel>
        <Box margin="l">{children}</Box>
    </Panel>
);

export default ValideringPanel;
