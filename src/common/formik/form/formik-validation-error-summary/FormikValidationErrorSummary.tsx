import * as React from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'formik';
import ValidationSummary from '../../components/validation-summary/ValidationSummary';
import { ConnectedFormikProps } from '../../types/ConnectedFormikProps';
import { getValidationSummaryErrors } from '../../utils/formikErrorUtils';

type Props<FormValues> = ConnectedFormikProps<FormValues>;

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
