import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import { FormikDateIntervalPicker, FormikFileInput, FormikInput, ISOStringToDate } from '../../../../typed-formik-form';
import FormikDateRangePicker from '../../../../typed-formik-form/components/formik-date-range-picker/FormikDateRangePicker';
import FormikTimeInput from '../../../../typed-formik-form/components/formik-time-input/FormikTimeInput';
import { getTypedFormComponents } from '../../../../typed-formik-form/components/getTypedFormComponents';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getListValidator,
    getNumberValidator,
    getStringValidator,
    getYesOrNoValidator,
    ValidateFødselsnummerError,
    ValidateListError,
    ValidateNumberError,
} from '../../../../typed-formik-form/validation';
import getRequiredFieldValidator from '../../../../typed-formik-form/validation/getRequiredFieldValidator';
import getTimeValidator from '../../../../typed-formik-form/validation/getTimeValidator';
import getIntlFormErrorHandler from '../../../../typed-formik-form/validation/intlFormErrorHandler';
import { ValidationError } from '../../../../typed-formik-form/validation/types';
import { validateAll } from '../../../../typed-formik-form/validation/validationUtils';
import Box from '../../../components/box/Box';
import Question from '../../../components/question/Question';
import Tiles from '../../../components/tiles/Tiles';
import FerieuttakListAndDialog from '../ferieuttak-example/FerieuttakListAndDialog';
import { FormFields, FormValues } from '../types';
import Friends from './Friends';

