import { QuestionConfig, Questions } from '../../../modules/visibility/questions/Questions';
import { hasValue } from '../../../validation/hasValue';
import { yesOrNoIsAnswered } from '../../../validation/yesOrNoIsAnswered';
import { FormFields, FormValues } from '../types';

export const FormConfig: QuestionConfig<FormValues, FormFields> = {
    [FormFields.birthdate]: {
        isAnswered: ({ birthdate }) => hasValue(birthdate)
    },
    [FormFields.birthCountry]: {
        parentQuestion: FormFields.birthdate,
        isAnswered: ({ birthCountry }) => hasValue(birthCountry)
    },
    [FormFields.firstname]: {
        parentQuestion: FormFields.birthdate,
        isAnswered: ({ firstname }) => hasValue(firstname)
    },
    [FormFields.lastname]: {
        parentQuestion: FormFields.birthdate,
        isAnswered: ({ lastname }) => hasValue(lastname),
        isOptional: () => true
    },
    [FormFields.hasKids]: {
        isAnswered: ({ hasKids }) => yesOrNoIsAnswered(hasKids)
    },
    [FormFields.numberOfKids]: {
        parentQuestion: FormFields.hasKids,
        isAnswered: ({ numberOfKids }) => numberOfKids !== undefined && !isNaN(numberOfKids) && numberOfKids >= 0
    },
    [FormFields.hasBeenAbroadWithKids]: {
        parentQuestion: FormFields.hasKids,
        isAnswered: ({ hasBeenAbroadWithKids }) => yesOrNoIsAnswered(hasBeenAbroadWithKids)
    },
    [FormFields.countries]: {
        isAnswered: ({ countries }) => countries !== undefined && countries.length > 0
    }
};

export const exampleFormQuestions = Questions<FormValues, FormFields>(FormConfig);
