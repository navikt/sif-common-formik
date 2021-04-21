import { FieldErrorType } from '../types';

export type ValidationResult<ValidationErrors> = ValidationErrors | undefined;
export type ValidationFunction<ValidationErrors> = (value: any) => ValidationResult<ValidationErrors>;
export type ValidationError = FieldErrorType;
