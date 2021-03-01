import { FieldValidationResult } from '../../types/fieldValidation';
import { getNumberFromNumberInputValue } from '../../utils/numberInputUtils';

export const validateFormikNumberInputValue = (numString: string, errorIntlKey: string): FieldValidationResult => {
    const numValue = getNumberFromNumberInputValue(numString);
    if (numValue === undefined) {
        return {
            key: errorIntlKey,
            values: { numString },
        };
    }
    return undefined;
};
