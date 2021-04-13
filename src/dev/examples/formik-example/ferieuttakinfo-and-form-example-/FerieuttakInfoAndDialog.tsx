import React from 'react';
import { ModalFormAndInfoLabels } from '../../../../typed-formik-form';
import FormikModalFormAndInfo from '../../../../typed-formik-form/components/formik-modal-form-and-list/FormikModalFormAndInfo';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakInfo from './FerieuttakInfo';
import { Ferieuttak } from './types';

interface Props<FieldNames> {
    name: FieldNames;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndInfoLabels;
}

function FerieuttakInfoAndDialog<FieldNames>({ name, minDate, maxDate, labels }: Props<FieldNames>) {
    return (
        <>
            <FormikModalFormAndInfo<FieldNames, Ferieuttak>
                name={name}
                labels={labels}
                dialogWidth="narrow"
                renderEditButtons={true}
                formRenderer={({ onSubmit, onCancel, data }) => (
                    <FerieuttakForm
                        ferieuttak={data}
                        minDate={minDate}
                        maxDate={maxDate}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />
                )}
                infoRenderer={({ data }) => <FerieuttakInfo ferieuttak={data} />}
            />
        </>
    );
}

export default FerieuttakInfoAndDialog;
