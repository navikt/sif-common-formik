import { Time } from '../../../typed-formik-form/types/Time';
import { YesOrNo } from '../../../typed-formik-form/types/YesOrNo';

export enum FormFields {
    'firstname' = 'firstname',
    'lastname' = 'lastname',
    'birthdate' = 'birthdate',
    'birthCountry' = 'birthCountry',
    'hasKids' = 'hasKids',
    'numberOfKids' = 'numberOfKids',
    'hasBeenAbroadWithKids' = 'hasBeenAbroadWithKids',
    'countries' = 'countries',
    'time' = 'time'
}

export interface CompletedFormValues {
    [FormFields.firstname]: string;
    [FormFields.lastname]?: string;
    [FormFields.birthdate]: Date;
    [FormFields.birthCountry]: string;
    [FormFields.hasKids]: YesOrNo;
    [FormFields.numberOfKids]?: number;
    [FormFields.hasBeenAbroadWithKids]?: YesOrNo;
    [FormFields.countries]: string[];
    [FormFields.time]?: Time;
}
export type FormValues = Partial<CompletedFormValues>;
