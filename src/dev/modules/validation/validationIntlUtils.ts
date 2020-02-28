import { IntlShape } from 'react-intl';
import { FormikErrors, getIn } from 'formik';
import { isArray } from 'util';
import { FieldValidationError } from '../../../common/formik/types/FieldValidationError';
import { isFieldValidationError, renderFieldValidationError } from './fieldValidationRenderUtils';

const isNotEmpty = (obj: any): boolean => {
    if (typeof obj === 'string') {
        return true;
    }
    if (typeof obj === 'object') {
        return JSON.stringify(obj) !== JSON.stringify({});
    }
    return false;
};

export const getValidationErrorWithIntl = <FormValues>(
    intl: IntlShape,
    errors: FormikErrors<FormValues>,
    elementName: string
): FieldValidationError | undefined => {
    const error = getIn(errors, elementName);
    if (
        error !== undefined &&
        isNotEmpty(error) &&
        !isArray(error) &&
        (isFieldValidationError(error) || typeof error === 'string')
        // Ekstra sjekk for å ikke ta med treff på forelder-node der
        // fields har objektstruktur, og en feil i barn-node
        // treffes av foreldernode (getIn finner begge)
    ) {
        return isFieldValidationError(error) ? renderFieldValidationError(intl, error) : error;
    }
    return undefined;
};

export const renderValidationErrorWithIntl = <FormValues>(
    intl: IntlShape,
    error: FormikErrors<FormValues>
): FieldValidationError | undefined => {
    if (
        error !== undefined &&
        isNotEmpty(error) &&
        !isArray(error) &&
        (isFieldValidationError(error) || typeof error === 'string')
        // Ekstra sjekk for å ikke ta med treff på forelder-node der
        // fields har objektstruktur, og en feil i barn-node
        // treffes av foreldernode (getIn finner begge)
    ) {
        return isFieldValidationError(error) ? renderFieldValidationError(intl, error) : error;
    }
    return undefined;
};
