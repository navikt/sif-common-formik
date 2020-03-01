import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import FormikDatepicker, { FormikDatepickerProps } from '../formik-datepicker/FormikDatepicker';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import './dateIntervalPicker.less';

export interface DateIntervalPickerProps<FieldName> {
    legend: string;
    fromDatepickerProps: FormikDatepickerProps<FieldName>;
    toDatepickerProps: FormikDatepickerProps<FieldName>;
    info?: string;
}

function FormikDateIntervalPicker<FieldName>({
    legend,
    fromDatepickerProps,
    toDatepickerProps,
    info
}: DateIntervalPickerProps<FieldName>) {
    return (
        <SkjemaGruppe legend={<LabelWithInfo info={info}>{legend}</LabelWithInfo>} className="dateIntervalPicker">
            <div className="dateIntervalPicker__flexContainer">
                <FormikDatepicker<FieldName> {...fromDatepickerProps} />
                <FormikDatepicker<FieldName> {...toDatepickerProps} />
            </div>
        </SkjemaGruppe>
    );
}

export default FormikDateIntervalPicker;
