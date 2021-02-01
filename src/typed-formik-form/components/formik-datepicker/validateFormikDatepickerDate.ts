import { isISODateString } from 'nav-datovelger';
import { FieldValidationResult } from '../../types/fieldValidation';

export const validateDateString = (dateString = '', errorIntlKey: string): FieldValidationResult => {
    if (dateString !== undefined && dateString !== '' && isISODateString(dateString) === false) {
        return {
            key: errorIntlKey,
            values: { dateString },
        };
    }
    return undefined;
};
