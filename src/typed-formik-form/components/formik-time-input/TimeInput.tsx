import React, { useState } from 'react';
import { guid } from 'nav-frontend-js-utils';
import { Input } from 'nav-frontend-skjema';
import { Time } from '../../types';
import bemUtils from '../../utils/bemUtils';
import { getNumberFromNumberInputValue } from '../../utils/numberInputUtils';
import { hasValue } from '../../validation/validationUtils';
import './timeInput.less';

const MAX_HOURS = 23;
const MAX_MINUTES = 59;

type TimeInputChangeFunc = (time: Partial<Time> | undefined, isValidTime: boolean) => void;

export type TimeInputLayout = 'vertical' | 'horizontal';

export interface TimeInputLayoutProps {
    direction?: TimeInputLayout;
    compact?: boolean;
    justifyContent?: 'left' | 'center' | 'right';
    placeholders?: {
        hours: string;
        minutes: string;
    };
}

interface TimeInputProps extends TimeInputLayoutProps {
    time?: Time | Partial<Time> | undefined;
    maxHours?: number;
    maxMinutes?: number;
    className?: string;
    description?: React.ReactNode;
    onChange: TimeInputChangeFunc;
}

const bem = bemUtils('timeInput');

export const isValidTime = (time: Partial<Time>): time is Time => {
    const hours = getNumberFromNumberInputValue(time.hours || '0');
    const minutes = getNumberFromNumberInputValue(time.minutes || '0');
    return hours !== undefined && minutes !== undefined;
};

const handleTimeChange = (time: Partial<Time>, onChange: TimeInputChangeFunc) => {
    onChange(time, isValidTime(time));
};

const TimeInput: React.FunctionComponent<TimeInputProps> = ({
    time = { hours: undefined, minutes: undefined },
    maxHours = MAX_HOURS,
    maxMinutes = MAX_MINUTES,
    direction: layout = 'normal',
    compact = true,
    justifyContent = 'center',
    placeholders,
    description,
    onChange,
    className,
}) => {
    const [stateTime, setStateTime] = useState<Partial<Time> | undefined>(time);
    const id = guid();
    const hoursLabelId = `${id}-hours`;
    const minutesLabelId = `${id}-minutes`;
    return (
        <div
            className={bem.classNames(
                bem.block,
                bem.modifier(layout),
                bem.modifier(`content-${justifyContent}`),
                bem.modifierConditional('compact', compact),
                bem.modifierConditional('withValue', hasValue(time.hours) || hasValue(time.minutes)),
                bem.modifierConditional('withHours', hasValue(time.hours)),
                bem.modifierConditional('withMinutes', hasValue(time.minutes)),
                className
            )}>
            <div className={bem.element('contentWrapper')}>
                <div className={bem.element('inputWrapper')}>
                    <label className={bem.element('label')} htmlFor={hoursLabelId}>
                        Timer
                    </label>
                    <Input
                        id={hoursLabelId}
                        className={bem.element('hours')}
                        type="text"
                        autoComplete={'off'}
                        inputMode={'numeric'}
                        pattern={'[0-9]*'}
                        placeholder={placeholders?.hours}
                        min={0}
                        max={maxHours}
                        maxLength={2}
                        description={description}
                        value={stateTime?.hours || ''}
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                            const newTime = { ...stateTime, hours: evt.target.value };
                            setStateTime(newTime);
                            handleTimeChange(newTime, onChange);
                        }}
                    />
                </div>
                <div className={bem.element('inputWrapper')}>
                    <label className={bem.element('label')} htmlFor={minutesLabelId}>
                        Minutter
                    </label>
                    <Input
                        id={minutesLabelId}
                        className={bem.element('minutes')}
                        type="text"
                        autoComplete={'off'}
                        inputMode={'numeric'}
                        placeholder={placeholders?.minutes}
                        pattern={'[0-9]*'}
                        min={0}
                        maxLength={2}
                        max={maxMinutes}
                        value={stateTime?.minutes || ''}
                        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                            const newTime = { ...stateTime, minutes: evt.target.value };
                            setStateTime(newTime);
                            handleTimeChange(newTime, onChange);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
export default TimeInput;
