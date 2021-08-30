import React from 'react';
import { sortItemsByFom } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { FormikModalFormAndList, ModalFormAndListLabels } from '../../../../typed-formik-form';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakList from './FerieuttakList';
import { Ferieuttak } from './types';
import { TypedFormInputValidationProps } from '../../../../typed-formik-form/types';

interface Props<FieldName> extends TypedFormInputValidationProps<FieldName, string> {
    name: FieldName;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
}

function FerieuttakListAndDialog<FieldName>({ name, minDate, maxDate, validate, labels }: Props<FieldName>) {
    return (
        <>
            <FormikModalFormAndList<FieldName, Ferieuttak, string>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate ? (value) => validate(value, name) : undefined}
                sortFunc={sortItemsByFom}
                maxItems={3}
                formRenderer={({ onSubmit, onCancel, item, allItems }) => (
                    <FerieuttakForm
                        ferieuttak={item}
                        alleFerieuttak={allItems}
                        minDate={minDate}
                        maxDate={maxDate}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
                listRenderer={({ items, onEdit, onDelete }) => (
                    <FerieuttakList ferieuttak={items} onEdit={onEdit} onDelete={onDelete} />
                )}
            />
        </>
    );
}

export default FerieuttakListAndDialog;
