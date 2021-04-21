import { IntlShape } from 'react-intl';
import { isFunction } from 'formik';
import { FormikFieldErrorRender, FormikSummaryFieldErrorRender } from '../components/typed-formik-form/TypedFormikForm';
import { FieldErrorType } from '../types';

export const createFieldErrorIntlKey = (error: FieldErrorType, fieldName: string, formName?: string): string =>
    `${formName ? `${formName}.` : ''}validation.${fieldName}.${error}`;

export const getFieldErrorRenderer = (intl: IntlShape, formName?: string): FormikFieldErrorRender => (
    error: FieldErrorType,
    fieldName: string
) => {
    return isFunction(error)
        ? error()
        : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, formName) });
};

export const getSummaryFieldErrorRenderer = (intl: IntlShape, formName?: string): FormikSummaryFieldErrorRender => (
    error: FieldErrorType,
    fieldName: string
) => {
    return {
        skjemaelementId: fieldName,
        feilmelding: isFunction(error)
            ? error()
            : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, formName) }),
    };
};
