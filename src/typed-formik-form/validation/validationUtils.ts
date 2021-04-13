import datepickerUtils from '../components/formik-datepicker/datepickerUtils';
import { YesOrNo } from '../types';
import { getNumberFromNumberInputValue } from '../utils/numberInputUtils';

const getMod11 = (strValue: string): number => {
    let checkNbr = 2;
    let mod = 0;

    for (let i = strValue.length - 2; i >= 0; --i) {
        mod += parseInt(strValue.charAt(i), 10) * checkNbr;
        if (++checkNbr > 7) {
            checkNbr = 2;
        }
    }
    const result = 11 - (mod % 11);
    return result === 11 ? 0 : result;
};

const validationUtils = {
    isFieldWithValue: (v: any): boolean => v !== '' && v !== undefined && v !== null,
    isArrayWithItems: (v: any): boolean => {
        return Array.isArray(v) && v.length > 0;
    },
    isValidDatePickerDateString: (value: any): boolean => {
        return datepickerUtils.getDateFromDateString(value) !== undefined;
    },
    isAnswerdYesOrNo: (value): boolean => {
        return value === YesOrNo.YES || value === YesOrNo.NO || value === YesOrNo.DO_NOT_KNOW;
    },
    isValidNumber: (value: any): value is number => {
        return getNumberFromNumberInputValue(value) !== undefined;
    },
    isNumberWithinRange: (value: number, range: { min?: number; max?: number }): boolean => {
        const { min, max } = range;
        if (min !== undefined && max !== undefined) {
            if (value < min || value > max) {
                return false;
            }
        }
        if (min !== undefined && value < min) {
            return false;
        }
        if (max !== undefined && value > max) {
            return false;
        }
        return true;
    },
    isValidOrgNumber: (value: any): boolean => {
        if (
            value &&
            typeof value === 'string' &&
            value.length === 9 &&
            /^[0-9]*$/.test(value) &&
            (value.charAt(0) === '8' || value.charAt(0) === '9')
        ) {
            return getMod11(value) === parseInt(value.charAt(8), 10);
        }
        return false;
    },
};

export default validationUtils;
