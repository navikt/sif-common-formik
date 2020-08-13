import React from 'react';
import './buttonRow.less';

export interface Props {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    layout?: 'normal' | 'mobile-50-50' | 'stretch';
}

const ButtonRow: React.StatelessComponent<Props> = ({ children, align = 'center', layout = 'normal' }: Props) => {
    const cls = `buttonRow buttonRow--${align} buttonRow--${layout}`;
    return (
        <div className={cls}>
            {React.Children.map(children, (knapp, index) => (
                <span key={index} className="buttonRow__button">
                    {knapp}
                </span>
            ))}
        </div>
    );
};

export default ButtonRow;
