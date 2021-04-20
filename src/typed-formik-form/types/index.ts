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

export type CancelButtonTypes = 'standard' | 'hoved' | 'fare' | 'flat';

export type NavFrontendSkjemaFeil = React.ReactNode | boolean;

export type FieldErrorType = string | (() => string);
export interface TypedFormInputValidationProps {
    validate?: (value: any) => FieldErrorType | undefined;
}
