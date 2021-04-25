export type IntlErrorObject = { key: string; values?: { [key: string]: any }; isUniqueKey?: boolean };

export const isIntlErrorObject = (error: any): error is IntlErrorObject => {
    return typeof error === 'object' && error.key && typeof error.key === 'string';
};

export type ValidationError = string | IntlErrorObject;

export type ValidationResult<ValidationErrors> = ValidationErrors | undefined;

export type ValidationFunction<ValidationErrors> = (value: any) => ValidationResult<ValidationErrors>;
