import React from 'react';
import { Field, FieldProps } from 'formik';
import { NavFrontendSkjemaFeil, TypedFormInputValidationProps } from '../../types';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import ModalFormAndInfo, { ModalFormAndInfoProps } from './modal-form-and-info/ModalFormAndInfo';

export interface FormikModalFormAndInfoProps<FieldName, InfoType, ErrorType>
    extends ModalFormAndInfoProps<InfoType>,
        TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
    defaultValue?: InfoType;
    onAfterChange?: (data: InfoType) => void;
}

function FormikModalFormAndInfo<FieldName, ItemType, ErrorType>({
    name,
    labels,
    defaultValue,
    infoRenderer,
    formRenderer,
    onAfterChange,
    renderEditButtons,
    renderDeleteButton,
    dialogWidth,
    dialogClassName,
    wrapInfoInPanel,
    feil,
    validate,
}: FormikModalFormAndInfoProps<FieldName, ItemType, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field name={name} validate={validate ? (value) => validate(value, name) : undefined}>
            {({ field, form }: FieldProps<ItemType>) => {
                return (
                    <ModalFormAndInfo<ItemType>
                        labels={labels}
                        data={field.value || defaultValue}
                        dialogClassName={dialogClassName}
                        dialogWidth={dialogWidth}
                        renderEditButtons={renderEditButtons}
                        renderDeleteButton={renderDeleteButton}
                        wrapInfoInPanel={wrapInfoInPanel}
                        error={feil || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined)}
                        onDelete={() => form.setFieldValue(field.name, undefined)}
                        onChange={(value) => {
                            form.setFieldValue(field.name, value);
                            if (onAfterChange) {
                                onAfterChange(value);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        formRenderer={formRenderer}
                        infoRenderer={({ onEdit, onDelete }) => infoRenderer({ data: field.value, onDelete, onEdit })}
                    />
                );
            }}
        </Field>
    );
}

export default FormikModalFormAndInfo;
