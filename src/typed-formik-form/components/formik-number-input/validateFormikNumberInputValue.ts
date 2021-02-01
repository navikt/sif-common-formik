import { FieldValidationResult } from '../../types/fieldValidation';

export const validateFormikNumberInputValue = (numString: string, errorIntlKey: string): FieldValidationResult => {
    const value = (numString || '').replace(/\,/g, '.');
    if (isNaN(Number(value))) {
        return {
            key: errorIntlKey,
            values: { numString },
        };
    }
    return undefined;
};
