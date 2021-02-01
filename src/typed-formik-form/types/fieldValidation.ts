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
    values?: FieldValidationResultValues;
}

export declare type FormikValFunc = (value: any) => any;

export type FieldValidationArray = (validations: FormikValFunc[]) => (value: any) => FieldValidationResult;

export type FieldValidationResult = IntlFieldValidationError | undefined | void;
