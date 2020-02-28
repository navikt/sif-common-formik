import * as React from 'react';
import bemUtils from '../../../../dev/utils/bemUtils';
import './buttonRow.less';

export interface Props {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    layout?: 'normal' | 'mobile-50-50' | 'stretch';
}
const bem = bemUtils('buttonRow');

const ButtonRow: React.StatelessComponent<Props> = ({ children, align = 'center', layout = 'normal' }) => {
    const cls = bem.classNames(bem.block, `${bem.modifier(align)}`, `${bem.modifier(layout)}`);
    return (
        <div className={cls}>
            {React.Children.map(children, (knapp, index) => (
                <span key={index} className={bem.element('button')}>
                    {knapp}
                </span>
            ))}
        </div>
    );
};

export default ButtonRow;
