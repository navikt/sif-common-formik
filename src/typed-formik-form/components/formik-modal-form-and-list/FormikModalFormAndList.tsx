import React from 'react';
import { Field, FieldProps } from 'formik';
import { NavFrontendSkjemaFeil, TypedFormInputValidationProps } from '../../types';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import ModalFormAndList, { ModalFormAndListProps } from './modal-form-and-list/ModalFormAndList';

export interface FormikModalFormAndListProps<FieldName, ItemType>
    extends ModalFormAndListProps<ItemType>,
        TypedFormInputValidationProps<FieldName> {
    name: FieldName;
    feil?: NavFrontendSkjemaFeil;
    sortFunc?: (a: ItemType, b: ItemType) => number;
    onAfterChange?: (values: ItemType[]) => void;
}

function FormikModalFormAndList<FieldName, ItemType>({
    name,
    labels,
    listRenderer,
    formRenderer,
    sortFunc,
    onAfterChange,
    feil,
    maxItems,
    validate,
}: FormikModalFormAndListProps<FieldName, ItemType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field name={name} validate={validate ? (value) => validate(value, name) : undefined}>
            {({ field, form }: FieldProps<ItemType[]>) => {
                return (
                    <ModalFormAndList<ItemType>
                        labels={labels}
                        items={field.value}
                        error={feil || (context ? context.getAndRenderFieldErrorMessage(field, form) : undefined)}
                        maxItems={maxItems}
                        onChange={(values) => {
                            const updatedValues = sortFunc ? values.sort(sortFunc) : values;
                            form.setFieldValue(field.name, updatedValues);
                            if (onAfterChange) {
                                onAfterChange(updatedValues);
                            }
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        formRenderer={formRenderer}
                        listRenderer={({ onEdit, onDelete }) => listRenderer({ items: field.value, onDelete, onEdit })}
                    />
                );
            }}
        </Field>
    );
}

export default FormikModalFormAndList;
