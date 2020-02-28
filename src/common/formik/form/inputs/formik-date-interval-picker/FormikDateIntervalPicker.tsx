import * as React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import bemUtils from '../../../../../dev/utils/bemUtils';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import FormikDatepicker, { FormikDatepickerProps } from '../formik-datepicker/FormikDatepicker';
import './dateIntervalPicker.less';

interface DateIntervalPickerProps<FieldName> {
    legend: string;
    fromDatepickerProps: FormikDatepickerProps<FieldName>;
    toDatepickerProps: FormikDatepickerProps<FieldName>;
    helperText?: string;
}

const bem = bemUtils('dateIntervalPicker');

function FormikDateIntervalPicker<FieldName>({
    legend,
    fromDatepickerProps,
    toDatepickerProps,
    helperText
}: DateIntervalPickerProps<FieldName>) {
    return (
        <SkjemaGruppe legend={<LabelWithInfo helperText={helperText}>{legend}</LabelWithInfo>} className={bem.block}>
            <div className={bem.element('flexContainer')}>
                <FormikDatepicker<FieldName> {...fromDatepickerProps} />
                <FormikDatepicker<FieldName> {...toDatepickerProps} />
            </div>
        </SkjemaGruppe>
    );
}

export default FormikDateIntervalPicker;
