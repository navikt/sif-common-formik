import React from 'react';
import { useIntl } from 'react-intl';
import { FormikProps } from 'formik';
import { getTypedFormComponents } from '../../../common/formik/form/typing/getTypedFormComponents';
import {
    isFieldValidationError, renderFieldValidationError
} from '../../../common/validation/fieldValidationRenderUtils';
import { QuestionVisibilityContext } from '../../../common/visibility/QuestionVisibilityContext';
import QuestionWrapper from '../../../common/visibility/QuestionWrapper';
import VisibilityBlock from '../../../common/visibility/VisibilityBlock';
import Tiles from '../../components/tiles/Tiles';
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
                formik={formik}
                errorRender={(errors) => {
                    if (isFieldValidationError(errors)) {
                        return renderFieldValidationError(intl, errors);
                    } else {
                        return errors;
                    }
                }}>
                <QuestionWrapper fieldName={FormFields.birthdate}>
                    <DatePicker name={FormFields.birthdate} label="Fødselsdato" validate={validateRequiredField} />
                </QuestionWrapper>

                <QuestionWrapper fieldName={FormFields.birthCountry}>
                    <CountrySelect name={FormFields.birthCountry} label="Fødselsland" />
                </QuestionWrapper>

                <VisibilityBlock<FormFields> fieldName={FormFields.firstname}>
                    <Tiles columns={2}>
                        <QuestionWrapper fieldName={FormFields.firstname}>
                            <Input name={FormFields.firstname} label="Fornavn" validate={validateRequiredField} />
                        </QuestionWrapper>
                        <QuestionWrapper fieldName={FormFields.lastname}>
                            <Input name={FormFields.lastname} label="Etternavn" validate={validateRequiredField} />
                        </QuestionWrapper>
                    </Tiles>
                </VisibilityBlock>
            </Form>
        </QuestionVisibilityContext.Provider>
    );
};

export default FormWithConfig;
