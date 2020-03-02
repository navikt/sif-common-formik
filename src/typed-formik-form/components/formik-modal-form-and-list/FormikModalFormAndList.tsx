import React from 'react';
import { Field, FieldProps } from 'formik';
import { FormikValidateFunction } from '../../types/FormikValidateFunction';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import ModalFormAndList, { ModalFormAndListProps } from './modal-form-and-list/ModalFormAndList';

interface Props<FieldsType, ItemType> extends ModalFormAndListProps<ItemType> {
    name: FieldsType;
    validate?: FormikValidateFunction;
    sortFunc?: (a: ItemType, b: ItemType) => number;
    onAfterChange?: (values: ItemType[]) => void;
}

function FormikModalFormAndList<FieldsType, ItemType>({
    name,
    labels,
    listRenderer,
    formRenderer,
    sortFunc,
    onAfterChange,
    validate
}: Props<FieldsType, ItemType>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field name={name} validate={validate}>
            {({ field, form }: FieldProps<ItemType[]>) => {
                return (
                    <ModalFormAndList<ItemType>
                        labels={labels}
                        items={field.value}
                        error={context ? context.getAndRenderFieldErrorMessage(field, form) : undefined}
                        onChange={(values) => {
                            const updatedValues = sortFunc ? values.sort(sortFunc) : values;
                            form.setFieldValue(field.name, updatedValues);
                            if (onAfterChange) {
                                onAfterChange(updatedValues);
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
