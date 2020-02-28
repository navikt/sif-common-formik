import React from 'react';
import { FormikErrors } from 'formik';
import FormikForm, { FormikFormProps } from './formik-form/FormikForm';
import FormikCountrySelect, {
    FormikCountrySelectProps
} from './inputs/formik-country-select/FormikCountrySelect';
import FormikDatepicker, {
    FormikDatepickerProps
} from './inputs/formik-datepicker/FormikDatepicker';
import FormikInput, { FormikInputProps } from './inputs/formik-input/FormikInput';

export function getTypedFormComponents<FieldNames, FormValues, FieldValidationError = FormikErrors<FormValues>>() {
    return {
        Form: (props: FormikFormProps<FormValues, FieldValidationError>) => <FormikForm {...props} />,
        Input: (props: FormikInputProps<FieldNames>) => <FormikInput<FieldNames> {...props} />,
        DatePicker: (props: FormikDatepickerProps<FieldNames>) => <FormikDatepicker<FieldNames> {...props} />,
        CountrySelect: (props: FormikCountrySelectProps<FieldNames>) => <FormikCountrySelect<FieldNames> {...props} />
    };
}
