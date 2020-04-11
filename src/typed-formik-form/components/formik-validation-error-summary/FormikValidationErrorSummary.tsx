import React from 'react';
import { useFormikContext } from 'formik';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { getAllErrors } from '../../utils/typedFormErrorUtils';
import ValidationSummary from '../helpers/ValidationSummary';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';

function FormikValidationErrorSummary() {
    const context = React.useContext(TypedFormikFormContext);
    const formik = useFormikContext();
    if (formik && context && context.showErrors) {
        const allErrors = !formik.isValid && getAllErrors(formik);
        const errorMessages: FeiloppsummeringFeil[] | undefined = allErrors
            ? Object.keys(allErrors).map((key) => {
                  const error = allErrors[key];
                  const feil: FeiloppsummeringFeil = {
                      feilmelding: context.fieldErrorRenderer ? context.fieldErrorRenderer(error) : error,
                      skjemaelementId: key,
                  };
                  return feil;
              })
            : undefined;

        if (errorMessages) {
            return <ValidationSummary errorMessages={errorMessages} />;
        }
    }

    return null;
}

export default FormikValidationErrorSummary;
