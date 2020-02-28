import React from 'react';
import { useIntl } from 'react-intl';
import {
    getTypedFormComponents
} from '../../../common/formik/form-components/getTypedFormComponents';
import Question from '../../components/question/Question';
import Tiles from '../../components/tiles/Tiles';
import {
    isFieldValidationError, renderFieldValidationError
} from '../../modules/validation/fieldValidationRenderUtils';
import { validateRequiredField } from '../../validation/fieldValidations';
import { FormFields, FormValues } from './types';

interface Props {}

const { Input, DatePicker, CountrySelect, Form } = getTypedFormComponents<FormFields, FormValues>();

const FormWithTypedFormElements: React.FunctionComponent<Props> = () => {
    const intl = useIntl();
    return (
        <Form
            fieldErrorRender={(errors) => {
                if (isFieldValidationError(errors)) {
                    return renderFieldValidationError(intl, errors);
                } else {
                    return errors;
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
        </Form>
    );
};

export default FormWithTypedFormElements;
