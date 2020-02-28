import React, { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
    isFormik?: boolean;
    isLayout?: boolean;
}

const Code: React.FunctionComponent<Props> = ({ children, style, isFormik, isLayout }) => (
    <div style={{ margin: '.5rem 0', ...style }}>
        <code
            style={{
                display: 'inline-block',
                padding: '.25rem .5rem',
                backgroundColor: isFormik ? '#E0DAE7' : '#E9E7E7',
                fontSize: '.875rem',
                ...(isLayout ? { fontFamily: 'cursive' } : undefined),
                ...style
            }}>
            {children}
        </code>
    </div>
);

export default Code;
