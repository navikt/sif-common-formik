import React from 'react';
import { useIntl } from 'react-intl';
import { FormikDateIntervalPicker, FormikFileInput } from '../../../typed-formik-form';
import FormikTimeInput from '../../../typed-formik-form/components/formik-time-input/FormikTimeInput';
import {
    getTypedFormComponents
} from '../../../typed-formik-form/components/getTypedFormComponents';
import Question from '../../components/question/Question';
import Tiles from '../../components/tiles/Tiles';
import {
    isIntlFieldValidationErrorType, renderIntlFieldValidationError
} from '../../modules/validation/fieldValidationRenderUtils';
import { validateRequiredField } from '../../validation/fieldValidations';
import { FormFields, FormValues } from './types';

interface Props {}

const Form = getTypedFormComponents<FormFields, FormValues>();

const FormWithTypedFormElements: React.FunctionComponent<Props> = () => {
    const intl = useIntl();
    return (
        <Form.Form
            includeValidationSummary={true}
            fieldErrorRenderer={(error) => {
                if (isIntlFieldValidationErrorType(error)) {
                    return renderIntlFieldValidationError(intl, error);
                }
                return error;
            }}>
            <Question>
                <Form.DatePicker name={FormFields.birthdate} label="Fødselsdato" validate={validateRequiredField} />
            </Question>
            <Question>
                <Form.CountrySelect name={FormFields.birthCountry} label="Fødselsland" />
            </Question>
            <Question>
                <Tiles columns={2}>
                    <Form.Input name={FormFields.firstname} label="Fornavn" validate={validateRequiredField} />
                    <Form.Input name={FormFields.lastname} label="Etternavn" validate={validateRequiredField} />
                </Tiles>
            </Question>
            <Question>
                <Form.YesOrNoQuestion legend="Har du barn?" name={FormFields.hasKids} />
            </Question>
            <FormikTimeInput name={FormFields.time} label="Tidspunkt" />
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
            <Question>
                <FormikFileInput
                    name={FormFields.files}
                    label="Vedlegg"
                    acceptedExtensions={'tsx'}
                    onFilesSelect={() => null}
                    feil={true}
                />
            </Question>
        </Form.Form>
    );
};

export default FormWithTypedFormElements;
