export type ValidationResult<ValidationErrors> = ValidationErrors | undefined;
export type ValidationFunction<ValidationErrors> = (value: any) => ValidationResult<ValidationErrors>;
export type ValidationErrorRenderFunc = () => string;
