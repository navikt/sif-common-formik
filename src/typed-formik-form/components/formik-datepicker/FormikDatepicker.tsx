import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'react-responsive';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Field, FieldProps } from 'formik';
import { CalendarPlacement, Datepicker, DatepickerChange } from 'nav-datovelger';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import { DateRange, NavFrontendSkjemaFeil, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import datepickerUtils from './datepickerUtils';
import './datepicker.less';

dayjs.extend(customParseFormat);
export interface DatepickerLimitiations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
}

export interface DatePickerBaseProps<FieldName, ErrorType> extends TypedFormInputValidationProps<FieldName, ErrorType> {
    name: FieldName;
    label: string;
    disabled?: boolean;
    feil?: NavFrontendSkjemaFeil;
    inputTitle?: string;
    placeholder?: string;
    dayPickerProps?: DayPickerProps;
    invalidFormatError?: string;
    locale?: 'nb' | 'nn' | 'en';
    onChange?: (date: string) => void;
}
export interface DatePickerPresentationProps {
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
}
interface OwnProps<FieldName, ErrorType> extends DatePickerBaseProps<FieldName, ErrorType> {
    id?: string;
    description?: React.ReactNode;
}

export type FormikDatepickerProps<FieldName, ErrorType> = OwnProps<FieldName, ErrorType> &
    DatePickerPresentationProps &
    DatepickerLimitiations;

const getLocaleToUse = (locale: string): 'nb' | 'nn' | 'en' | undefined => {
    switch (locale) {
        case 'nb':
            return 'nb';
        case 'nn':
            return 'nn';
        case 'en':
            return 'en';
        default:
            return undefined;
    }
};

function FormikDatepicker<FieldName, ErrorType>({
    validate,
    label,
    name,
    id,
    showYearSelector,
    fullscreenOverlay,
    fullScreenOnMobile,
    feil,
    minDate,
    maxDate,
    disableWeekend,
    disabledDateRanges,
    inputTitle,
    onChange,
    description,
    placeholder,
    locale,
    ...restProps
}: FormikDatepickerProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);
    const isWide = useMediaQuery({ minWidth: 736 });
    const elementId = id || guid();
    const position: CalendarPlacement | undefined =
        fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullscreen' : undefined;
    const inputName = (name || '') as string;
    const intl = useIntl();

    return (
        <Field validate={validate ? (value) => validate(value, name) : undefined} name={name}>
            {({ field, form }: FieldProps<string>) => {
                const isInvalid = (feil || getFeilPropForFormikInput({ field, form, context, feil })) !== undefined;
                const handleOnDatepickerChange: DatepickerChange = (dateString) => {
                    if (field.value !== dateString) {
                        form.setFieldValue(field.name, dateString);
                        if (onChange) {
                            onChange(dateString);
                        }
                        if (context) {
                            context.onAfterFieldValueSet();
                        }
                    }
                };

                const isFieldValueValidDate = dayjs(field.value, ['DD.MM.YYYY']).isValid();

                return (
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={elementId}>{label}</Label>
                        {description && <div className={'skjemaelement__description'}>{description}</div>}
                        <Datepicker
                            inputId={elementId}
                            locale={getLocaleToUse(locale || intl.locale)}
                            {...restProps}
                            inputProps={{
                                name: inputName,
                                'aria-invalid': isInvalid,
                                title: inputTitle,
                            }}
                            value={isFieldValueValidDate ? field.value : undefined}
                            limitations={datepickerUtils.parseDateLimitations({
                                minDate,
                                maxDate,
                                disableWeekend,
                                disabledDateRanges,
                            })}
                            showYearSelector={showYearSelector}
                            calendarSettings={{
                                position,
                            }}
                            onChange={handleOnDatepickerChange}
                        />
                    </SkjemagruppeQuestion>
                );
            }}
        </Field>
    );
}

export default FormikDatepicker;
