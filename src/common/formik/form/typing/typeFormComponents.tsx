import React from 'react';
import FormikDatepicker, {
    FormikDatepickerProps
} from '../inputs/formik-datepicker/FormikDatepicker';
import FormikInput, { FormikInputProps } from '../inputs/formik-input/FormikInput';

export function getTypedFormComponents<FieldNames>() {
    return {
        Input: (props: FormikInputProps<FieldNames>) => <FormikInput<FieldNames> {...props} />,
        DatePicker: (props: FormikDatepickerProps<FieldNames>) => <FormikDatepicker<FieldNames> {...props} />
    };
}
