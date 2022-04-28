import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import { Undertittel } from 'nav-frontend-typografi';
import {
    FormikDateIntervalPicker,
    FormikFileInput,
    FormikTimeInput,
    ISOStringToDate,
} from '../../../../typed-formik-form';
import FormikDateRangePicker from '../../../../typed-formik-form/components/formik-date-range-picker/FormikDateRangePicker';
import { getTypedFormComponents } from '../../../../typed-formik-form/components/getTypedFormComponents';
import {
    getDateValidator,
    getFødselsnummerValidator,
    getNumberValidator,
    getStringValidator,
    getYesOrNoValidator,
    ValidateFødselsnummerError,
    ValidateNumberError,
} from '../../../../typed-formik-form/validation';
import getRequiredFieldValidator from '../../../../typed-formik-form/validation/getRequiredFieldValidator';
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
    const minDate = dayjs().subtract(2, 'days').toDate();
    const maxDate = dayjs().add(1, 'month').toDate();

    return (
        <Form.Form
            submitButtonLabel="Ok"
            includeValidationSummary={true}
            includeButtons={true}
            formErrorHandler={getIntlFormErrorHandler(intl)}>
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
                <FormikTimeInput
                    name={FormFields.ferieuttak}
                    label="Hvor mye tid"
                    description={<>whao</>}
                    data-testkey="time-input-key"
                />
            </Question>
            <Form.CheckboxGroup
                name={'cbGruppe' as any}
                checkboxes={[
                    {
                        label: 'En',
                        value: '1',
                        'data-testkey': 'cb1',
                    },
                    {
                        label: 'To',
                        value: '2',
                        'data-testkey': 'cb2',
                    },
                    {
                        label: 'Tre',
                        value: '3',
                        'data-testkey': 'cb3',
                    },
                ]}
            />
            <Form.Checkbox name={'checkGruppe' as any} label="a" value="a" data-testkey="cbg_a" />
            <Form.Checkbox name={'checkGruppe' as any} label="b" value="b" />
            <Form.Checkbox name={'checkGruppe' as any} label="c" value="c" />
            <br />
            <br /> <Form.Checkbox name={'lala' as any} label="bool" />
            {1 + 1 === 2 && (
                <>
                    <Question>
                        <Form.TimeInput label="Tid" name={'a' as any} data-testkey="timeinput-2" />
                        <Form.YesOrNoQuestion
                            legend={'Har du kids'}
                            name={FormFields.hasKids}
                            data-testkey="har_kids"
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
                    </Question>{' '}
                    <Question>
                        <FormikDateRangePicker
                            legend="DateRangePicker"
                            disableWeekend={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            data-what="fdrp"
                            fromInputProps={{
                                name: FormFields.daterange_from,
                                label: 'Fra',
                                'data-testkey': 'from',
                            }}
                            toInputProps={{
                                name: FormFields.daterange_to,
                                label: 'Til',
                                'data-testkey': 'to',
                            }}
                        />
                    </Question>
                    <Question>
                        <Form.Input
                            name={FormFields.fødselsnummer}
                            label="Fødselsnummer"
                            data-testkey="fnr-key"
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
                        <Form.DatePicker
                            name={FormFields.birthdate}
                            label="Fødselsdato"
                            validate={getDateValidator({ required: true })}
                            data-testkey="datepicker-fdato"
                            minDate={dayjs().subtract(12, 'days').toDate()}
                            disabledDaysOfWeek={[1, 2, 4]}
                        />
                        {1 + 1 === 3 && (
                            <Knapp
                                htmlType="button"
                                onClick={() => {
                                    setFieldValue(FormFields.birthdate, '2000-10-2');
                                }}>
                                Sett ugyldig dato
                            </Knapp>
                        )}
                    </Question>
                    <Question>
                        <Form.CountrySelect
                            name={FormFields.birthCountry}
                            label="Fødselsland"
                            useAlpha3Code={true}
                            validate={getRequiredFieldValidator()}
                        />
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
                        <FormikDateIntervalPicker
                            legend="DateIntervalPicker (test)"
                            fromDatepickerProps={{
                                name: FormFields.dateinterval_from,
                                label: 'Fra',
                                minDate,
                                maxDate: ISOStringToDate(values.dateinterval_to),
                                validate: getRequiredFieldValidator(),
                            }}
                            toDatepickerProps={{
                                name: FormFields.dateinterval_to,
                                label: 'Til',
                                minDate: ISOStringToDate(values.dateinterval_from) || minDate,
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
                            name={FormFields.tilsynstimer}
                            suffixStyle="text"
                            suffix="Timer"
                            bredde="S"
                            data-testkey="input-test"
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
                        <Form.RadioPanelGroup
                            name={FormFields.hvilketBarnGjelderDet}
                            afterOnChange={(value) => {
                                console.log(value);
                            }}
                            radios={[
                                { label: 'Barn 1', value: '1', 'data-testkey': 'barn-1' },
                                { label: 'Barn 2', value: '2' },
                                { label: 'Barn 3', value: '3' },
                                { label: 'Barn 4', value: '4' },
                                { label: 'Barn 5', value: '5' },
                                { label: 'Barn 6', value: '6' },
                                { label: 'Barn 7', value: '7' },
                            ]}
                            legend="Eksempel på en radio panel gruppe med flere enn to alternativer med useTwoColumns={true}"
                            useTwoColumns={true}
                        />
                    </Question>
                </>
            )}
        </Form.Form>
    );
};

export default TypedFormExample;
