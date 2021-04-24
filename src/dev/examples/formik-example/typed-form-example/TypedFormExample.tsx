import React from 'react';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import {
    FormikDateIntervalPicker,
    FormikFileInput,
    FormikInput,
    FormikNumberInput,
    ISOStringToDate,
} from '../../../../typed-formik-form';
import FormikDateRangePicker from '../../../../typed-formik-form/components/formik-date-range-picker/FormikDateRangePicker';
import FormikTimeInput from '../../../../typed-formik-form/components/formik-time-input/FormikTimeInput';
import { getTypedFormComponents } from '../../../../typed-formik-form/components/getTypedFormComponents';
import UnansweredQuestionsInfo from '../../../../typed-formik-form/components/helpers/unanswerd-questions-info/UnansweredQuestionsInfo';
import {
    getListValidator,
    // getStringValidator,
    getYesOrNoValidator,
    ValidateListError,
    // ValidateStringError,
} from '../../../../typed-formik-form/validation';
import getRequiredFieldValidator from '../../../../typed-formik-form/validation/getRequiredFieldValidator';
import Question from '../../../components/question/Question';
import Tiles from '../../../components/tiles/Tiles';
import FerieuttakListAndDialog from '../ferieuttak-example/FerieuttakListAndDialog';
import { FormFields, FormValues } from '../types';
import { useIntl } from 'react-intl';
import { ValidationError } from '../../../../typed-formik-form/validation/types';
import getFieldErrorHandler from '../../../../typed-formik-form/validation/fieldErrorHandler';
import Friends from './Friends';

const Form = getTypedFormComponents<FormFields, FormValues, ValidationError>();

const TypedFormExample = () => {
    const { values } = useFormikContext<FormValues>();
    const { setFieldValue } = useFormikContext<FormValues>();
    const intl = useIntl();
    return (
        <Form.Form
            submitButtonLabel="Ok"
            includeValidationSummary={true}
            includeButtons={true}
            fieldErrorHandler={getFieldErrorHandler(intl)}
            noButtonsContentRenderer={() => (
                <UnansweredQuestionsInfo>Du har ubesvarte spørsmål</UnansweredQuestionsInfo>
            )}>
            <h3>Noen skjemaelementer</h3>
            {1 + 1 == 2 && (
                <>
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
                                    };
                                }
                            }}
                        />
                    </Question>
                    <Friends fieldName="friends" friends={values.friends || []} />
                </>
            )}
            {1 + 1 === 3 && (
                <>
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
                        <Form.Input
                            type="text"
                            label="Fornavn"
                            name={FormFields.firstname}
                            validate={getRequiredFieldValidator()}
                        />
                    </Question>
                    <Question>
                        <Form.Input
                            name={FormFields.fødselsnummer}
                            label="Fødselsnummer"
                            // validate={getFødselsnummerValidator(
                            //     { required: true },
                            //     { fødselsnummerNot11Chars: () => 'whooooo' }
                            // )}
                        />
                    </Question>
                    <Question>
                        <Form.YesOrNoQuestion
                            legend={'Har du kids'}
                            name={FormFields.hasKids}
                            validate={getYesOrNoValidator()}
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
                            validate={getRequiredFieldValidator()}
                        />
                    </Question>
                    <Question>
                        <Form.CountrySelect name={FormFields.birthCountry} label="Fødselsland" useAlpha3Code={true} />
                    </Question>
                    <Question>
                        <Form.InputGroup
                            name={FormFields.birthCountry}
                            legend="Dette er legend"
                            validate={getRequiredFieldValidator()}>
                            <FormikInput name="sdf" label="sdfsdf" />
                            sdf
                        </Form.InputGroup>
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
                            legend="Tidsrom"
                            fromDatepickerProps={{
                                name: FormFields.daterange_from,
                                label: 'Fra',
                                maxDate: ISOStringToDate(values.daterange_to),
                                validate: getRequiredFieldValidator(),
                            }}
                            toDatepickerProps={{
                                name: FormFields.daterange_to,
                                label: 'Til',
                                minDate: ISOStringToDate(values.daterange_from),
                                validate: getRequiredFieldValidator(),
                            }}
                        />
                    </Question>
                    <Question>
                        <FormikDateRangePicker
                            legend="Tidsrom - kopi"
                            disableWeekend={true}
                            minDate={dayjs().subtract(4, 'month').toDate()}
                            maxDate={dayjs().add(4, 'month').toDate()}
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
                        <FormikFileInput
                            name={FormFields.files}
                            label="Legg til filer"
                            acceptedExtensions={'tsx'}
                            onFilesSelect={() => null}
                        />
                    </Question>
                </>
            )}
            {1 + 1 === 3 && (
                <>
                    <Question>
                        <FormikNumberInput
                            label="Oppgi hvor mange timer i snitt per uke, har barnet tilsyn?"
                            name={FormFields.firstname}
                            suffixStyle="text"
                            suffix="Timer"
                            bredde="S"
                            maxLength={5}
                            validate={getRequiredFieldValidator()}
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
