import { IntlShape } from 'react-intl';
import { FieldValidationError, FieldValidationResultValues } from './types';

export const isFieldValidationError = (error: any): error is FieldValidationError =>
    typeof error === 'object' && error.key !== undefined;

export const renderFieldValidationValues = (
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

export const renderFieldValidationError = (intl: IntlShape, error: FieldValidationError): string => {
    return intl.formatMessage({ id: error.key }, renderFieldValidationValues(intl, error.values));
};
