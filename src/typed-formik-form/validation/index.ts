import { isISODateString } from 'nav-datovelger';
import { IntlShape } from 'react-intl';
import { FormikDatepickerValue } from '../components/formik-datepicker/FormikDatepicker';

/**
 * Midlertidig plassering av kode
 * Todo - flytte all validation til sif-common-soknad
 *
 * */

type valueFunction = (intl: IntlShape) => string;

interface FieldValidationResultValues {
    [key: string]: string | number | Date | valueFunction | undefined;
}

interface IntlFieldValidationError {
    key: string;
    values?: FieldValidationResultValues;
}

type FieldValidationResult = IntlFieldValidationError | undefined | void;

enum FormikFieldValidationErrors {
    'påkrevd' = 'common.fieldvalidation.påkrevd',
    'dato_ugyldig' = 'common.fieldvalidation.dato.ugyldig',
}

const createFieldValidationError = <T extends string>(key: T | undefined, values?: any): FieldValidationResult => {
    return key
        ? {
              key,
              values,
          }
        : undefined;
};

const fieldIsRequiredError = () => createFieldValidationError(FormikFieldValidationErrors.påkrevd);

export const validateFormikDate = (
    value: FormikDatepickerValue | undefined,
    isRequired?: boolean,
    errorKey: string = FormikFieldValidationErrors.dato_ugyldig
): FieldValidationResult => {
    const { dateString = '' } = value || {};
    if (isRequired && (value === undefined || dateString === '')) {
        return fieldIsRequiredError();
    }
    if (isISODateString(dateString) === false) {
        return createFieldValidationError(errorKey);
    }
    return undefined;
};
