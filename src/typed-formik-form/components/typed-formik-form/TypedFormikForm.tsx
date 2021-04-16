import React, { createContext, useEffect, useRef, useState } from 'react';
import { FieldInputProps, FormikProps, useFormikContext } from 'formik';
import { Knapp } from 'nav-frontend-knapper';
import { CancelButtonTypes, NavFrontendSkjemaFeil } from '../../types';
import { getErrorForField, isValidationErrorsVisible } from '../../utils/typedFormErrorUtils';
import FormikValidationErrorSummary from '../formik-validation-error-summary/FormikValidationErrorSummary';
import ButtonRow from '../helpers/button-row/ButtonRow';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export type FormikFieldErrorRender = (error: string) => NavFrontendSkjemaFeil;
export type FormikSummaryFieldErrorRender = (fieldKey: string, error: string) => FeiloppsummeringFeil;

export interface TypedFormikFormProps<FormValues> {
    children: React.ReactNode;
    className?: string;
    includeValidationSummary?: boolean;
    includeButtons?: boolean;
    resetFormOnCancel?: boolean;
    submitButtonLabel?: string;
    cancelButtonLabel?: string;
    id?: string;
    cancelButtonType?: CancelButtonTypes;
    runDelayedFormValidation?: boolean;
    fieldErrorRenderer?: FormikFieldErrorRender;
    summaryFieldErrorRenderer?: FormikSummaryFieldErrorRender;
    noButtonsContentRenderer?: () => React.ReactNode;
    cleanup?: (values: FormValues) => FormValues;
    onValidSubmit?: () => void;
    onCancel?: () => void;
}

export interface TypedFormikFormContextType {
    showErrors: boolean;
    fieldErrorRenderer?: FormikFieldErrorRender;
    summaryFieldErrorRenderer?: FormikSummaryFieldErrorRender;
    getAndRenderFieldErrorMessage: (field: FieldInputProps<any>, form: FormikProps<any>) => NavFrontendSkjemaFeil;
    onAfterFieldValueSet: () => void;
}

interface SubmitProps {
    isSubmitting: boolean;
    isValid: boolean;
}
export const userHasSubmittedValidForm = (oldProps: SubmitProps, currentProps: SubmitProps) =>
    oldProps.isSubmitting === true && currentProps.isSubmitting === false && currentProps.isValid === true;

export const TypedFormikFormContext = createContext<TypedFormikFormContextType | undefined>(undefined);

function TypedFormikForm<FormValues>({
    children,
    resetFormOnCancel,
    className,
    includeValidationSummary,
    submitButtonLabel,
    cancelButtonLabel,
    id,
    includeButtons = true,
    runDelayedFormValidation,
    cancelButtonType,
    fieldErrorRenderer,
    summaryFieldErrorRenderer,
    onCancel,
    onValidSubmit,
    noButtonsContentRenderer,
    cleanup,
}: TypedFormikFormProps<FormValues>) {
    const formik = useFormikContext<FormValues>();
    const { handleSubmit, submitCount, setStatus, resetForm, isSubmitting, isValid, isValidating } = formik;
    const [formSubmitCount, setFormSubmitCout] = useState(submitCount);
    const [cleanupState, setCleanupState] = useState({ hasCleanedUp: false, counter: 0 });

    const ref = useRef<any>({ isSubmitting, isValid });

    useEffect(() => {
        ref.current = {
            isSubmitting,
            isValid,
        };
        if (!isSubmitting) {
            if (submitCount > formSubmitCount) {
                if (isValid) {
                    setFormSubmitCout(submitCount);
                }
                setStatus({ showErrors: true });
            } else {
                setStatus({ showErrors: false });
            }
        }
    }, [submitCount, setStatus, formSubmitCount, isSubmitting, isValid, isValidating]);

    useEffect(() => {
        cleanupState.hasCleanedUp && handleSubmit();
    }, [cleanupState, handleSubmit]);

    if (userHasSubmittedValidForm(ref.current, { isValid, isSubmitting })) {
        if (onValidSubmit) {
            onValidSubmit();
        }
    }

    const runCleanup = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.stopPropagation();
        evt.preventDefault();
        formik.setValues(cleanup ? cleanup(formik.values) : formik.values);
        setCleanupState({ hasCleanedUp: true, counter: cleanupState.counter + 1 });
    };

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        setCleanupState({ ...cleanupState, hasCleanedUp: false });
        if (cleanup !== undefined) {
            runCleanup(evt);
        } else {
            handleSubmit(evt);
        }
    };

    const createTypedFormikFormContext = (): TypedFormikFormContextType => {
        const showErrors = isValidationErrorsVisible(formik);
        return {
            showErrors,
            fieldErrorRenderer,
            summaryFieldErrorRenderer,
            getAndRenderFieldErrorMessage: (field, form) => {
                if (showErrors) {
                    const error = getErrorForField(field.name, form.errors);
                    if (error) {
                        return fieldErrorRenderer ? fieldErrorRenderer(error) : error;
                    }
                }
                return undefined;
            },
            onAfterFieldValueSet: () => {
                if (runDelayedFormValidation && formik.status && formik.status.showErrors) {
                    setTimeout(() => {
                        formik.validateForm();
                    });
                }
            },
        };
    };

    return (
        <form onSubmit={onSubmit} noValidate={true} className={className} id={id} autoComplete="off">
            <TypedFormikFormContext.Provider value={createTypedFormikFormContext()}>
                {children}
                {includeValidationSummary && !formik.isValid && isValidationErrorsVisible(formik) && (
                    <div style={{ marginTop: '2rem' }}>
                        <FormikValidationErrorSummary />
                    </div>
                )}
                {includeButtons && (
                    <div style={{ marginTop: '2rem' }}>
                        <ButtonRow layout={onCancel ? 'stretch' : 'normal'}>
                            <Knapp type="hoved" htmlType="submit">
                                {submitButtonLabel || 'Ok'}
                            </Knapp>
                            {onCancel && (
                                <Knapp
                                    type={cancelButtonType || 'flat'}
                                    htmlType="button"
                                    onClick={() => {
                                        if (resetFormOnCancel) {
                                            resetForm();
                                        }
                                        onCancel();
                                    }}>
                                    {cancelButtonLabel || 'Avbryt'}
                                </Knapp>
                            )}
                        </ButtonRow>
                    </div>
                )}
                {includeButtons === false && noButtonsContentRenderer && (
                    <div style={{ marginTop: '2rem' }}>{noButtonsContentRenderer()}</div>
                )}
            </TypedFormikFormContext.Provider>
        </form>
    );
}

export default TypedFormikForm;
