import React from 'react';
import { useFormikContext } from 'formik';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { FormikValidateFunction } from '../../types';
import FormikDatepicker, { DatepickerLimitiations, DatePickerBaseProps } from '../formik-datepicker/FormikDatepicker';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { getDateRangePickerLimitations } from './dateRangePickerUtils';
import './dateRangePicker.less';

export interface DateRangePickerProps<FieldName> {
    legend?: string;
    info?: string;
    description?: React.ReactNode;
    dateLimitations?: DatepickerLimitiations;
    allowRangesToStartAndStopOnSameDate?: boolean;
    fromInputProps: DatePickerBaseProps<FieldName>;
    toInputProps: DatePickerBaseProps<FieldName>;
    validate?: FormikValidateFunction;
}

function FormikDateRangePicker<FieldName>({
    legend,
    fromInputProps,
    toInputProps,
    description,
    dateLimitations,
    allowRangesToStartAndStopOnSameDate,
    info,
}: DateRangePickerProps<FieldName>) {
    const { values } = useFormikContext<any>();
    const fromDate: Date | undefined = values[fromInputProps.name];
    const toDate: Date | undefined = values[toInputProps.name];
    const { fromDateLimitations, toDateLimitations } = getDateRangePickerLimitations({
        fromDate,
        toDate,
        minDate: dateLimitations?.minDate,
        maxDate: dateLimitations?.maxDate,
        dateRanges: dateLimitations?.disabledDateRanges,
        disableWeekend: dateLimitations?.disableWeekend,
        allowRangesToStartAndStopOnSameDate,
    });
    return (
        <SkjemaGruppe
            legend={legend ? <LabelWithInfo info={info}>{legend}</LabelWithInfo> : undefined}
            description={description}
            className="dateRangePicker">
            <div className="dateRangePicker__flexContainer">
                <FormikDatepicker<FieldName> {...fromInputProps} dateLimitations={fromDateLimitations} />
                <FormikDatepicker<FieldName> {...toInputProps} dateLimitations={toDateLimitations} />
            </div>
        </SkjemaGruppe>
    );
}

export default FormikDateRangePicker;
