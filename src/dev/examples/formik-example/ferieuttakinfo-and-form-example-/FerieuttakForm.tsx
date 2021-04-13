import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { commonFieldErrorRenderer } from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import { Systemtittel } from 'nav-frontend-typografi';
import { getTypedFormComponents } from '../../../../typed-formik-form';
import { Ferieland, Ferieuttak, isFerieuttak } from './types';

export interface FerieuttakFormLabels {
    title: string;
    fromDate: string;
    toDate: string;
    intervalTitle: string;
    okButton: string;
    cancelButton: string;
}

interface Props {
    minDate: Date;
    maxDate: Date;
    ferieuttak?: Partial<Ferieuttak>;
    alleFerieuttak?: Ferieuttak[];
    labels?: Partial<FerieuttakFormLabels>;
    onSubmit: (values: Ferieuttak) => void;
    onCancel: () => void;
}

const defaultLabels: FerieuttakFormLabels = {
    title: 'Registrer uttak av ferie',
    fromDate: 'Fra og med',
    toDate: 'Til og med',
    intervalTitle: 'Velg tidsrom',
    okButton: 'Ok',
    cancelButton: 'Avbryt',
};

export enum FerieuttakFormFields {
    tom = 'tom',
    fom = 'fom',
    land = 'land',
}

type FormValues = Partial<Ferieuttak>;

const Form = getTypedFormComponents<FerieuttakFormFields, FormValues>();

const FerieuttakForm: React.FunctionComponent<Props> = ({ labels, ferieuttak = { land: [] }, onSubmit, onCancel }) => {
    const intl = useIntl();
    const onFormikSubmit = (formValues: FormValues) => {
        if (isFerieuttak(formValues)) {
            onSubmit(formValues);
        } else {
            throw new Error('FerieuttakForm: Formvalues is not a valid Ferieuttak on submit.');
        }
    };

    const formLabels: FerieuttakFormLabels = { ...defaultLabels, ...labels };

    return (
        <>
            <Form.FormikWrapper
                initialValues={ferieuttak}
                onSubmit={onFormikSubmit}
                renderForm={() => (
                    <Form.Form
                        onCancel={onCancel}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}>
                        <Box padBottom="l">
                            <Systemtittel tag="h1">{formLabels.title}</Systemtittel>
                        </Box>
                        <Form.CheckboxPanelGroup
                            name={FerieuttakFormFields.land}
                            legend={'Hvilket land'}
                            checkboxes={[
                                {
                                    value: Ferieland.Norge,
                                    label: 'Norge',
                                },
                                {
                                    value: Ferieland.Sverige,
                                    label: 'Sverige',
                                },
                                {
                                    value: Ferieland.Danmark,
                                    label: 'Danmark',
                                },
                            ]}
                        />
                    </Form.Form>
                )}
            />
        </>
    );
};

export default FerieuttakForm;
