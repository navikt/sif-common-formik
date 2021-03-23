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

export type FormikValidateFunction<ValueType = any, FieldName = string> = (value: ValueType, field?: FieldName) => any;

export type NavFrontendSkjemaFeil = React.ReactNode | boolean;

export interface TypedFormInputCommonProps<ValueType = any, FieldName = string> {
    validate?: FormikValidateFunction<ValueType, FieldName>;
}
