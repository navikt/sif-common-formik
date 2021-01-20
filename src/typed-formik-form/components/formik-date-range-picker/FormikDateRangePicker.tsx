import React from 'react';
import { useFormikContext } from 'formik';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import { ISOStringToDate } from '../formik-datepicker/datepickerUtils';
import FormikDatepicker, {
    DatePickerBaseProps,
    DatepickerLimitiations,
    DatePickerPresentationProps,
} from '../formik-datepicker/FormikDatepicker';
import { getDateRangePickerLimitations } from './dateRangePickerUtils';
import './dateRangePicker.less';

interface OwnProps<FieldName> {
    legend?: string;
    description?: React.ReactNode;
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
    locale?: string;
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
    locale,
}: FormikDateRangePickerProps<FieldName>) {
    const { values } = useFormikContext<any>();
    const fromDate = ISOStringToDate(values[fromInputProps.name]);
    const toDate = ISOStringToDate(values[toInputProps.name]);
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
            legend={legend ? <Element>{legend}</Element> : undefined}
            description={description}
            className="dateRangePicker">
            <div className="dateRangePicker__flexContainer">
                <FormikDatepicker<FieldName>
                    {...fromInputProps}
                    {...{ fullscreenOverlay, fullScreenOnMobile, showYearSelector }}
                    {...fromDateLimitations}
                    {...locale}
                />
                <FormikDatepicker<FieldName>
                    {...toInputProps}
                    {...{ fullscreenOverlay, fullScreenOnMobile, showYearSelector }}
                    {...toDateLimitations}
                    {...locale}
                />
            </div>
        </SkjemaGruppe>
    );
}

export default FormikDateRangePicker;
