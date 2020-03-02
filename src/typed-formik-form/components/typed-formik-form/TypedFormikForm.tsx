import React, { createContext, useEffect, useState } from 'react';
import { FieldInputProps, FormikErrors, FormikProps, useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import { NavFrontendSkjemaFeil } from '../../types';
import { getErrorsForField, isValidationErrorsVisible } from '../../utils/typedFormErrorUtils';
import FormikValidationErrorSummary from '../formik-validation-error-summary/FormikValidationErrorSummary';
import ButtonRow from '../helpers/button-row/ButtonRow';

export type FormikErrorRender<FormValues> = (error: FormikErrors<FormValues>) => NavFrontendSkjemaFeil;

export interface TypedFormikFormProps<FormValues> {
    children: React.ReactNode;
    className?: string;
    includeValidationSummary?: boolean;
    includeButtons?: boolean;
    fieldErrorRenderer?: FormikErrorRender<FormValues>;
    resetFormOnCancel?: boolean;
    labels?: {
        submitButton?: string;
        cancelButton?: string;
    };
    onCancel?: () => void;
}

interface TypedFormikFormContextType {
    showErrors: boolean;
    getAndRenderFieldErrorMessage: (field: FieldInputProps<any>, form: FormikProps<any>) => NavFrontendSkjemaFeil;
    fieldErrorRenderer?: FormikErrorRender<any>;
}

export const TypedFormikFormContext = createContext<TypedFormikFormContextType | undefined>(undefined);

function TypedFormikForm<FormValues>({
    children,
    onCancel,
    resetFormOnCancel,
    className,
    includeValidationSummary,
    labels,
    fieldErrorRenderer,
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
    };

    const createTypedFormikFormContext = (): TypedFormikFormContextType => {
        const showErrors = isValidationErrorsVisible(formik);
        return {
            fieldErrorRenderer,
            showErrors,
            getAndRenderFieldErrorMessage: (field, form) => {
                if (showErrors) {
                    const errors = getErrorsForField(field.name, form.errors);
                    if (errors) {
                        return fieldErrorRenderer ? fieldErrorRenderer(errors) : true;
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
                {includeValidationSummary && !formik.isValid && (
                    <div style={{ marginTop: '2rem' }}>
                        <FormikValidationErrorSummary />
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
