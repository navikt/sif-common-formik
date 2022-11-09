import React, { RefObject } from 'react';
import { useFormikContext } from 'formik';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { getAllFieldsWithErrors, getErrorForField } from '../../utils/typedFormErrorUtils';
import ValidationSummary from '../helpers/ValidationSummary';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

function FormikValidationErrorSummary({ summaryRef }: { summaryRef?: RefObject<HTMLDivElement> }) {
    const context = React.useContext(TypedFormikFormContext);
    const formik = useFormikContext();

    if (formik && context && context.showErrors) {
        const fieldsWithErrors =
            !formik.isValid && getAllFieldsWithErrors(formik.errors, context.isHandledErrorTypeChecker);
        const errorMessages: FeiloppsummeringFeil[] | undefined = fieldsWithErrors
            ? fieldsWithErrors.map((fieldName) => {
                  const error = getErrorForField(fieldName, formik.errors);
                  const feil: FeiloppsummeringFeil = {
                      feilmelding: context.fieldErrorHandler ? context.fieldErrorHandler(error, fieldName) : error,
                      skjemaelementId: fieldName,
                  };
                  return feil;
              })
            : undefined;

        if (errorMessages) {
            return <ValidationSummary errorMessages={errorMessages} summaryRef={summaryRef} />;
        }
    }

    return null;
}

export default FormikValidationErrorSummary;
