import React from 'react';
import { useIntl } from 'react-intl';
import Panel from 'nav-frontend-paneler';
import 'nav-frontend-tabs-style';
import { getTypedFormComponents } from '../../../typed-formik-form';
import datepickerUtils from '../../../typed-formik-form/components/formik-datepicker/datepickerUtils';
import TypedFormikWrapper from '../../../typed-formik-form/components/typed-formik-wrapper/TypedFormikWrapper';
import {
    getCheckedValidator,
    getDateRangeValidator,
    getDateValidator,
    getFødselsnummerValidator,
    getListValidator,
    getNumberValidator,
    getOrgNumberValidator,
    getRequiredFieldValidator,
    getStringValidator,
    getYesOrNoValidator,
    ValidateCheckedError,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateFødselsnummerError,
    ValidateListError,
    ValidateNumberError,
    ValidateOrgNumberError,
    ValidateRequiredFieldError,
    ValidateStringError,
    ValidateYesOrNoError,
} from '../../../typed-formik-form/validation';
import getIntlFormErrorHandler from '../../../typed-formik-form/validation/intlFormErrorHandler';
import { ValidationError } from '../../../typed-formik-form/validation/types';
import Box from '../../components/box/Box';
import PageIntro from '../../components/page-intro/PageIntro';
import ValidationErrorList from '../../components/validation-errors/ValidationErrorList';
import { FormFields, FormValues } from './types';
import ValideringPanel from './ValideringPanel';

const initialValues: FormValues = {
    liste: [],
};

