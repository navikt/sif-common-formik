import { Time, YesOrNo } from '../../../typed-formik-form/types';
import { Ferieuttak } from './ferieuttak-example';

export enum FormFields {
    'nameGroup' = 'nameGroup',
    'firstname' = 'firstname',
    'lastname' = 'lastname',
    'birthdate' = 'birthdate',
    'birthCountry' = 'birthCountry',
    'hasKids' = 'hasKids',
    'numberOfKids' = 'numberOfKids',
    'hasBeenAbroadWithKids' = 'hasBeenAbroadWithKids',
    'countries' = 'countries',
    'time' = 'time',
    'daterange_from' = 'daterange_from',
    'daterange_to' = 'daterange_to',
    'files' = 'files',
    'ferieuttak' = 'ferieuttak',
    'letters' = 'letters',
    'fødselsnummer' = 'fødselsnummer',
    'friends' = 'friends',
}

export interface CompletedFormValues {
    [FormFields.nameGroup]: string;
    [FormFields.firstname]: string;
    [FormFields.lastname]?: string;
    [FormFields.birthdate]: string;
    [FormFields.birthCountry]: string;
    [FormFields.hasKids]: YesOrNo;
    [FormFields.numberOfKids]?: number;
    [FormFields.hasBeenAbroadWithKids]?: YesOrNo;
    [FormFields.countries]: string[];
    [FormFields.time]?: Time;
    [FormFields.daterange_from]?: string;
    [FormFields.daterange_to]?: string;
    [FormFields.files]?: any;
    [FormFields.ferieuttak]?: Ferieuttak[];
    [FormFields.letters]?: string[];
    [FormFields.friends]: Friend[];
}
export interface Person {
    name: string;
}
export interface Friend extends Person {
    siblings: Person[];
}
export type FormValues = Partial<CompletedFormValues>;
