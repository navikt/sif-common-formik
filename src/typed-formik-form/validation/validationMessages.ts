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

const nbMessages: ValidationMessages = {
    [ValidateRequiredFieldError.noValue]: 'Du må svare på {hva}.',
    [ValidateCheckedError.notChecked]: 'Du må krysse av for {hva}.',
    [ValidateDateError.dateHasNoValue]: 'Du må oppgi en dato for {hva}. Skriv inn eller velg dato.',
    [ValidateDateError.dateHasInvalidFormat]:
        'Du må oppgi dato for {hva} i et gyldig format. Gyldig format er dd.mm.åååå.',
    [ValidateDateError.dateIsBeforeMin]:
        '{hva} kan ikke være før {mindato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    [ValidateDateError.dateIsAfterMax]:
        '{hva} kan ikke være etter {maksdato}. Skriv inn eller velg startdato fra datovelgeren.',
    [ValidateDateError.dateIsNotWeekday]: 'Lørdag og søndag kan ikke velges. Velg en annen ukedag.',
    [ValidateDateRangeError.fromDateIsAfterToDate]:
        '{startdato} kan ikke være etter {sluttdato}. Skriv inn eller velg startdato fra datovelgeren.',
    [ValidateDateRangeError.toDateIsBeforeFromDate]:
        '{sluttdato} kan ikke være før {startdato}. Skriv inn eller velg sluttdato fra datovelgeren.',
    [ValidateFødselsnummerError.fødselsnummerHasNoValue]: 'Skriv inn {hva}.',
    [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]:
        '{fødselsnummer} du har tastet inn er ugyldig. Fødselsnummeret må bestå av 11 siffer.',
    [ValidateFødselsnummerError.fødselsnummerIsInvalid]:
        '{fødselsnummer} du har tastet inn inneholder 11 siffer, men det er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
    [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: 'Du har tastet inn en fødselsnummer som ikke er lov.',
    [ValidateListError.listIsEmpty]: 'Legg til {hva}.',
    [ValidateListError.listHasTooFewItems]: 'Legg til minst {minAntall} {hva}.',
    [ValidateListError.listHasTooManyItems]: 'Du har lagt til for mange {hva}. Maks antall elementer er {maksAntall}.',
    [ValidateNumberError.numberHasNoValue]: 'Skriv inn {hva}.',
    [ValidateNumberError.numberHasInvalidFormat]:
        'Du må oppgi et gyldig tall for {hva}. Et gyldig tall inneholder kun siffer.',
    [ValidateNumberError.numberIsTooSmall]:
        'Tallet du har oppgitt for {hva} er for lavt. Tallet kan ikke være lavere enn {min}.',
    [ValidateNumberError.numberIsTooLarge]:
        'Tallet du har oppgitt for {hva} er for høyt. Tallet kan ikke være høyere enn {maks}.',
    [ValidateOrgNumberError.orgNumberHasNoValue]: 'Skriv inn {hva}.',
    [ValidateOrgNumberError.orgNumberHasInvalidFormat]:
        'Du har oppgitt et ugyldig organisasjonsnummer. Oppgi et gyldig organsisasjonsnummer som inneholder 9 siffer.',
    [ValidateStringError.stringHasNoValue]: 'Skriv inn {hva}.',
    [ValidateStringError.stringIsNotAString]: '{hva} er ikke en gyldig tekst.',
    [ValidateStringError.stringIsTooShort]: '{hva} må inneholde minst {minLengde} tegn.',
    [ValidateStringError.stringIsTooLong]: '{hva} kan ikke inneholde flere enn {maksLengde} tegn.',
    [ValidateYesOrNoError.yesOrNoIsUnanswered]: 'Du må svare ja eller nei på {hva}.',
};

const validationMessages: MessageFileFormat = {
    nb: {
        ...nbMessages,
    },
};

export default validationMessages;
