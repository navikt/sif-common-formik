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

export type FieldValidationResult = IntlFieldValidationError | undefined | void;
