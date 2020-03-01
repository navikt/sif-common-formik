import React, { createContext, useEffect, useState } from 'react';
import { FieldInputProps, FormikErrors, FormikProps, useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import {
    getAllErrors, getErrorsForField, isValidationErrorsVisible
} from '../../utils/typedFormErrorUtils';
import ButtonRow from '../button-row/ButtonRow';
import ValidationSummary from '../validation-summary/ValidationSummary';

export type FormikErrorRender<FormValues> = (error: FormikErrors<FormValues>) => React.ReactNode | string;

export interface TypedFormikFormProps<FormValues> {
    children: React.ReactNode;
    className?: string;
    includeValidationSummary?: boolean;
    includeButtons?: boolean;
    fieldErrorRender?: FormikErrorRender<FormValues>;
    resetFormOnCancel?: boolean;
    labels?: {
        submitButton?: string;
        cancelButton?: string;
    };
    onCancel?: () => void;
}

interface TypedFormikFormContextType {
    errorRender?: FormikErrorRender<any>;
    showErrors: boolean;
    renderFieldError: (
        field: FieldInputProps<any>,
        form: FormikProps<any>,
        context?: TypedFormikFormContextType
    ) => React.ReactNode | boolean | undefined;
}

export const TypedFormikFormContext = createContext<TypedFormikFormContextType | undefined>(undefined);

function TypedFormikForm<FormValues, ErrorFormat = FormikErrors<FormValues>>({
    children,
    onCancel,
    resetFormOnCancel,
    className,
    includeValidationSummary,
    labels,
    fieldErrorRender,
    includeButtons = true
}: TypedFormikFormProps<FormValues>) {
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
        // setFormSubmitCount(formSubmitCount + 1);
    };

    const errorMessages = includeValidationSummary ? getAllErrors(formik, fieldErrorRender) : undefined;
    console.log(includeValidationSummary, errorMessages);

    const createTypedFormikFormContext = () => {
        const showErrors = isValidationErrorsVisible(formik);
        return {
            fieldErrorRender,
            showErrors,
            renderFieldError: (field, form) => {
                if (showErrors) {
                    const errors = getErrorsForField(field.name, form.errors);
                    if (errors) {
                        return fieldErrorRender ? fieldErrorRender(errors) : true;
                    }
                }
                return undefined;
            }
        };
    };

    return (
        <form onSubmit={onSubmit} noValidate={true} className={className}>
            <TypedFormikFormContext.Provider value={createTypedFormikFormContext()}>
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
            </TypedFormikFormContext.Provider>
        </form>
    );
}

export default TypedFormikForm;
