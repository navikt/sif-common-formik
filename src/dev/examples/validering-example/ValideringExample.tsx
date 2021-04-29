import React from 'react';
import { useIntl } from 'react-intl';
import 'nav-frontend-tabs-style';
import { getTypedFormComponents } from '../../../typed-formik-form';
import TypedFormikWrapper from '../../../typed-formik-form/components/typed-formik-wrapper/TypedFormikWrapper';
import {
    getDateValidator,
    getDateRangeValidator,
    getNumberValidator,
    getStringValidator,
    getYesOrNoValidator,
    ValidateDateError,
    ValidateDateRangeError,
    ValidateNumberError,
    ValidateRequiredFieldError,
    ValidateStringError,
    ValidateYesOrNoError,
    getFødselsnummerValidator,
    ValidateFødselsnummerError,
    getOrgNumberValidator,
    ValidateOrgNumberError,
    getListValidator,
    ValidateListError,
    getRequiredFieldValidator,
    getCheckedValidator,
    ValidateCheckedError,
} from '../../../typed-formik-form/validation';
import getIntlFormErrorHandler from '../../../typed-formik-form/validation/intlFormErrorHandler';
import { ValidationError } from '../../../typed-formik-form/validation/types';
import PageIntro from '../../components/page-intro/PageIntro';
import Question from '../../components/question/Question';
import ValidationErrorList from '../../components/validation-errors/ValidationErrorList';
import { FormFields, FormValues } from './types';
import ValideringPanel from './ValideringPanel';
import datepickerUtils from '../../../typed-formik-form/components/formik-datepicker/datepickerUtils';
import { Element } from 'nav-frontend-typografi';
import Box from '../../components/box/Box';

const initialValues: FormValues = {
    liste: [],
};

