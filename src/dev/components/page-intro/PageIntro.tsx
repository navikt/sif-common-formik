import React from 'react';
import { Ingress, Undertittel } from 'nav-frontend-typografi';
import Box from '../box/Box';

interface Props {
    title: string;
}

const PageIntro: React.FunctionComponent<Props> = ({ title, children }) => (
    <>
        <Box margin="m">
            <Box>
                <Undertittel>{title}</Undertittel>
            </Box>
            {children && <Ingress tag="div">{children}</Ingress>}
        </Box>
    </>
);

export default PageIntro;
