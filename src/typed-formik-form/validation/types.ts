import { ReactNode } from 'react';

type FormikValidationErrors = { [key: string]: FormikValidationResult };

export type FormikValidationError = ReactNode;
export type FormikValidationResult = FormikValidationError | undefined;
export type FormikValidationFunction<ErrorType = FormikValidationErrors> = (
    value: any,
    errors: ErrorType
) => FormikValidationResult;
