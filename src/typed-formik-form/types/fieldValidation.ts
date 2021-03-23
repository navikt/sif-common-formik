/**
 * Midlertidig plassering av kode
 * Todo - flytte all validation til sif-common-soknad
 *
 * */

import { IntlShape } from 'react-intl';

type valueFunction = (intl: IntlShape) => string;

interface FieldValidationResultValues {
    [key: string]: string | number | Date | valueFunction | undefined;
}

interface IntlFieldValidationError {
    key: string;
    field?: string;
    values?: FieldValidationResultValues;
}

export declare type FormikValFunc = (value: any, field?: string) => any;

export type FieldValidationArray = (
    validations: FormikValFunc[]
) => (value: any, field?: string) => FieldValidationResult;

export type FieldValidationResult = IntlFieldValidationError | undefined | void;
