import React from 'react';
import { Field, FieldProps } from 'formik';
import { FormikValidateFunction, NavFrontendSkjemaFeil } from '../../types';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import ModalFormAndInfo, { ModalFormAndInfoProps } from './modal-form-and-info/ModalFormAndInfo';

export interface FormikModalFormAndInfoProps<FieldName, InfoType> extends ModalFormAndInfoProps<InfoType> {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
    validate?: FormikValidateFunction;
    onAfterChange?: (data: InfoType) => void;
}

function FormikModalFormAndInfo<FieldName, ItemType>({
    name,
    labels,
    infoRenderer,
    formRenderer,
    onAfterChange,
    renderEditButtons,
    feil,
    validate,
}: FormikModalFormAndInfoProps<FieldName, ItemType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field name={name} validate={validate}>
            {({ field, form }: FieldProps<ItemType>) => {
                return (
                    <ModalFormAndInfo<ItemType>
                        labels={labels}
                        data={field.value}
                        renderEditButtons={renderEditButtons}
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