const Form = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const ValideringExample = () => {
    const intl = useIntl();
    return (
        <>
            <PageIntro title="@navikt/sif-common-formik">
                <h2>Validering</h2>
                <p>sif-common-formik komponenter med validering</p>
            </PageIntro>

            <TypedFormikWrapper<FormValues>
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log('FormikWrapperSubmit', values);
                }}
                renderForm={(formik) => {
                    const fromDate = datepickerUtils.getDateFromDateString(formik.values.tidsperiode_fra);
                    const toDate = datepickerUtils.getDateFromDateString(formik.values.tidsperiode_til);
                    return (
                        <Form.Form
                            submitButtonLabel="Ok"
                            includeValidationSummary={true}
                            includeButtons={true}
                            formErrorHandler={getIntlFormErrorHandler(intl)}>
                            <ValideringPanel
                                title="Ja/Nei"
                                code={`
export enum ValidateYesOrNoError {
yesOrNoIsUnanswered = 'yesOrNoIsUnanswered',
}

type YesOrNoValidationResult =
| ValidateYesOrNoError.yesOrNoIsUnanswered
| undefined;

const error = getYesOrNoValidator()(value);
                    `}>
                                <Panel>
                                    <Form.YesOrNoQuestion
                                        name={FormFields.jaNeiSpørsmål}
                                        legend="Du må svare ja eller nei"
                                        validate={getYesOrNoValidator()}></Form.YesOrNoQuestion>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateYesOrNoError.yesOrNoIsUnanswered]: {
                                            info: 'spørsmål er ikke besvart',
                                            example: 'Du har ikke svart om du sier ja eller nei',
                                        },
                                    }}
                                />
                            </ValideringPanel>

                            <ValideringPanel
                                title="Fritekst"
                                code={`
export enum ValidateStringError {
    stringHasNoValue = 'stringHasNoValue',
    stringIsNotAString = 'stringIsNotAString',
    stringIsTooShort = 'stringIsTooShort',
    stringIsTooLong = 'stringIsTooLong',
}

type StringValidationResult =
    | undefined
    | ValidateStringError.stringHasNoValue
    | ValidateStringError.stringIsNotAString
    | ValidateStringError.stringIsTooLong
    | ValidateStringError.stringIsTooShort;

type Options = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

const error = getStringValidator(options)(value);
                                    `}>
                                <Panel>
                                    <Form.Input
                                        name={FormFields.tekst}
                                        label="Skriv inn hvilken dag det er i dag - bruk mellom 5 og 20 tegn"
                                        bredde="L"
                                        validate={getStringValidator({
                                            required: true,
                                            maxLength: 20,
                                            minLength: 5,
                                        })}></Form.Input>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateStringError.stringHasNoValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Du har ikke fylt ut hvilken dag det er i dag',
                                        },
                                        [ValidateStringError.stringIsNotAString]: {
                                            info: 'feil type data',
                                            example: 'Verdien er ikke en gyldig tekst',
                                        },
                                        [ValidateStringError.stringIsTooLong]: {
                                            info: 'for lang tekst',
                                            example: 'Du har brukt for mange tegn for å si hvilken dag det er i dag',
                                        },
                                        [ValidateStringError.stringIsTooShort]: {
                                            info: 'for kort tekst',
                                            example: 'Du har brukt for få tegn for å si hvilken dag det er i dag',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Tall"
                                code={`
export enum ValidateNumberError {
    numberHasNoValue = 'numberHasNoValue',
    numberHasInvalidFormat = 'numberHasInvalidFormat',
    numberIsTooSmall = 'numberIsTooSmall',
    numberIsTooLarge = 'numberIsTooLarge',
}

type NumberValidationResult =
    | undefined
    | ValidateNumberError.numberHasNoValue
    | ValidateNumberError.numberHasInvalidFormat
    | ValidateNumberError.numberIsTooLarge
    | ValidateNumberError.numberIsTooSmall;

interface Options {
    required?: boolean;
    min?: number;
    max?: number;
}

const error = getNumberValidator(options)(value);
                                    `}>
                                <Panel>
                                    <Form.NumberInput
                                        name={FormFields.tall}
                                        label="Skriv inn et årstall mellom 1999 og 2021"
                                        bredde="S"
                                        validate={getNumberValidator({
                                            required: true,
                                            min: 1999,
                                            max: 2021,
                                        })}></Form.NumberInput>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateNumberError.numberHasNoValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Du har ikke fylt ut hvilken dag det er i dag',
                                        },
                                        [ValidateNumberError.numberHasInvalidFormat]: {
                                            info: 'verdien er ikke et tall',
                                            example: 'Årstall-feltet inneholder ikke et gyldig formatert tall',
                                        },
                                        [ValidateNumberError.numberIsTooLarge]: {
                                            info: 'for stort tall',
                                            example: `Årstallet kan ikke være etter 2021`,
                                        },
                                        [ValidateNumberError.numberIsTooSmall]: {
                                            info: 'for lavt tall',
                                            example: `Årstallet kan ikke være før 1999`,
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Dato"
                                code={`
export enum ValidateDateError {
    dateHasNoValue = 'dateHasNoValue',
    dateHasInvalidFormat = 'dateHasInvalidFormat',
    dateIsBeforeMin = 'dateIsBeforeMin',
    dateIsAfterMax = 'dateIsAfterMax',
    dateIsNotWeekday = 'dateIsNotWeekday',
}

export type DateValidationResult =
    | ValidateDateError.dateHasNoValue
    | ValidateDateError.dateHasInvalidFormat
    | ValidateDateError.dateIsBeforeMin
    | ValidateDateError.dateIsAfterMax
    | ValidateDateError.dateIsNotWeekday
    | undefined;

export interface DateValidationOptions {
    required?: boolean;
    min?: Date;
    max?: Date;
    onlyWeekdays?: boolean;
}

const error = getDateValidator(options)(value);
`}>
                                <Panel>
                                    <Form.DatePicker
                                        name={FormFields.dato}
                                        label={'Velg en dato i 2021 som ikke er en lørdag eller søndag'}
                                        showYearSelector={true}
                                        validate={getDateValidator({
                                            required: true,
                                            min: new Date(2021, 0, 1),
                                            max: new Date(2021, 11, 31),
                                            onlyWeekdays: true,
                                        })}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateDateError.dateHasNoValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Du har ikke fylt ut hvilken dag det er i dag',
                                        },
                                        [ValidateDateError.dateHasInvalidFormat]: {
                                            info: 'ugyldig verdi',
                                            example:
                                                'Datoen i 2021 har ikke gyldig format. Formatet må være dd.mm.åååå',
                                        },
                                        [ValidateDateError.dateIsBeforeMin]: {
                                            info: 'dato er for tidlig',
                                            example: 'Datoen er for tidlig, første gyldige dato er 1. januar 2021',
                                        },
                                        [ValidateDateError.dateIsAfterMax]: {
                                            info: 'dato er for sen',
                                            example: 'Datoen er for sen, siste gyldige dato er 31. desember 2021',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Periodevelger"
                                code={`
export enum ValidateDateRangeError {
    toDateIsBeforeFromDate = 'toDateIsBeforeFromDate',
    fromDateIsAfterToDate = 'fromDateIsAfterToDate',
}

type DateRangeValidationResult =
    | DateValidationResult
    | ValidateDateRangeError.fromDateIsAfterToDate
    | ValidateDateRangeError.toDateIsBeforeFromDate
    | undefined;

interface Options extends DateValidationOptions {
    fromDate?: Date;
    toDate?: Date;
}

const errorFromDate = getDateRangeValidator(options).validateFromDate(value);
const errorToDate = getDateRangeValidator(options).validateToDate(value);
                                `}>
                                <Panel>
                                    <Form.DateRangePicker
                                        legend="Velg en tidsperiode i 2021 som ikke er lørdag eller søndag"
                                        fromInputProps={{
                                            label: 'Fra og med',
                                            name: FormFields.tidsperiode_fra,
                                            dayPickerProps: { initialMonth: new Date(2021, 0, 1) },
                                            validate: getDateRangeValidator({
                                                min: new Date(2021, 0, 1),
                                                max: new Date(2021, 11, 31),
                                                toDate,
                                                required: true,
                                                onlyWeekdays: true,
                                            }).validateFromDate,
                                        }}
                                        toInputProps={{
                                            label: 'Til og med',
                                            name: FormFields.tidsperiode_til,
                                            dayPickerProps: { initialMonth: new Date(2021, 11, 31) },
                                            validate: getDateRangeValidator({
                                                min: new Date(2021, 0, 1),
                                                max: new Date(2021, 11, 31),
                                                fromDate,
                                                required: true,
                                                onlyWeekdays: true,
                                            }).validateToDate,
                                        }}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger - Fra-dato"
                                    errors={{
                                        [ValidateDateError.dateHasNoValue]: {
                                            info: 'ingen verdi',
                                            example: 'Du må velge fra-dato',
                                        },
                                        [ValidateDateError.dateHasInvalidFormat]: {
                                            info: 'ugyldig verdi',
                                            example: 'Fra-dato har ikke gyldig format. Formatet må være dd.mm.åååå',
                                        },
                                        [ValidateDateError.dateIsBeforeMin]: {
                                            info: 'dato er for tidlig',
                                            example: 'Fra-dato er for tidlig, første gyldige dato er 1. januar 2021',
                                        },
                                        [ValidateDateError.dateIsAfterMax]: {
                                            info: 'dato er for sen',
                                            example: 'Fra-dato er for sen, siste gyldige dato er 31. desember 2021',
                                        },
                                        [ValidateDateRangeError.fromDateIsAfterToDate]: {
                                            info: 'fra-dato er etter til-dato',
                                            example: 'Fra-dato kan ikke være etter til-datoen',
                                        },
                                    }}
                                />
                                <Box margin="xl">
                                    <ValidationErrorList
                                        title="Feilmeldinger - Til-dato"
                                        errors={{
                                            [ValidateDateError.dateHasNoValue]: {
                                                info: 'ingen verdi',
                                                example: 'Du må velge til-dato',
                                            },
                                            [ValidateDateError.dateHasInvalidFormat]: {
                                                info: 'ugyldig verdi',
                                                example: 'Til-dato har ikke gyldig format. Formatet må være dd.mm.åååå',
                                            },
                                            [ValidateDateError.dateIsBeforeMin]: {
                                                info: 'dato er for tidlig',
                                                example:
                                                    'Til-dato er for tidlig, første gyldige dato er 1. januar 2021',
                                            },
                                            [ValidateDateError.dateIsAfterMax]: {
                                                info: 'dato er for sen',
                                                example: 'Til-dato er for sen, siste gyldige dato er 31. desember 2021',
                                            },
                                            [ValidateDateRangeError.toDateIsBeforeFromDate]: {
                                                info: 'til-dato er før fra-dato',
                                                example: 'Til-dato kan ikke være før fra-datoen',
                                            },
                                        }}
                                    />
                                </Box>
                            </ValideringPanel>
                            <ValideringPanel
                                title="Norsk fødselsnummer/D-nummer"
                                code={`
export enum ValidateFødselsnummerError {
    fødselsnummerHasNoValue = 'fødselsnummerHasNoValue',
    fødselsnummerIsNot11Chars = 'fødselsnummerIsNot11Chars',
    fødselsnummerIsInvalid = 'fødselsnummerIsInvalid',
    fødselsnummerIsNotAllowed = 'fødselsnummerIsNotAllowed',
}

type FødselsnummerValidationResult =
    | ValidateFødselsnummerError.fødselsnummerHasNoValue
    | ValidateFødselsnummerError.fødselsnummerIsNotAllowed
    | ValidateFødselsnummerError.fødselsnummerIsNot11Chars
    | ValidateFødselsnummerError.fødselsnummerIsInvalid
    | undefined;

interface Options {
    required?: boolean;
    /** Andre fødselsnumre som ikke er gyldig - f.eks søkers fødselsnummer */
    disallowedValues?: string[];
}

const error = getFødselsnummerValidator(options)(value);
`}>
                                <Panel>
                                    <Form.Input
                                        name={FormFields.fødselsnummer}
                                        bredde="M"
                                        description={'Eksempelfødselsnummeret "19081988075" er ikke lov å taste inn'}
                                        label="Skriv inn et norskt fødselsnummer eller d-nummer. "
                                        validate={getFødselsnummerValidator({
                                            required: true,
                                            disallowedValues: ['19081988075'],
                                        })}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateFødselsnummerError.fødselsnummerHasNoValue]: {
                                            info: 'ingen verdi',
                                            example: 'Du må fylle ut fødselsnummeret',
                                        },
                                        [ValidateFødselsnummerError.fødselsnummerIsNot11Chars]: {
                                            info: 'ikke 11 tegn',
                                            example: 'Fødselsnummeret må bestå av 11 siffer',
                                        },
                                        [ValidateFødselsnummerError.fødselsnummerIsInvalid]: {
                                            info: 'ikke 11 tegn',
                                            example:
                                                'Fødselsnummeret inneholder 11 siffer, men det er ikke et gyldig norsk fødselsnummer',
                                        },
                                        [ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: {
                                            info: 'ikke tillatt fødselsnummer',
                                            example:
                                                'Fødselsnummeret du har fylt ut ditt eget. Du må fylle ut barnets fødselsnummer',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Organisasjonsnummer"
                                code={`
export enum ValidateOrgNumberError {
    orgNumberHasNoValue = 'orgNumberHasNoValue',
    orgNumberHasInvalidFormat = 'orgNumberHasInvalidFormat',
}

type OrgNumberValidationResult =
    | undefined
    | ValidateOrgNumberError.orgNumberHasNoValue
    | ValidateOrgNumberError.orgNumberHasInvalidFormat;

interface Options {
    required?: boolean;
}

const error = getOrgNumberValidator(options)(value);
`}>
                                <Panel>
                                    <Form.YesOrNoQuestion
                                        name={FormFields.orgnummer}
                                        legend="Hva er NAVs organisasjonsnummer"
                                        validate={getOrgNumberValidator({ required: true })}></Form.YesOrNoQuestion>
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateOrgNumberError.orgNumberHasNoValue]: {
                                            info: 'ingen verdi',
                                            example: 'Du må fylle ut NAVs organisasjonsnummer',
                                        },
                                        [ValidateOrgNumberError.orgNumberHasInvalidFormat]: {
                                            info: 'ugyldig orgnummer',
                                            example: 'Organisasjonsnummeret er ikke gyldig',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Flervalgsliste"
                                code={`
export enum ValidateListError {
    listIsEmpty = 'listIsEmpty',
    listHasTooFewItems = 'listHasTooFewItems',
    listHasTooManyItems = 'listHastooManyItems',
}

type ListValidationResult = undefined | ValidateListError;

interface Options {
    required?: boolean;
    minItems?: number;
    maxItems?: number;
}

const error = getListValidator(options)(value);
`}>
                                <Panel>
                                    <Form.CheckboxPanelGroup
                                        name={FormFields.liste}
                                        legend="Velg dine to eller tre favorittfrukter"
                                        checkboxes={[
                                            {
                                                label: 'Eple',
                                                value: 'eple',
                                            },
                                            {
                                                label: 'Banan',
                                                value: 'Banan',
                                            },
                                            {
                                                label: 'Pære',
                                                value: 'Pære',
                                            },
                                            {
                                                label: 'Jordbær (ja, det er en såkalt "falsk frukt")',
                                                value: 'Jordbær',
                                            },
                                        ]}
                                        validate={getListValidator({
                                            required: true,
                                            minItems: 2,
                                            maxItems: 3,
                                        })}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateListError.listIsEmpty]: {
                                            info: 'ingen element valgt',
                                            example: 'Du har ikke valgt to eller tre frukter',
                                        },
                                        [ValidateListError.listHasTooFewItems]: {
                                            info: 'for få valgt',
                                            example: 'Du har ikke valgt nok frukter, du må velge minst 2',
                                        },
                                        [ValidateListError.listHasTooManyItems]: {
                                            info: 'for mange valgt',
                                            example: 'Du har valgt for mange frukter, du kan ikke velge flere enn 3',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Enkeltvalg - radioknapper"
                                code={`
export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;

const error = getRequiredFieldValidator()(value);
`}>
                                <Panel>
                                    <Form.RadioPanelGroup
                                        name={FormFields.radio}
                                        legend="Velg din éne favorittfrukt"
                                        radios={[
                                            {
                                                label: 'Eple',
                                                value: 'eple',
                                            },
                                            {
                                                label: 'Banan',
                                                value: 'Banan',
                                            },
                                            {
                                                label: 'Pære',
                                                value: 'Pære',
                                            },
                                            {
                                                label: 'Jordbær (ja, det er en såkalt "falsk frukt")',
                                                value: 'Jordbær',
                                            },
                                        ]}
                                        validate={getRequiredFieldValidator()}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ingen element valgt',
                                            example: 'Du har ikke valgt din favorittgfrukt',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Enkeltvalg i liste"
                                code={`
export enum ValidateRequiredFieldError {
    'noValue' = 'noValue',
}

type RequiredFieldValidationResult = ValidateRequiredFieldError.noValue | undefined;

const error = getRequiredFieldValidator()(value);
`}>
                                <p>Samme valideringslogikk som for en radioliste</p>
                                <Panel>
                                    <Form.CountrySelect
                                        name={FormFields.select}
                                        label="Velg ett land"
                                        validate={getRequiredFieldValidator()}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ikke valgt',
                                            example: 'Du må velge land',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel
                                title="Avkrysningsvalg"
                                code={`
export enum ValidateCheckedError {
    'notChecked' = 'notChecked',
}

type CheckedValidationResult = ValidateCheckedError | undefined;

const error = getCheckedValidator()(value);
                            `}>
                                <Panel>
                                    <Form.Checkbox
                                        name={FormFields.checked}
                                        label="Kryss av for at du bare må krysse av denne checkboxen"
                                        validate={getCheckedValidator()}
                                    />
                                </Panel>
                                <ValidationErrorList
                                    title="Feilmeldinger"
                                    errors={{
                                        [ValidateCheckedError.notChecked]: {
                                            info: 'ikke valgt',
                                            example: 'Du må krysse av for at du bare må gjøre det',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                        </Form.Form>
                    );
                }}
            />
        </>
    );
};

export default ValideringExample;
