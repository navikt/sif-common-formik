import { ReactNode } from 'react';

export type ValidationError = ReactNode;
export type ValidationResult = ValidationError | undefined;
export type ValidationFunction<ErrorType = { [key: string]: ValidationResult }> = (
    value: any,
    errors: ErrorType
) => ValidationResult;
