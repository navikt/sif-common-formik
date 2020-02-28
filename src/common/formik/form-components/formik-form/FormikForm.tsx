import React, { createContext, useEffect, useState } from 'react';
import { FieldInputProps, FormikErrors, FormikProps } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import ButtonRow from '../../components/button-row/ButtonRow';
import ValidationSummary from '../../components/validation-summary/ValidationSummary';
import {
    getFieldValidationErrors, getValidationSummaryErrors, isValidationErrorsVisible
} from '../../utils/formikErrorUtils';

export type FormikErrorRender<FormValues, ErrorFormat = {}> = (
    error: ErrorFormat | FormikErrors<FormValues>
) => React.ReactNode | string;

export interface FormikFormProps<FormValues, ErrorFormat = FormikErrors<FormValues>> {
    formik: FormikProps<FormValues>;
    children: React.ReactNode;
    className?: string;
    includeValidationSummary?: boolean;
    includeButtons?: boolean;
    errorRender?: FormikErrorRender<FormValues, ErrorFormat>;
    resetFormOnCancel?: boolean;
    labels?: {
        submitButton?: string;
        cancelButton?: string;
    };
    onCancel?: () => void;
}

interface FormikFormContextType {
    errorRender?: FormikErrorRender<any>;
    showErrors: boolean;
    renderFieldError: (
        field: FieldInputProps<any>,
        form: FormikProps<any>,
        context?: FormikFormContextType
    ) => React.ReactNode | boolean | undefined;
}

export const FormikFormContext = createContext<FormikFormContextType | undefined>(undefined);

function FormikForm<FormValues, ErrorFormat = FormikErrors<FormValues>>({
    formik,
    children,
    onCancel,
    resetFormOnCancel,
    className,
    includeValidationSummary,
    labels,
    errorRender,
    includeButtons = true
}: FormikFormProps<FormValues, ErrorFormat>) {
    const { handleSubmit, submitCount, setStatus, resetForm } = formik;
    const [formSubmitCount] = useState(submitCount);

    useEffect(() => {
        if (submitCount > formSubmitCount) {
            setStatus({ showErrors: true });
        } else {
            setStatus({ showErrors: false });
        }
    }, [submitCount, setStatus, formSubmitCount]);

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(evt);
    };

    const errorMessages = includeValidationSummary ? getValidationSummaryErrors(formik) : undefined;

    return (
        <form onSubmit={onSubmit} noValidate={true} className={className}>
            <FormikFormContext.Provider
                value={{
                    errorRender,
                    showErrors: isValidationErrorsVisible(formik),
                    renderFieldError: (field, form, context) => {
                        if (context && context.showErrors) {
                            const errors = getFieldValidationErrors(field.name, form.errors);
                            if (errors) {
                                return context.errorRender ? context.errorRender(errors) : true;
                            }
                        }
                        return undefined;
                    }
                }}>
                {children}
                {errorMessages && (
                    <div style={{ marginTop: '2rem' }}>
                        <ValidationSummary errorMessages={errorMessages} />
                    </div>
                )}
                {includeButtons && (
                    <div style={{ marginTop: '2rem' }}>
                        <ButtonRow layout="stretch">
                            <Knapp type="hoved" htmlType="submit">
                                {labels?.submitButton || 'Submit'}
                            </Knapp>
                            {onCancel && (
                                <Knapp
                                    type="flat"
                                    htmlType="button"
                                    onClick={() => {
                                        if (resetFormOnCancel) {
                                            resetForm();
                                        }
                                        onCancel();
                                    }}>
                                    {labels?.cancelButton || 'Avbryt'}
                                </Knapp>
                            )}
                        </ButtonRow>
                    </div>
                )}
            </FormikFormContext.Provider>
        </form>
    );
}

export default FormikForm;
