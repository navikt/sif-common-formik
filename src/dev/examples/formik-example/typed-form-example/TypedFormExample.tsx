import React from 'react';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { FormikDateIntervalPicker, FormikFileInput } from '../../../../typed-formik-form';
import FormikTimeInput from '../../../../typed-formik-form/components/formik-time-input/FormikTimeInput';
import {
    getTypedFormComponents
} from '../../../../typed-formik-form/components/getTypedFormComponents';
import SkjemagruppeQuestion from '../../../../typed-formik-form/components/helpers/skjemagruppe-question/SkjemagruppeQuestion';
import Question from '../../../components/question/Question';
import Tiles from '../../../components/tiles/Tiles';
import {
    isIntlFieldValidationErrorType, renderIntlFieldValidationError
} from '../../../modules/validation/fieldValidationRenderUtils';
import { validateRequiredField, validateRequiredList } from '../../../validation/fieldValidations';
import FerieuttakListAndDialog from '../ferieuttak-example/FerieuttakListAndDialog';
import { FormFields, FormValues } from '../types';

interface Props {}

const Form = getTypedFormComponents<FormFields, FormValues>();

const TypedFormExample: React.FunctionComponent<Props> = () => {
    const intl = useIntl();
    return (
        <Form.Form
            submitButtonLabel="Ok"
            includeValidationSummary={true}
            fieldErrorRenderer={(error) => {
                if (isIntlFieldValidationErrorType(error)) {
                    return renderIntlFieldValidationError(intl, error);
                }
                return error;
            }}>
            <h3>Noen skjemaelementer</h3>
            <Question>
                <Form.DatePicker name={FormFields.birthdate} label="Fødselsdato" validate={validateRequiredField} />
            </Question>
            <Question>
                <Form.CountrySelect name={FormFields.birthCountry} label="Fødselsland" />
            </Question>
            <SkjemagruppeQuestion legend="Dette er legend" info="Hey">
                sdf
            </SkjemagruppeQuestion>
            <Question>
                <Tiles columns={2}>
                    <Form.Input name={FormFields.firstname} label="Fornavn" validate={validateRequiredField} />
                    <Form.Input name={FormFields.lastname} label="Etternavn" validate={validateRequiredField} />
                </Tiles>
            </Question>
            <Question>
                <Form.YesOrNoQuestion legend="Har du barn?" name={FormFields.hasKids} />
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
                        validate: validateRequiredField
                    }}
                    toDatepickerProps={{
                        name: FormFields.daterange_to,
                        label: 'Til',
                        validate: validateRequiredField
                    }}
                />
            </Question>
            <Question>
                <FerieuttakListAndDialog
                    name={FormFields.ferieuttak}
                    labels={{
                        addLabel: 'Legg til',
                        modalTitle: 'Ferieuttak',
                        listTitle: 'Ferieuttak'
                    }}
                    minDate={moment()
                        .subtract(1, 'year')
                        .toDate()}
                    maxDate={moment()
                        .add(1, 'year')
                        .toDate()}
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
        </Form.Form>
    );
};

export default TypedFormExample;
