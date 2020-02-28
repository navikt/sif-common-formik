import { FormikProps } from 'formik';

export interface ConnectedFormikProps<FormValues> {
    formik: FormikProps<FormValues>;
}
