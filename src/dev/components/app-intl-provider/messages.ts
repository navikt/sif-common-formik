import { fallbackValidationMessages } from '../../../typed-formik-form/validation';

export const appMessages = {
    nb: {
        ...fallbackValidationMessages.nb,
        'letters.listIsEmpty': 'Whooa {value}',
        'hasKids.yesOrNoIsUnanswered': 'You have not answered {question}',
        'fødselsnummer.disallowedFødselsnummer': 'Du kan ikke bruke dette fødselsnummeret',
        'fødselsnummer.disallowedFødselsnummerCustom': 'Du kan ikke bruke dette fødselsnummeret {info}',
        'søskennavn.mangler': 'Ett av søskenene til {navn} mangler navn',
    },
    nn: {
        ...fallbackValidationMessages.nn,
    },
};
