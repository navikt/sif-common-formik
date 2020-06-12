import React from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { commonFieldErrorRenderer } from '@navikt/sif-common-core/lib/utils/commonFieldErrorRenderer';
import dateRangeValidation from '@navikt/sif-common-core/lib/validation/dateRangeValidation';
import { Systemtittel } from 'nav-frontend-typografi';
import { getTypedFormComponents } from '../../../../typed-formik-form';
import { Ferieuttak, isFerieuttak } from './types';

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

enum FerieuttakFormFields {
    tom = 'tom',
    fom = 'fom',
}

type FormValues = Partial<Ferieuttak>;

const Form = getTypedFormComponents<FerieuttakFormFields, FormValues>();

const FerieuttakForm = ({
    maxDate,
    minDate,
    labels,
    ferieuttak = { fom: undefined, tom: undefined },
    alleFerieuttak = [],
    onSubmit,
    onCancel,
}: Props) => {
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
                renderForm={(formik) => (
                    <Form.Form
                        onCancel={onCancel}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}>
                        <Box padBottom="l">
                            <Systemtittel tag="h1">{formLabels.title}</Systemtittel>
                        </Box>
                        <Form.DateIntervalPicker
                            legend={formLabels.intervalTitle}
                            fromDatepickerProps={{
                                label: formLabels.fromDate,
                                name: FerieuttakFormFields.fom,
                                fullscreenOverlay: true,
                                minDate,
                                maxDate: maxDate || formik.values.tom,
                                disabledDateRanges: alleFerieuttak
                                    .filter((f) => (ferieuttak ? ferieuttak.id !== f.id : true))
                                    .map((f) => ({ from: f.fom, to: f.tom })),
                                validate: (date: Date) =>
                                    dateRangeValidation.validateFromDate(date, minDate, maxDate, formik.values.tom),
                                onChange: () => {
                                    setTimeout(() => {
                                        formik.validateField(FerieuttakFormFields.tom);
                                    });
                                },
                            }}
                            toDatepickerProps={{
                                label: formLabels.toDate,
                                name: FerieuttakFormFields.tom,
                                fullscreenOverlay: true,
                                minDate: minDate || formik.values.fom,
                                maxDate,
                                validate: (date: Date) =>
                                    dateRangeValidation.validateToDate(date, minDate, maxDate, formik.values.fom),
                                onChange: () => {
                                    setTimeout(() => {
                                        formik.validateField(FerieuttakFormFields.fom);
                                    });
                                },
                            }}
                        />
                    </Form.Form>
                )}
            />
        </>
    );
};

export default FerieuttakForm;
