import React from 'react';
import bemUtils from '../../../utils/bemUtils';
import './dialogFormWrapper.less';

const bem = bemUtils('dialogFormWrapper');

export type DialogFormWrapperWidths = 'narrow' | 'wide';

interface Props {
    width?: DialogFormWrapperWidths;
}

const DialogFormWrapper: React.FunctionComponent<Props> = ({ width = 'narrow', children }) => (
    <article className={bem.classNames(bem.block, bem.modifier(width))}>{children}</article>
);

export default DialogFormWrapper;
