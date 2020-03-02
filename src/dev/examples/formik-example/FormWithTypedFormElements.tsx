import React from 'react';
import { FormikDateIntervalPicker } from '../../../typed-formik-form';
import FormikTimeInput from '../../../typed-formik-form/components/formik-time-input/FormikTimeInput';
import {
    getTypedFormComponents
} from '../../../typed-formik-form/components/getTypedFormComponents';
import Question from '../../components/question/Question';
import Tiles from '../../components/tiles/Tiles';
import { IntlFieldValidationError } from '../../modules/validation/types';
import { validateRequiredField } from '../../validation/fieldValidations';
import { FormFields, FormValues } from './types';

interface Props {}

const Form = getTypedFormComponents<FormFields, FormValues, IntlFieldValidationError>();

const FormWithTypedFormElements: React.FunctionComponent<Props> = () => {
    return (
        <Form.Form
            includeValidationSummary={true}
            fieldErrorRender={(error) => {
                return error.key;
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
        </Form.Form>
    );
};

export default FormWithTypedFormElements;
