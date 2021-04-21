import React from 'react';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import { prettifyDate } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { Systemtittel } from 'nav-frontend-typografi';
import { dateToISOString, getTypedFormComponents, ISOStringToDate } from '../../../../typed-formik-form';
import getDateValidator from '../../../../typed-formik-form/validation/getDateValidator';
import getListValidator, { ValidateListError } from '../../../../typed-formik-form/validation/getListValidator';
import { Ferieland, Ferieuttak, isFerieuttak } from './types';
import { getDateRangeValidator } from '../../../../typed-formik-form/validation';

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
    ferieuttak?: Ferieuttak;
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

interface FormValues extends Omit<Ferieuttak, 'fom' | 'tom'> {
    fom: string;
    tom: string;
}

const Form = getTypedFormComponents<FerieuttakFormFields, FormValues>();

const mapFerieuttakToFormValues = (ferieuttak: Ferieuttak): FormValues => ({
    ...ferieuttak,
    land: [...(ferieuttak.land || [])],
    fom: dateToISOString(ferieuttak.fom),
    tom: dateToISOString(ferieuttak.tom),
});

const mapFormValuesToFerieuttak = (values: Partial<FormValues>): Ferieuttak | undefined => {
    const fom = ISOStringToDate(values.fom);
    const tom = ISOStringToDate(values.tom);
    if (fom && tom) {
        return {
            ...values,
            land: [...(values.land || [])],
            fom,
            tom,
        };
    }
    return undefined;
};

const FerieuttakForm: React.FunctionComponent<Props> = ({
    maxDate,
    minDate,
    labels,
    ferieuttak,
    alleFerieuttak = [],
    onSubmit,
    onCancel,
}) => {
    const onFormikSubmit = (formValues: Partial<FormValues>) => {
        const ferieuttak = mapFormValuesToFerieuttak(formValues);
        if (ferieuttak && isFerieuttak(ferieuttak)) {
            onSubmit(ferieuttak);
        } else {
            throw new Error('FerieuttakForm: Formvalues is not a valid Ferieuttak on submit.');
        }
    };

    const formLabels: FerieuttakFormLabels = { ...defaultLabels, ...labels };
    const initialValues = ferieuttak ? mapFerieuttakToFormValues(ferieuttak) : undefined;
    return (
        <>
            <Form.FormikWrapper
                initialValues={initialValues || {}}
                onSubmit={onFormikSubmit}
                renderForm={(formik) => (
                    <Form.Form
                        onCancel={onCancel}
                        // fieldErrorRenderer={getFieldErrorRenderer(intl, 'ferie')}
                        // summaryFieldErrorRenderer={getSummaryFieldErrorRenderer(intl, 'ferie')}
                    >
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
                            validate={(value) => {
                                const error = getListValidator({ required: true })(value);
                                switch (error) {
                                    case undefined:
                                        return undefined;
                                    case ValidateListError.listIsEmpty:
                                        return 'listIsEmpty';
                                }
                            }}
                        />
                        <Box margin="xl">
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
                                    validate: (value) => {
                                        const error = getDateValidator(
                                            {
                                                required: true,
                                                min: minDate,
                                                max: maxDate,
                                            },
                                            {
                                                noValue: () => `Tataaa`,
                                                dateAfterMax: () => `Dato kan ikke være etter ${prettifyDate(maxDate)}`,
                                            }
                                        )(value);
                                        return error;
                                    },
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
                                    validate: getDateRangeValidator.validateToDate({
                                        fromDate: ISOStringToDate(formik.values.fom),
                                        min: minDate,
                                        max: maxDate,
                                        required: true,
                                    }),
                                    onChange: () => {
                                        setTimeout(() => {
                                            formik.validateField(FerieuttakFormFields.fom);
                                        });
                                    },
                                }}
                            />
                        </Box>
                    </Form.Form>
                )}
            />
        </>
    );
};

export default FerieuttakForm;