const Form = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const TypedFormExample = () => {
    const { values } = useFormikContext<FormValues>();
    const { setFieldValue } = useFormikContext<FormValues>();
    const intl = useIntl();
    const minDate = dayjs().subtract(2, 'month').toDate();
    const maxDate = dayjs().add(1, 'month').toDate();
    // const datoer = getDatoerForOmsorgstilbudPeriode(dayjs('2021-06-01').toDate(), dayjs('2021-06-04').toDate());
    return (
        <Form.Form
            submitButtonLabel="Ok"
            includeValidationSummary={true}
            includeButtons={true}
            formErrorHandler={getIntlFormErrorHandler(intl)}>
            <Box margin="m">
                <FormikTimeInput
                    name="abc"
                    label="Tor. 12.05.21"
                    timeInputLayout={{
                        direction: 'horizontal',
                        compact: false,
                    }}
                    validate={(time) => {
                        const error = getTimeValidator({
                            required: true,
                            min: { hours: 0, minutes: 1 },
                            max: { hours: 7, minutes: 30 },
                        })(time);
                        return error
                            ? {
                                  key: error,
                                  values: { dag: 'Torsdag 12. 10. 2000' },
                                  keepKeyUnaltered: true,
                              }
                            : undefined;
                    }}
                />
            </Box>
            <Box margin="m">
                <FormikTimeInput
                    name="abc"
                    label="Tor. 12.05.21"
                    timeInputLayout={{
                        direction: 'horizontal',
                        compact: true,
                    }}
                />
            </Box>
            <Box margin="m">
                <FormikTimeInput
                    name="abc"
                    label="Tor. 12.05.21"
                    timeInputLayout={{
                        direction: 'vertical',
                        compact: true,
                    }}
                />
            </Box>

            {1 + 1 === 2 && (
                <>
                    {/* <OmsorgstilbudInlineForm fieldName={`enkeltdager`} datoer={datoer} /> */}
                    <Question>
                        <Box margin="m">
                            <FormikTimeInput
                                name="abc"
                                label="Tor. 12.05.21"
                                timeInputLayout={{
                                    direction: 'vertical',
                                    compact: false,
                                }}
                                validate={(time) => {
                                    const error = getTimeValidator({
                                        required: true,
                                        min: { hours: 0, minutes: 1 },
                                        max: { hours: 7, minutes: 30 },
                                    })(time);
                                    return error
                                        ? {
                                              key: error,
                                              values: { dag: 'Torsdag 12. 10. 2000' },
                                              keepKeyUnaltered: true,
                                          }
                                        : undefined;
                                }}
                            />
                        </Box>
                        <Box margin="m">
                            <FormikTimeInput
                                name="abc"
                                label="Tor. 12.05.21"
                                timeInputLayout={{
                                    direction: 'vertical',
                                }}
                                validate={(time) => {
                                    const error = getTimeValidator({
                                        required: true,
                                        min: { hours: 0, minutes: 1 },
                                        max: { hours: 7, minutes: 30 },
                                    })(time);
                                    return error
                                        ? {
                                              key: error,
                                              values: { dag: 'Torsdag 12. 10. 2000' },
                                              keepKeyUnaltered: true,
                                          }
                                        : undefined;
                                }}
                            />
                        </Box>
                    </Question>
                    <Question>
                        <Form.YesOrNoQuestion
                            legend={'Har du kids'}
                            name={FormFields.hasKids}
                            validate={(value) => {
                                const err = getYesOrNoValidator()(value);
                                if (err) {
                                    return {
                                        key: err,
                                        values: { question: 'spørsmålet om antall barn' },
                                        keepKeyUnaltered: false,
                                    };
                                }
                            }}
                        />
                    </Question>
                    <Question>
                        <FormikDateRangePicker
                            legend="DateRangePicker"
                            disableWeekend={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            fromInputProps={{
                                name: FormFields.daterange_from,
                                label: 'Fra',
                            }}
                            toInputProps={{
                                name: FormFields.daterange_to,
                                label: 'Til',
                            }}
                        />
                    </Question>
                    <Question>
                        <Form.Input
                            name={FormFields.fødselsnummer}
                            label="Fødselsnummer"
                            validate={(value) =>
                                validateAll<ValidationError>([
                                    () => getStringValidator({ minLength: 2 })(value),
                                    () => getFødselsnummerValidator({ required: true })(value),
                                ])
                            }
                        />
                    </Question>
                    <Question>
                        <Form.Input
                            name={'datastruktur.navn' as any}
                            label="Datastrukturnavn"
                            validate={(value) => {
                                const error = getStringValidator({ minLength: 2, required: true })(value);
                                if (error) {
                                    return {
                                        key: 'abc',
                                        values: { s: 2 },
                                    };
                                }
                                return error;
                            }}
                        />
                    </Question>
                    <Question>
                        <Form.Input
                            type="text"
                            label="Fornavn"
                            name={FormFields.firstname}
                            validate={getRequiredFieldValidator()}
                        />
                    </Question>{' '}
                    <Question>
                        <Form.Input
                            name={FormFields.barnetsFødselsnummer}
                            label="Barnets fødselsnummer"
                            validate={(value) => {
                                const error = getFødselsnummerValidator({
                                    required: true,
                                    disallowedValues: values.fødselsnummer ? [values.fødselsnummer] : undefined,
                                })(value);
                                if (error === ValidateFødselsnummerError.fødselsnummerIsNotAllowed) {
                                    return {
                                        key: 'fødselsnummer.fødselsnummerIsNotAllowed',
                                        values: {
                                            info: ' (du har tastet inn ditt eget fødselsnummer)',
                                        },
                                    };
                                }
                                return error;
                            }}
                        />
                    </Question>
                    <Box margin="xl">
                        <Box margin="l" padBottom="l">
                            <Undertittel>Venner</Undertittel>
                        </Box>
                        <Question>
                            <Friends fieldName="friends" friends={values.friends || []} />
                        </Question>
                    </Box>
                    <Question>
                        <FerieuttakListAndDialog
                            name={FormFields.ferieuttak}
                            labels={{
                                addLabel: 'Legg til',
                                modalTitle: 'Ferieuttak',
                                listTitle: 'Ferieuttak',
                            }}
                            minDate={dayjs().subtract(1, 'year').toDate()}
                            maxDate={dayjs().add(1, 'year').toDate()}
                        />
                    </Question>
                    <Question>
                        <Form.CheckboxPanelGroup
                            legend={'Velg en bokstav'}
                            name={FormFields.letters}
                            checkboxes={[
                                { label: 'a', value: 'a' },
                                { label: 'b', value: 'b' },
                                { label: 'c', value: 'c' },
                            ]}
                            validate={(value) => {
                                const error = getListValidator({ required: true })(value);
                                if (error === ValidateListError.listIsEmpty) {
                                    return {
                                        key: error,
                                        values: { value: 'inserted value' },
                                    };
                                }
                                return error;
                            }}
                        />
                    </Question>
                    <Question>
                        <Form.DatePicker
                            name={FormFields.birthdate}
                            label="Fødselsdato"
                            validate={getDateValidator({ required: true })}
                        />
                    </Question>
                    <Question>
                        <Form.CountrySelect name={FormFields.birthCountry} label="Fødselsland" useAlpha3Code={true} />
                    </Question>
                    <Question>
                        <Tiles columns={2}>
                            <Form.Input
                                name={FormFields.firstname}
                                label="Fornavn"
                                validate={getRequiredFieldValidator()}
                            />
                            <Form.Input
                                name={FormFields.lastname}
                                label="Etternavn"
                                validate={getRequiredFieldValidator()}
                            />
                        </Tiles>
                    </Question>
                    <Question>
                        <div style={{ display: 'flex', flex: 'flex-start' }}>
                            <FormikTimeInput name={FormFields.time} label="Tidspunkt" />
                        </div>
                    </Question>
                    <Question>
                        <FormikDateIntervalPicker
                            legend="DateIntervalPicker (test)"
                            fromDatepickerProps={{
                                name: FormFields.dateinterval_from,
                                label: 'Fra',
                                maxDate: ISOStringToDate(values.daterange_to),
                                validate: getRequiredFieldValidator(),
                            }}
                            toDatepickerProps={{
                                name: FormFields.dateinterval_to,
                                label: 'Til',
                                minDate: ISOStringToDate(values.daterange_from),
                                validate: getRequiredFieldValidator(),
                            }}
                        />
                    </Question>
                    <Question>
                        <FormikFileInput
                            name={FormFields.files}
                            label="Legg til filer"
                            acceptedExtensions={'tsx'}
                            onFilesSelect={() => null}
                        />
                    </Question>
                    <Question>
                        <Form.Input
                            label="Oppgi hvor mange timer i snitt per uke, har barnet tilsyn?"
                            name={FormFields.firstname}
                            suffixStyle="text"
                            suffix="Timer"
                            bredde="S"
                            maxLength={5}
                            validate={(value) => {
                                const error = getNumberValidator({ min: 0, max: 20000 })(value);
                                if (error === ValidateNumberError.numberIsTooLarge) {
                                    return {
                                        key: error,
                                        values: { max: 20000 },
                                    };
                                }
                                if (error === ValidateNumberError.numberIsTooSmall) {
                                    return {
                                        key: error,
                                        values: { min: 0 },
                                    };
                                }
                                return error;
                            }}
                        />
                    </Question>
                    <Question>
                        <FormikInput type="tel" label="Et tall" name={'number'} />
                    </Question>
                    <Question>
                        <Form.RadioGroup
                            legend={'Velg en bokstav'}
                            name={FormFields.letters}
                            radios={[
                                { label: 'a', value: 'a' },
                                { label: 'b', value: 'b' },
                                { label: 'c', value: 'c' },
                            ]}
                            validate={getRequiredFieldValidator()}
                        />
                    </Question>
                    <Question>
                        <Form.DatePicker name={FormFields.birthdate} label="Fødselsdato" />
                    </Question>
                    <Knapp
                        htmlType="button"
                        onClick={() => {
                            setFieldValue(FormFields.birthdate, '2000-10-2');
                        }}>
                        Sett ugyldig dato
                    </Knapp>
                </>
            )}
        </Form.Form>
    );
};

export default TypedFormExample;
