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

export interface TypedFormInputValidationProps<FieldName, ErrorType> {
    validate?: (value: any, fieldName: FieldName) => ErrorType | undefined;
}

export interface CustomFormErrorHandler<ErrorType> {
    fieldErrorHandler: FieldErrorHandler<ErrorType>;
    isHandledErrorTypeFunc?: ErrorTypeChecker<ErrorType>;
}

export type FieldErrorHandler<ErrorType> = (error: ErrorType, fieldName: string) => string;
export type ErrorTypeChecker<ErrorType = any> = (error: ErrorType) => boolean;
