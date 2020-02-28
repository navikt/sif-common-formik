import React from 'react';
import { Formik, FormikProps } from 'formik';

interface Props<FormValues> {
    initialValues: Partial<FormValues>;
    renderForm: (formik: FormikProps<FormValues>) => React.ReactNode;
    onSubmit: (values: Partial<FormValues>) => void;
}

function FormikWrapper<FormValues>(props: Props<FormValues> & Partial<FormikProps<FormValues>>) {
    const { onSubmit, initialValues, renderForm: renderFormContent, ...restProps } = props;
    return (
        <Formik<Partial<FormValues>> initialValues={initialValues} onSubmit={onSubmit} {...restProps}>
            {(formik: FormikProps<FormValues>) => renderFormContent(formik)}
        </Formik>
    );
}
export default FormikWrapper;
