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

interface OwnProps<FieldName, ErrorType> {
    legend?: string;
    description?: React.ReactNode;
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
    locale?: string;
    allowRangesToStartAndStopOnSameDate?: boolean;
    fromInputProps: DatePickerBaseProps<FieldName, ErrorType>;
    toInputProps: DatePickerBaseProps<FieldName, ErrorType>;
}

export type FormikDateRangePickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> &
    DatePickerPresentationProps &
    DatepickerLimitiations;

function FormikDateRangePicker<FieldName, ErrorType>({
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
}: FormikDateRangePickerProps<FieldName, ErrorType>) {
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
            legend={legend ? <Element tag="div">{legend}</Element> : undefined}
            description={description}
            className="dateRangePicker">
            <div className="dateRangePicker__flexContainer">
                <FormikDatepicker<FieldName, ErrorType>
                    {...fromInputProps}
                    {...{ fullscreenOverlay, fullScreenOnMobile, showYearSelector }}
                    {...fromDateLimitations}
                    {...locale}
                />
                <FormikDatepicker<FieldName, ErrorType>
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
