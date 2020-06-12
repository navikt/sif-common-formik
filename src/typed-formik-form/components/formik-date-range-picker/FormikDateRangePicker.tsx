import React from 'react';
import { useFormikContext } from 'formik';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import FormikDatepicker, {
    DatePickerBaseProps,
    DatepickerLimitiations,
    DatePickerPresentationProps,
} from '../formik-datepicker/FormikDatepicker';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { getDateRangePickerLimitations } from './dateRangePickerUtils';
import './dateRangePicker.less';

interface OwnProps<FieldName> {
    legend?: string;
    info?: string;
    description?: React.ReactNode;
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
    allowRangesToStartAndStopOnSameDate?: boolean;
    fromInputProps: DatePickerBaseProps<FieldName>;
    toInputProps: DatePickerBaseProps<FieldName>;
}

export type FormikDateRangePickerProps<FieldName> = OwnProps<FieldName> &
    DatePickerPresentationProps &
    DatepickerLimitiations;

function FormikDateRangePicker<FieldName>({
    legend,
    fromInputProps,
    toInputProps,
    description,
    minDate,
    maxDate,
    disableWeekend,
    disabledDateRanges,
    showYearSelector,
    fullScreenOnMobile,
    fullscreenOverlay,
    allowRangesToStartAndStopOnSameDate,
    info,
}: FormikDateRangePickerProps<FieldName>) {
    const { values } = useFormikContext<any>();
    const fromDate: Date | undefined = values[fromInputProps.name];
    const toDate: Date | undefined = values[toInputProps.name];
    const { fromDateLimitations, toDateLimitations } = getDateRangePickerLimitations({
        fromDate,
        toDate,
        minDate,
        maxDate,
        dateRanges: disabledDateRanges,
        disableWeekend,
        allowRangesToStartAndStopOnSameDate,
    });
    return (
        <SkjemaGruppe
            legend={legend ? <LabelWithInfo info={info}>{legend}</LabelWithInfo> : undefined}
            description={description}
            className="dateRangePicker">
            <div className="dateRangePicker__flexContainer">
                <FormikDatepicker<FieldName>
                    {...fromInputProps}
                    {...{ fullscreenOverlay, fullScreenOnMobile, showYearSelector }}
                    {...fromDateLimitations}
                />
                <FormikDatepicker<FieldName>
                    {...toInputProps}
                    {...{ fullscreenOverlay, fullScreenOnMobile, showYearSelector }}
                    {...toDateLimitations}
                />
            </div>
        </SkjemaGruppe>
    );
}

export default FormikDateRangePicker;
