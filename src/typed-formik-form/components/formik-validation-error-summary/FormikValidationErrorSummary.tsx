import * as React from 'react';
import { useFormikContext } from 'formik';
import { getAllErrors } from '../../utils/typedFormErrorUtils';
import ValidationSummary from '../helpers/ValidationSummary';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

function FormikValidationErrorSummary<FormValues>() {
    const context = React.useContext(TypedFormikFormContext);
    const formik = useFormikContext();
    if (formik && context && context.showErrors) {
        const errorMessages = !formik.isValid && getAllErrors(formik, context ? context.fieldErrorRender : undefined);
        if (errorMessages) {
            return <ValidationSummary errorMessages={errorMessages} />;
        }
    }

    return null;
}

export default FormikValidationErrorSummary;
