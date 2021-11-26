import { InputTime, YesOrNo } from '../../../typed-formik-form/types';
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
    'dateinterval_from' = 'dateinterval_from',
    'dateinterval_to' = 'dateinterval_to',
    'files' = 'files',
    'ferieuttak' = 'ferieuttak',
    'letters' = 'letters',
    'fødselsnummer' = 'fødselsnummer',
    'datastruktur' = 'objekt',
    'barnetsFødselsnummer' = 'barnetsFødselsnummer',
    'friends' = 'friends',
    'tilsynstimer' = 'tilsynstimer',
    'hvilketBarnGjelderDet' = 'hvilketBarnGjelderDet',
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
    [FormFields.time]?: InputTime;
    [FormFields.daterange_from]?: string;
    [FormFields.daterange_to]?: string;
    [FormFields.files]?: any;
    [FormFields.ferieuttak]?: Ferieuttak[];
    [FormFields.letters]?: string[];
    [FormFields.friends]: Friend[];
    [FormFields.fødselsnummer]: string;
    [FormFields.tilsynstimer]: string;
    [FormFields.datastruktur]: {
        navn: string;
    };
    [FormFields.barnetsFødselsnummer]: string;
    [FormFields.hvilketBarnGjelderDet]: string;
}
export interface Person {
    name: string;
}
export interface Friend extends Person {
    siblings: Person[];
}
export type FormValues = Partial<CompletedFormValues>;
