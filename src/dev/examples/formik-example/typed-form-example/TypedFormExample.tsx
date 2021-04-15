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
import Question from '../../../components/question/Question';
import Tiles from '../../../components/tiles/Tiles';
import FerieuttakListAndDialog from '../ferieuttak-example/FerieuttakListAndDialog';
import FerieuttakInfoAndDialog from '../ferieuttakinfo-and-form-example-/FerieuttakInfoAndDialog';
import { FormFields, FormValues } from '../types';
import validateRequiredValue from '../../../../typed-formik-form/validation/validateRequiredValue';
import validateYesOrNoIsAnswered from '../../../../typed-formik-form/validation/validateYesOrNo';
import validateAll from '../../../../typed-formik-form/validation/utils/validateAll';

const Form = getTypedFormComponents<FormFields, FormValues>();

const TypedFormExample = () => {
    const { values } = useFormikContext<FormValues>();
    const { setFieldValue } = useFormikContext<FormValues>();

    const localValidateRequired = (fieldTitle: string) => (value: any) => {
        const error = validateRequiredValue(value);
        if (error) {
            return `${fieldTitle} mangler verdi`;
        }
        return undefined;
    };
    const localValidateYesOrNo = (fieldTitle) => (value) => {
        const error = validateYesOrNoIsAnswered(value);
        if (error) {
            return `Du må svare på ${fieldTitle}`;
        }
    };

    return (
        <Form.Form
            submitButtonLabel="Ok"
            includeValidationSummary={true}
            includeButtons={true}
            noButtonsContentRenderer={() => (
                <UnansweredQuestionsInfo>Du har ubesvarte spørsmål</UnansweredQuestionsInfo>
            )}>
            <h3>Noen skjemaelementer</h3>
            {1 + 1 == 2 && (
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
                        <FormikInput
                            type="text"
                            label="En tekst"
                            name={'number'}
                            validate={(value) => {
                                const error = validateAll([
                                    () => localValidateRequired('abc')(value),
                                    () => {
                                        const error = validateRequiredValue(value);
                                        return error ? 'Feltet x må ha verdi' : undefined;
                                    },
                                ]);
                                return error;
                            }}
                        />
                    </Question>
                    <Question>
                        <Form.YesOrNoQuestion
                            legend={'sdfjjsdfj'}
                            name={FormFields.hasKids}
                            validate={localValidateYesOrNo('abc')}
                        />
                    </Question>
                </>
            )}
            {1 + 1 === 3 && (
                <>
                    <Question>
                        <FerieuttakInfoAndDialog
                            name={'sfd'}
                            labels={{
                                addLabel: 'Legg til',
                                editLabel: 'Endre',
                                deleteLabel: 'Fjern',
                                modalTitle: 'Ferieuttak',
                                infoTitle: 'Ferieuttak',
                            }}
                            minDate={dayjs().subtract(1, 'year').toDate()}
                            maxDate={dayjs().add(1, 'year').toDate()}
                        />
                    </Question>
                    <Question>
                        <Form.DatePicker
                            name={FormFields.birthdate}
                            label="Fødselsdato"
                            validate={localValidateRequired('Feltet')}
                        />
                    </Question>
                    <Question>
                        <Form.CountrySelect name={FormFields.birthCountry} label="Fødselsland" useAlpha3Code={true} />
                    </Question>
                    <Question>
                        <Form.InputGroup
                            name={FormFields.birthCountry}
                            legend="Dette er legend"
                            validate={localValidateRequired('Feltet')}>
                            <FormikInput name="sdf" label="sdfsdf" />
                            sdf
                        </Form.InputGroup>
                    </Question>
                    <Question>
                        <Tiles columns={2}>
                            <Form.Input
                                name={FormFields.firstname}
                                label="Fornavn"
                                validate={localValidateRequired('Feltet')}
                            />
                            <Form.Input
                                name={FormFields.lastname}
                                label="Etternavn"
                                validate={localValidateRequired('Feltet')}
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
                                validate: localValidateRequired('Fra dato'),
                            }}
                            toDatepickerProps={{
                                name: FormFields.daterange_to,
                                label: 'Til',
                                minDate: ISOStringToDate(values.daterange_from),
                                validate: localValidateRequired('Til dato'),
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
                            validate={localValidateRequired('Feltet')}
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
                            validate={localValidateRequired('Feltet')}
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