const Form = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const ValideringExample = () => {
    const intl = useIntl();
    return (
        <>
            <PageIntro title="@navikt/sif-common-formik">
                <h2>Validering av skjemaelementer</h2>
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
                            <ValideringPanel title="Ja/Nei">
                                <Question>
                                    <Form.YesOrNoQuestion
                                        name={FormFields.jaNeiSpørsmål}
                                        legend="Du må svare ja eller nei"
                                        validate={getYesOrNoValidator()}></Form.YesOrNoQuestion>
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateYesOrNoError.yesOrNoIsUnanswered]: {
                                            info: 'spørsmål er ikke besvart',
                                            example: 'Du har ikke svart om du sier ja eller nei',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel title="Fritekst">
                                <Question>
                                    <Form.Input
                                        name={FormFields.tekst}
                                        label="Skriv inn hvilken dag det er i dag - bruk mellom 5 og 20 tegn"
                                        bredde="L"
                                        validate={getStringValidator({
                                            required: true,
                                            maxLength: 20,
                                            minLength: 5,
                                        })}></Form.Input>
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Du har ikke fylt ut hvilken dag det er i dag',
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
                            <ValideringPanel title="Tall">
                                <Question>
                                    <Form.NumberInput
                                        name={FormFields.tall}
                                        label="Skriv inn et årstall mellom 1999 og 2020"
                                        bredde="S"
                                        validate={getNumberValidator({
                                            required: true,
                                            min: 1999,
                                            max: 2020,
                                        })}></Form.NumberInput>
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Du har ikke fylt ut hvilken dag det er i dag',
                                        },
                                        [ValidateNumberError.invalidNumberFormat]: {
                                            info: 'verdien er ikke et tall',
                                            example: 'Årstall-feltet inneholder ikke et gyldig formatert tall',
                                        },
                                        [ValidateNumberError.numberIsTooLarge]: {
                                            info: 'for stort tall',
                                            example: `Årstallet kan ikke være etter 2020`,
                                        },
                                        [ValidateNumberError.numberIsTooSmall]: {
                                            info: 'for lavt tall',
                                            example: `Årstallet kan ikke være før 1999`,
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel title="Dato">
                                <Question>
                                    <Form.DatePicker
                                        name={FormFields.dato}
                                        label={'Velg en dato i 2020 som ikke er en lørdag eller søndag'}
                                        showYearSelector={true}
                                        validate={getDateValidator({
                                            required: true,
                                            min: new Date(2020, 0, 1),
                                            max: new Date(2020, 11, 31),
                                            onlyWeekdays: true,
                                        })}
                                    />
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'tomt innhold i felt',
                                            example: 'Du har ikke fylt ut hvilken dag det er i dag',
                                        },
                                        [ValidateDateError.invalidDateFormat]: {
                                            info: 'ugyldig verdi',
                                            example:
                                                'Datoen i 2020 har ikke gyldig format. Formatet må være dd.mm.åååå',
                                        },
                                        [ValidateDateError.dateBeforeMin]: {
                                            info: 'dato er for tidlig',
                                            example: 'Datoen er for tidlig, første gyldige dato er 1. januar 2020',
                                        },
                                        [ValidateDateError.dateAfterMax]: {
                                            info: 'dato er for sen',
                                            example: 'Datoen er for sen, siste gyldige dato er 31. desember 2020',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel title="Periodevelger">
                                <Question>
                                    <Form.DateRangePicker
                                        legend="Velg en tidsperiode i 2020 som ikke er lørdag eller søndag"
                                        fromInputProps={{
                                            label: 'Fra og med',
                                            name: FormFields.tidsperiode_fra,
                                            dayPickerProps: { initialMonth: new Date(2021, 0, 1) },
                                            validate: getDateRangeValidator.validateFromDate({
                                                min: new Date(2021, 0, 1),
                                                max: new Date(2021, 11, 31),
                                                toDate,
                                                required: true,
                                                onlyWeekdays: true,
                                            }),
                                        }}
                                        toInputProps={{
                                            label: 'Til og med',
                                            name: FormFields.tidsperiode_til,
                                            dayPickerProps: { initialMonth: new Date(2021, 11, 31) },
                                            validate: getDateRangeValidator.validateToDate({
                                                min: new Date(2021, 0, 1),
                                                max: new Date(2021, 11, 31),
                                                fromDate,
                                                required: true,
                                                onlyWeekdays: true,
                                            }),
                                        }}
                                    />
                                </Question>
                                <Element tag="h3">Fra-dato</Element>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ingen verdi',
                                            example: 'Du må velge fra-dato',
                                        },
                                        [ValidateDateError.invalidDateFormat]: {
                                            info: 'ugyldig verdi',
                                            example: 'Fra-dato har ikke gyldig format. Formatet må være dd.mm.åååå',
                                        },
                                        [ValidateDateError.dateBeforeMin]: {
                                            info: 'dato er for tidlig',
                                            example: 'Fra-dato er for tidlig, første gyldige dato er 1. januar 2021',
                                        },
                                        [ValidateDateError.dateAfterMax]: {
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
                                    <Element tag="h3">Til-dato</Element>
                                    <ValidationErrorList
                                        errors={{
                                            [ValidateRequiredFieldError.noValue]: {
                                                info: 'ingen verdi',
                                                example: 'Du må velge til-dato',
                                            },
                                            [ValidateDateError.invalidDateFormat]: {
                                                info: 'ugyldig verdi',
                                                example: 'Til-dato har ikke gyldig format. Formatet må være dd.mm.åååå',
                                            },
                                            [ValidateDateError.dateBeforeMin]: {
                                                info: 'dato er for tidlig',
                                                example:
                                                    'Til-dato er for tidlig, første gyldige dato er 1. januar 2021',
                                            },
                                            [ValidateDateError.dateAfterMax]: {
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
                            <ValideringPanel title="Norsk fødselsnummer/D-nummer">
                                <Question>
                                    <Form.Input
                                        name={FormFields.fødselsnummer}
                                        description={'Eksempelfødselsnummeret "19081988075" er ikke lov å taste inn'}
                                        label="Skriv inn et norskt fødselsnummer eller d-nummer. "
                                        validate={getFødselsnummerValidator({
                                            required: true,
                                            disallowedValues: ['19081988075'],
                                        })}
                                    />
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ingen verdi',
                                            example: 'Du må fylle ut fødselsnummeret',
                                        },
                                        [ValidateFødselsnummerError.fødselsnummerNot11Chars]: {
                                            info: 'ikke 11 tegn',
                                            example: 'Fødselsnummeret må bestå av 11 siffer',
                                        },
                                        [ValidateFødselsnummerError.invalidFødselsnummer]: {
                                            info: 'ikke 11 tegn',
                                            example:
                                                'Fødselsnummeret inneholder 11 siffer, men det er ikke et gyldig norsk fødselsnummer',
                                        },
                                        [ValidateFødselsnummerError.disallowedFødselsnummer]: {
                                            info: 'ikke tillatt fødselsnummer',
                                            example:
                                                'Fødselsnummeret du har fylt ut ditt eget. Du må fylle ut barnets fødselsnummer',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel title="Organisasjonsnummer">
                                <Question>
                                    <Form.YesOrNoQuestion
                                        name={FormFields.orgnummer}
                                        legend="Hva er NAVs organisasjonsnummer"
                                        validate={getOrgNumberValidator({ required: true })}></Form.YesOrNoQuestion>
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ingen verdi',
                                            example: 'Du må fylle ut NAVs organisasjonsnummer',
                                        },
                                        [ValidateOrgNumberError.invalidOrgNumberFormat]: {
                                            info: 'ugyldig orgnummer',
                                            example: 'Organisasjonsnummeret er ikke gyldig',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel title="Flervalgsliste">
                                <Question>
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
                                </Question>
                                <ValidationErrorList
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
                            <ValideringPanel title="Enkeltvalg i radioliste">
                                <Question>
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
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ingen element valgt',
                                            example: 'Du har ikke valgt din favorittgfrukt',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel title="Enkeltvalg i liste">
                                <p>Samme valideringslogikk som for en radioliste</p>
                                <Question>
                                    <Form.CountrySelect
                                        name={FormFields.select}
                                        label="Velg ett land"
                                        validate={getRequiredFieldValidator()}
                                    />
                                </Question>
                                <ValidationErrorList
                                    errors={{
                                        [ValidateRequiredFieldError.noValue]: {
                                            info: 'ikke valgt',
                                            example: 'Du må velge land',
                                        },
                                    }}
                                />
                            </ValideringPanel>
                            <ValideringPanel title="Avkrysningsvalg">
                                <Question>
                                    <Form.Checkbox
                                        name={FormFields.checked}
                                        label="Kryss av for at du bare må krysse av denne checkboxen"
                                        validate={getCheckedValidator()}
                                    />
                                </Question>
                                <ValidationErrorList
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
