import * as React from 'react';
import { connect, FormikProps } from 'formik';
import ValidationSummary from '../../components/validation-summary/ValidationSummary';
import { getValidationSummaryErrors } from '../../utils/formikErrorUtils';

interface Props<FormValues> {
    formik: FormikProps<FormValues>;
}

function FormikValidationErrorSummary<FormValues>({ formik }: Props<FormValues>) {
    if (formik === undefined) {
        return null;
    }
    const errorMessages = getValidationSummaryErrors(formik);
    if (errorMessages) {
        return <ValidationSummary errorMessages={errorMessages} />;
    }

    return null;
}

export default connect<any>(FormikValidationErrorSummary);
