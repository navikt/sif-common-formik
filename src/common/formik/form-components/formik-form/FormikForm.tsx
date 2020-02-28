import React, { createContext, useEffect, useState } from 'react';
import { FieldInputProps, FormikErrors, FormikProps, useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import ButtonRow from '../../components/button-row/ButtonRow';
import ValidationSummary from '../../components/validation-summary/ValidationSummary';
import {
    getErrorsForField, getValidationSummaryErrors, isValidationErrorsVisible
} from '../../utils/formikErrorUtils';

export type FormikErrorRender<FormValues, ErrorFormat = {}> = (
    error: ErrorFormat | FormikErrors<FormValues>
) => React.ReactNode | string;

export interface FormikFormProps<FormValues, ErrorFormat = FormikErrors<FormValues>> {
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
    children,
    onCancel,
    resetFormOnCancel,
    className,
    includeValidationSummary,
    labels,
    errorRender,
    includeButtons = true
}: FormikFormProps<FormValues, ErrorFormat>) {
    const formik = useFormikContext<FormValues>();
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

    const createFormikFormContext = () => {
        const showErrors = isValidationErrorsVisible(formik);
        return {
            errorRender,
            showErrors,
            renderFieldError: (field, form) => {
                if (showErrors) {
                    const errors = getErrorsForField(field.name, form.errors);
                    if (errors) {
                        return errorRender ? errorRender(errors) : true;
                    }
                }
                return undefined;
            }
        };
    };

    return (
        <form onSubmit={onSubmit} noValidate={true} className={className}>
            <FormikFormContext.Provider value={createFormikFormContext()}>
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
