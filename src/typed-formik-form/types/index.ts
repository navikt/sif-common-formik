export enum YesOrNo {
    'YES' = 'yes',
    'NO' = 'no',
    'UNANSWERED' = 'unanswered',
    'DO_NOT_KNOW' = 'doNotKnow',
}

export interface Time {
    hours: number;
    minutes: number;
}
export interface DateRange {
    from: Date;
    to: Date;
}

export type FormikValidateFunction<ValueType = any> = (value: ValueType) => any;

export type NavFrontendSkjemaFeil = React.ReactNode | boolean;

export interface TypedFormInputCommonProps<ValueType = any> {
    validate?: FormikValidateFunction<ValueType>;
    info?: React.ReactNode;
}
