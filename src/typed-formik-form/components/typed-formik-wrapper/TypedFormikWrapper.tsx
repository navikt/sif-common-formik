import React from 'react';
import { Formik, FormikProps, FormikConfig, FormikHelpers } from 'formik';

export interface TypedFormikWrapperProps<FormValues> extends Omit<Partial<FormikProps<FormValues>>, 'initialValues'> {
    initialValues: Partial<FormValues>;
    renderForm: (formik: FormikProps<FormValues>) => React.ReactNode;
    onSubmit: (values: Partial<FormValues>, helpers: FormikHelpers<Partial<FormValues>>) => void;
}

type Props<FormValues> = TypedFormikWrapperProps<FormValues> & FormikConfig<Partial<FormValues>>;

function TypedFormikWrapper<FormValues>(props: Props<FormValues>) {
    const { onSubmit, initialValues, renderForm: renderFormContent, ...restProps } = props;
    return (
        <Formik<Partial<FormValues>>
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
                formikHelpers.setSubmitting(false);
                formikHelpers.setTouched({});
                setTimeout(() => {
                    onSubmit(values, formikHelpers);
                });
            }}
            {...restProps}>
            {(formik: FormikProps<FormValues>) => renderFormContent(formik)}
        </Formik>
    );
}
export default TypedFormikWrapper;
