import * as React from 'react';
import { useIntl } from 'react-intl';
import { connect, FormikProps } from 'formik';
import { getValidationSummaryErrors } from '../../../validation/formikErrorUtils';
import ValidationSummary from '../../components/validation-summary/ValidationSummary';

interface Props<FormValues> {
    formik: FormikProps<FormValues>;
}

function FormikValidationErrorSummary<FormValues>({ formik }: Props<FormValues>) {
    const intl = useIntl();
    if (formik === undefined) {
        return null;
    }
    const errorMessages = getValidationSummaryErrors(formik, intl);
    if (errorMessages) {
        return <ValidationSummary errorMessages={errorMessages} />;
    }

    return null;
}

export default connect<any>(FormikValidationErrorSummary);
