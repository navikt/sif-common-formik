import { IntlShape } from 'react-intl';
import { CustomFormErrorHandler, FieldErrorHandler } from '../types';
import { isIntlErrorObject, ValidationError } from './types';

const createFieldErrorIntlKey = (error: string, fieldName: string, errorPrefix?: string): string =>
    `${errorPrefix ? `${errorPrefix}.` : ''}${fieldName}.${error}`;

const getFieldErrorHandler =
    (intl: IntlShape, errorPrefix?: string): FieldErrorHandler<ValidationError> =>
    (error: ValidationError, fieldName: string) => {
        return isIntlErrorObject(error)
            ? intl.formatMessage(
                  {
                      id: error.keepKeyUnaltered
                          ? error.key
                          : createFieldErrorIntlKey(error.key, fieldName, errorPrefix),
                  },
                  error.values
              )
            : intl.formatMessage({ id: createFieldErrorIntlKey(error, fieldName, errorPrefix) });
    };

const getIntlFormErrorHandlerUnderscore = (
    intl: IntlShape,
    errorPrefix?: string
): CustomFormErrorHandler<ValidationError> => ({
    fieldErrorHandler: getFieldErrorHandler(intl, errorPrefix),
    isHandledErrorTypeFunc: isIntlErrorObject,
});

export default getIntlFormErrorHandlerUnderscore;
