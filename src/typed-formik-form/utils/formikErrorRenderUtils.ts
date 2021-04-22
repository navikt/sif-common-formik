import { IntlShape } from 'react-intl';
import { isFunction } from 'formik';
import { FormikFieldErrorRender, FormikSummaryFieldErrorRender } from '../components/typed-formik-form/TypedFormikForm';
import { FieldErrorType } from '../types';

export const createFieldErrorIntlKey = (error: FieldErrorType, fieldName: string, errorPrefix?: string): string =>
    `${errorPrefix ? `${errorPrefix}.` : ''}${fieldName}.${error}`;

export const getFieldErrorRenderer = (intl: IntlShape, errorPrefix?: string): FormikFieldErrorRender => (
    error: FieldErrorType,
    fieldName: string
) => {
    return isFunction(error)
        ? error()
        : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, errorPrefix) });
};

export const getSummaryFieldErrorRenderer = (intl: IntlShape, errorPrefix?: string): FormikSummaryFieldErrorRender => (
    error: FieldErrorType,
    fieldName: string
) => {
    return {
        skjemaelementId: fieldName,
        feilmelding: isFunction(error)
            ? error()
            : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, errorPrefix) }),
    };
};

export const getIntlValidationErrorRenderer = (intl: IntlShape, errorPrefix: string) => ({
    fieldErrorRenderer: getFieldErrorRenderer(intl, errorPrefix),
    summaryFieldErrorRenderer: getSummaryFieldErrorRenderer(intl, errorPrefix),
});
