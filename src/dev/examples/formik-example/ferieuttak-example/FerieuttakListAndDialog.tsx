import React from 'react';
import { sortItemsByFom } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { FormikModalFormAndList, FormikValidateFunction, ModalFormAndListLabels } from '../../../../typed-formik-form';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakList from './FerieuttakList';
import { Ferieuttak } from './types';

interface Props<FieldNames> {
    name: FieldNames;
    validate?: FormikValidateFunction;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndListLabels;
}

function FerieuttakListAndDialog<FieldNames>({ name, minDate, maxDate, validate, labels }: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndList<FieldNames, Ferieuttak>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                validate={validate}
                sortFunc={sortItemsByFom}
                maxItems={1}
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
