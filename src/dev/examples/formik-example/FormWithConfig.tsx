import React from 'react';
import { useIntl } from 'react-intl';
import { FormikProps } from 'formik';
import {
    getTypedFormComponents
} from '../../../typed-formik-form/components/getTypedFormComponents';
import Tiles from '../../components/tiles/Tiles';
import {
    isFieldValidationError, renderFieldValidationError
} from '../../modules/validation/fieldValidationRenderUtils';
import ConditionalQuestion from '../../modules/visibility/ConditionalQuestion';
import { QuestionVisibilityContext } from '../../modules/visibility/QuestionVisibilityContext';
import VisibilityBlock from '../../modules/visibility/VisibilityBlock';
import { validateRequiredField } from '../../validation/fieldValidations';
import { exampleFormQuestions } from './config';
import { FormFields, FormValues } from './types';

interface Props {
    formik: FormikProps<FormValues>;
}

const { Input, DatePicker, CountrySelect, Form } = getTypedFormComponents<FormFields, FormValues>();

const FormWithConfig: React.FunctionComponent<Props> = ({ formik }) => {
    const intl = useIntl();
    return (
        <QuestionVisibilityContext.Provider value={{ visibility: exampleFormQuestions.getVisbility(formik.values) }}>
            <Form
                fieldErrorRender={(errors) => {
                    if (isFieldValidationError(errors)) {
                        return renderFieldValidationError(intl, errors);
                    } else {
                        return true;
                    }
                }}>
                <ConditionalQuestion forField={FormFields.birthdate}>
                    <DatePicker name={FormFields.birthdate} label="Fødselsdato" validate={validateRequiredField} />
                </ConditionalQuestion>

                <ConditionalQuestion forField={FormFields.birthCountry}>
                    <CountrySelect name={FormFields.birthCountry} label="Fødselsland" />
                </ConditionalQuestion>

                <VisibilityBlock<FormFields> fieldName={FormFields.firstname}>
                    <Tiles columns={2}>
                        <ConditionalQuestion forField={FormFields.firstname}>
                            <Input name={FormFields.firstname} label="Fornavn" validate={validateRequiredField} />
                        </ConditionalQuestion>
                        <ConditionalQuestion forField={FormFields.lastname}>
                            <Input name={FormFields.lastname} label="Etternavn" validate={validateRequiredField} />
                        </ConditionalQuestion>
                    </Tiles>
                </VisibilityBlock>
            </Form>
        </QuestionVisibilityContext.Provider>
    );
};

export default FormWithConfig;
