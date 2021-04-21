import React from 'react';
import { ModalFormAndInfoLabels } from '../../../../typed-formik-form';
import FormikModalFormAndInfo from '../../../../typed-formik-form/components/formik-modal-form-and-list/FormikModalFormAndInfo';
import FerieuttakForm from './FerieuttakForm';
import FerieuttakInfo from './FerieuttakInfo';
import { Ferieuttak } from './types';

interface Props<FieldName> {
    name: FieldName;
    minDate: Date;
    maxDate: Date;
    labels: ModalFormAndInfoLabels;
}

function FerieuttakInfoAndDialog<FieldName>({ name, minDate, maxDate, labels }: Props<FieldName>) {
    return (
        <>
            <FormikModalFormAndInfo<FieldName, Ferieuttak>
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
