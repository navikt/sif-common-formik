import React from 'react';
import { FormikDateIntervalPicker } from '../../../typed-formik-form';
import FormikTimeInput from '../../../typed-formik-form/components/formik-time-input/FormikTimeInput';
import {
    getTypedFormComponents
} from '../../../typed-formik-form/components/getTypedFormComponents';
import Question from '../../components/question/Question';
import Tiles from '../../components/tiles/Tiles';
import { isFieldValidationError } from '../../modules/validation/fieldValidationRenderUtils';
import { validateRequiredField } from '../../validation/fieldValidations';
import { FormFields, FormValues } from './types';

interface Props {}

const { Input, DatePicker, CountrySelect, Form, YesOrNoQuestion } = getTypedFormComponents<FormFields, FormValues>();

const FormWithTypedFormElements: React.FunctionComponent<Props> = () => {
    return (
        <Form
            includeValidationSummary={true}
            fieldErrorRender={(error) => {
                if (isFieldValidationError(error)) {
                    return error.key;
                    // return renderFieldValidationError(intl, error);
                } else {
                    return error;
                }
            }}>
            <Question>
                <DatePicker name={FormFields.birthdate} label="Fødselsdato" validate={validateRequiredField} />
            </Question>
            <Question>
                <CountrySelect name={FormFields.birthCountry} label="Fødselsland" />
            </Question>
            <Question>
                <Tiles columns={2}>
                    <Input name={FormFields.firstname} label="Fornavn" validate={validateRequiredField} />
                    <Input name={FormFields.lastname} label="Etternavn" validate={validateRequiredField} />
                </Tiles>
            </Question>
            <Question>
                <YesOrNoQuestion legend="Har du barn?" name={FormFields.hasKids} />
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
        </Form>
    );
};

export default FormWithTypedFormElements;
