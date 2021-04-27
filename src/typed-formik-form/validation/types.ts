export interface IntlErrorObject {
    /** If passed in, the key is not transformed with field name and error */
    key?: string;
    /** Values passed through to intl formatMessage */
    values?: { [key: string]: any };
}

export const isIntlErrorObject = (error: any): error is IntlErrorObject => {
    return typeof error === 'object' && (error.values || (error.key && typeof error.key === 'string'));
};

export type ValidationError = string | IntlErrorObject;

export type ValidationResult<ValidationErrors> = ValidationErrors | undefined;

export type ValidationFunction<ValidationErrors> = (value: any) => ValidationResult<ValidationErrors>;
