import { IntlShape } from 'react-intl';
import { FieldValidationResultValues, IntlFieldValidationError } from './types';

export const isIntlFieldValidationErrorType = (error: any): error is IntlFieldValidationError =>
    typeof error === 'object' && error.key !== undefined;

export const renderIntlFieldValidationValues = (
    intl: IntlShape,
    values?: FieldValidationResultValues
): { [key: string]: string } | undefined => {
    if (values === undefined) {
        return undefined;
    }
    const parsedValues: { [key: string]: string } = {};
    Object.keys(values).forEach((key) => {
        const valueOrFunc = values[key];
        if (valueOrFunc !== undefined) {
            parsedValues[key] = typeof valueOrFunc === 'function' ? valueOrFunc(intl) : `${valueOrFunc}`;
        }
    });
    return parsedValues;
};

export const renderIntlFieldValidationError = (intl: IntlShape, error: IntlFieldValidationError): string => {
    return intl.formatMessage({ id: error.key }, renderIntlFieldValidationValues(intl, error.values));
};
