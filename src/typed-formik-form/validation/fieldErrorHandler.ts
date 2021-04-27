import { IntlShape } from 'react-intl';
import { FieldErrorHandler } from '../types';
import { isIntlErrorObject, ValidationError } from './types';

const createFieldErrorIntlKey = (error: ValidationError, fieldName: string, errorPrefix?: string): string =>
    `${errorPrefix ? `${errorPrefix}.` : ''}${fieldName}.${error}`;

const getFieldErrorHandler = (intl: IntlShape, errorPrefix?: string): FieldErrorHandler<ValidationError> => (
    error: ValidationError,
    fieldName: string
) => {
    return isIntlErrorObject(error)
        ? intl.formatMessage(
              { id: error.key ? error.key : createFieldErrorIntlKey(error, fieldName, errorPrefix) },
              error.values
          )
        : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, errorPrefix) });
};

export default getFieldErrorHandler;
