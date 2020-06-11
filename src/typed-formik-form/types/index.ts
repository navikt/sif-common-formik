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

export type FormikValidateFunction = (value: any) => any;

export type NavFrontendSkjemaFeil = React.ReactNode | boolean;

export interface TypedFormInputCommonProps {
    validate?: FormikValidateFunction;
    info?: React.ReactNode;
}
