import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import { PopoverOrientering } from 'nav-frontend-popover';
import {
    FormikDateIntervalPicker,
    FormikFileInput,
    FormikInput,
    FormikInputGroup,
    ISOStringToDate,
} from '../../../../typed-formik-form';
import FormikDateRangePicker from '../../../../typed-formik-form/components/formik-date-range-picker/FormikDateRangePicker';
import FormikTimeInput from '../../../../typed-formik-form/components/formik-time-input/FormikTimeInput';
import { getTypedFormComponents } from '../../../../typed-formik-form/components/getTypedFormComponents';
import UnansweredQuestionsInfo from '../../../../typed-formik-form/components/helpers/unanswerd-questions-info/UnansweredQuestionsInfo';
import Question from '../../../components/question/Question';
import Tiles from '../../../components/tiles/Tiles';
import {
    isIntlFieldValidationErrorType,
    renderIntlFieldValidationError,
} from '../../../modules/validation/fieldValidationRenderUtils';
import {
    validateRequiredField,
    validateRequiredList,
    validateYesOrNoIsAnswered,
} from '../../../validation/fieldValidations';
import FerieuttakListAndDialog from '../ferieuttak-example/FerieuttakListAndDialog';
import { FormFields, FormValues } from '../types';

const Form = getTypedFormComponents<FormFields, FormValues>();
const fullForm = true;

const TypedFormExample = () => {
    const intl = useIntl();
    const { values } = useFormikContext<FormValues>();
    const { setFieldValue } = useFormikContext<FormValues>();
    return (
        <Form.Form
            submitButtonLabel="Ok"
            includeValidationSummary={true}
            includeButtons={false}
            noButtonsContentRenderer={() => (
                <UnansweredQuestionsInfo>Du har ubesvarte spørsmål</UnansweredQuestionsInfo>
            )}
            fieldErrorRenderer={(error) => {
                if (isIntlFieldValidationErrorType(error)) {
                    return renderIntlFieldValidationError(intl, error);
                }
                return error;
            }}>
            <h3>Noen skjemaelementer</h3>
            {fullForm ? (
                <>
                    <Question>
                        <Form.DatePicker
                            info={'sdfsdf'}
                            name={FormFields.birthdate}
                            label="Fødselsdato"
                            validate={validateRequiredField}
                        />
                    </Question>
                    <Question>
                        <Form.CountrySelect name={FormFields.birthCountry} label="Fødselsland" useAlpha3Code={true} />
                    </Question>
                    <Question>
                        <Form.InputGroup
                            name={FormFields.birthCountry}
                            legend="Dette er legend"
                            info="Hey"
                            validate={validateRequiredField}>
                            <FormikInput name="sdf" label="sdfsdf" />
                            sdf
                        </Form.InputGroup>
                    </Question>
                    <Question>
                        <Tiles columns={2}>
                            <Form.Input name={FormFields.firstname} label="Fornavn" validate={validateRequiredField} />
                            <Form.Input name={FormFields.lastname} label="Etternavn" validate={validateRequiredField} />
                        </Tiles>
                    </Question>
                    <Question>
                        <Form.YesOrNoQuestion
                            legend={'sdfjjsdfj'}
                            info={'sdfsdf'}
                            infoPlassering={PopoverOrientering.Under}
                            name={FormFields.hasKids}
                            validate={validateYesOrNoIsAnswered}
                        />
                    </Question>
                    <Question>
                        <div style={{ display: 'flex', flex: 'flex-start' }}>
                            <FormikTimeInput name={FormFields.time} label="Tidspunkt" />
                        </div>
                    </Question>
                    <FormikInputGroup name={FormFields.nameGroup} legend="Test me" validate={validateRequiredField}>
                        Content in group
                    </FormikInputGroup>
                    <Question>
                        <FormikDateIntervalPicker
                            legend="Tidsrom"
                            fromDatepickerProps={{
                                name: FormFields.daterange_from,
                                label: 'Fra',
                                maxDate: ISOStringToDate(values.daterange_to),
                                validate: validateRequiredField,
                            }}
                            toDatepickerProps={{
                                name: FormFields.daterange_to,
                                label: 'Til',
                                minDate: ISOStringToDate(values.daterange_from),
                                validate: validateRequiredField,
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
                        <FerieuttakListAndDialog
                            name={FormFields.ferieuttak}
                            labels={{
                                addLabel: 'Legg til',
                                modalTitle: 'Ferieuttak',
                                listTitle: 'Ferieuttak',
                            }}
                            minDate={dayjs().subtract(1, 'year').toDate()}
                            maxDate={dayjs().add(1, 'year').toDate()}
                            validate={validateRequiredList}
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
            ) : (
                <>
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
                    <FormikInputGroup name={FormFields.nameGroup} legend="Test me" validate={validateRequiredField}>
                        Content in group
                    </FormikInputGroup>
                </>
            )}
        </Form.Form>
    );
};

export default TypedFormExample;
