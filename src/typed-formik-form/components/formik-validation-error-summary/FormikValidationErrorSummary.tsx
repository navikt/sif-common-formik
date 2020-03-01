import * as React from 'react';
import { connect, FormikProps } from 'formik';
import { getAllErrors } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import ValidationSummary from '../validation-summary/ValidationSummary';

interface Props<FormValues> {
    formik: FormikProps<FormValues>;
}

function FormikValidationErrorSummary<FormValues>({ formik }: Props<FormValues>) {
    const context = React.useContext(TypedFormikFormContext);
    if (formik === undefined) {
        return null;
    }
    const errorMessages = getAllErrors(formik, context ? context.errorRender : undefined);
    if (errorMessages) {
        return <ValidationSummary errorMessages={errorMessages} />;
    }

    return null;
}

export default connect<any>(FormikValidationErrorSummary);
