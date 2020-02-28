import React from 'react';
import { useIntl } from 'react-intl';
import { FormikProps } from 'formik';
import FormikForm from '../../../common/formik/form/formik-form/FormikForm';
import FormikDatepicker from '../../../common/formik/form/inputs/formik-datepicker/FormikDatepicker';
import FormikInput from '../../../common/formik/form/inputs/formik-input/FormikInput';
import { getTypedFormComponents } from '../../../common/formik/form/typing/typeFormComponents';
import {
    QuestionVisibilityContext
} from '../../../common/formik/form/visibility/QuestionVisibilityContext';
import QuestionWrapper from '../../../common/formik/form/visibility/QuestionWrapper';
import VisibilityBlock from '../../../common/formik/form/visibility/VisibilityBlock';
import {
    isFieldValidationError, renderFieldValidationError
} from '../../../common/formik/validation/fieldValidationRenderUtils';
import { FieldValidationError } from '../../../common/formik/validation/types';
import Tiles from '../../components/tiles/Tiles';
import { validateRequiredField } from '../../validation/fieldValidations';
import { exampleFormQuestions } from './config';
import { FormFields, FormValues } from './types';

interface Props {
    formik: FormikProps<FormValues>;
}

const { Input } = getTypedFormComponents<FormFields>();

const FormWithConfig: React.FunctionComponent<Props> = ({ formik }) => {
    const intl = useIntl();
    return (
        <QuestionVisibilityContext.Provider value={{ visibility: exampleFormQuestions.getVisbility(formik.values) }}>
            <FormikForm<FormValues, FieldValidationError>
                formik={formik}
                errorRender={(errors) => {
                    if (isFieldValidationError(errors)) {
                        return renderFieldValidationError(intl, errors);
                    } else {
                        return errors;
                    }
                }}>
                <QuestionWrapper fieldName={FormFields.birthdate}>
                    <FormikDatepicker<FormFields>
                        name={FormFields.birthdate}
                        label="Fødselsdato"
                        validate={validateRequiredField}
                    />
                </QuestionWrapper>

                <VisibilityBlock<FormFields> fieldName={FormFields.firstname}>
                    <Tiles columns={2}>
                        <QuestionWrapper fieldName={FormFields.firstname}>
                            <Input name={FormFields.firstname} label="Fornavn" validate={validateRequiredField} />
                        </QuestionWrapper>
                        <QuestionWrapper fieldName={FormFields.lastname}>
                            <FormikInput<FormFields>
                                name={FormFields.lastname}
                                label="Etternavn"
                                validate={validateRequiredField}
                            />
                        </QuestionWrapper>
                    </Tiles>
                </VisibilityBlock>
            </FormikForm>
        </QuestionVisibilityContext.Provider>
    );
};

export default FormWithConfig;
