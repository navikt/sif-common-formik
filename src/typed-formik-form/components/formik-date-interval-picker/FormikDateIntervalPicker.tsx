import React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import FormikDatepicker, { FormikDatepickerProps } from '../formik-datepicker/FormikDatepicker';
import './dateIntervalPicker.less';

export interface DateIntervalPickerProps<FieldName> {
    legend?: string;
    fromDatepickerProps: FormikDatepickerProps<FieldName>;
    toDatepickerProps: FormikDatepickerProps<FieldName>;
    description?: React.ReactNode;
    feil?: React.ReactNode;
}

function FormikDateIntervalPicker<FieldName>({
    legend,
    fromDatepickerProps,
    toDatepickerProps,
    description,
    feil,
}: DateIntervalPickerProps<FieldName>) {
    return (
        <SkjemaGruppe
            legend={legend ? <Element tag="div">{legend}</Element> : undefined}
            description={description}
            feil={feil}
            className="dateIntervalPicker">
            <div className="dateIntervalPicker__flexContainer">
                <FormikDatepicker<FieldName> {...fromDatepickerProps} />
                <FormikDatepicker<FieldName> {...toDatepickerProps} />
            </div>
        </SkjemaGruppe>
    );
}

export default FormikDateIntervalPicker;
