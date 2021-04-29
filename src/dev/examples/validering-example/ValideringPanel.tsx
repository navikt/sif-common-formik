import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Tabs from 'nav-frontend-tabs';
import { Systemtittel } from 'nav-frontend-typografi';
import Box from '../../components/box/Box';
import { hasValue } from '../../../typed-formik-form/validation/validationUtils';

interface Props {
    title: string;
    functionName?: string;
    code?: string;
}

const ValideringPanel: React.FunctionComponent<Props> = ({ title, children, code }) => {
    const [activePanel, setActivePanel] = useState(0);
    return (
        <div style={{ marginBottom: '4rem' }}>
            <Systemtittel tag="h3">{title}</Systemtittel>
            <Box margin="l">
                {hasValue(code) && (
                    <Tabs
                        tabs={[{ label: 'Eksempel' }, { label: 'Kode' }]}
                        onChange={(_evt, idx) => setActivePanel(idx)}
                    />
                )}
                {activePanel === 0 && <>{children}</>}
                {activePanel === 1 && (
                    <SyntaxHighlighter language="typescript" style={docco}>
                        {code}
                    </SyntaxHighlighter>
                )}
            </Box>
        </div>
    );
};
export default ValideringPanel;
