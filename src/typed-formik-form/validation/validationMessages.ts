import { MessageFileFormat } from '../../dev/utils/devIntlUtils';
import { ValidateCheckedError } from './getCheckedValidator';
import { ValidateDateRangeError } from './getDateRangeValidator';
import { ValidateDateError } from './getDateValidator';
import { ValidateFødselsnummerError } from './getFødselsnummerValidator';
import { ValidateListError } from './getListValidator';
import { ValidateNumberError } from './getNumberValidator';
import { ValidateOrgNumberError } from './getOrgNumberValidator';
import { ValidateRequiredFieldError } from './getRequiredFieldValidator';
import { ValidateStringError } from './getStringValidator';
import { ValidateYesOrNoError } from './getYesOrNoValidator';

export interface ValidationMessages {
    [ValidateRequiredFieldError.noValue]: string;
    [ValidateCheckedError.notChecked]: string;
    [ValidateDateError.dateHasNoValue]: string;
    [ValidateDateError.dateHasInvalidFormat]: string;
    [ValidateDateError.dateIsBeforeMin]: string;
    [ValidateDateError.dateIsAfterMax]: string;
    [ValidateDateError.dateIsNotWeekday]: string;
    [ValidateDateRangeError.fromDateIsAfterToDate]: string;
    [ValidateDateRangeError.toDateIsBeforeFromDate]: string;
    [ValidateFødselsnummerError.fødselsnummerHasNoValue]: string;
    [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]: string;
    [ValidateFødselsnummerError.fødselsnummerIsInvalid]: string;
    [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: string;
    [ValidateListError.listIsEmpty]: string;
    [ValidateListError.listHasTooFewItems]: string;
    [ValidateListError.listHasTooManyItems]: string;
    [ValidateNumberError.numberHasNoValue]: string;
    [ValidateNumberError.numberHasInvalidFormat]: string;
    [ValidateNumberError.numberIsTooSmall]: string;
    [ValidateNumberError.numberIsTooLarge]: string;
    [ValidateOrgNumberError.orgNumberHasNoValue]: string;
    [ValidateOrgNumberError.orgNumberHasInvalidFormat]: string;
    [ValidateStringError.stringHasNoValue]: string;
    [ValidateStringError.stringIsNotAString]: string;
    [ValidateStringError.stringIsTooShort]: string;
    [ValidateStringError.stringIsTooLong]: string;
    [ValidateYesOrNoError.yesOrNoIsUnanswered]: string;
}

// const nbMessages: ValidationMessages = {
//     [ValidateRequiredFieldError.noValue]: '',
//     [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'sdf',
//     [ValidateCheckedError.notChecked]: '123',
//     [ValidateDateRangeError.fromDateIsAfterToDate]: '123',
//     [ValidateDateRangeError.toDateIsBeforeFromDate]: '123',
// };

const validationMessages: MessageFileFormat = {
    nb: {
        // ...nbMessages,
    },
};

export default validationMessages;
