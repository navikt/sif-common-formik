import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { Field, FieldProps } from 'formik';
import { CalendarPlacement, Datepicker, DatepickerChange } from 'nav-datovelger';
import useMedia from 'use-media';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import { DateRange, NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import datepickerUtils, { createFormikDatepickerValue } from './datepickerUtils';
import { validateAll, validateFormikDatepickerDate } from './validateFormikDatepickerDate';
import './datepicker.less';

export interface DatepickerLimitiations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
}

export type FormikDatepickerValue = {
    date: Date | undefined;
    dateString: string;
};

export interface DatePickerBaseProps<FieldName> extends Pick<TypedFormInputCommonProps, 'validate'> {
    name: FieldName;
    label: string;
    disabled?: boolean;
    feil?: NavFrontendSkjemaFeil;
    onChange?: (date: FormikDatepickerValue) => void;
    dayPickerProps?: DayPickerProps;
    invalidFormatErrorKey?: string;
    disableFormatValidation?: boolean;
}
export interface DatePickerPresentationProps {
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
}
interface OwnProps<FieldName> extends DatePickerBaseProps<FieldName> {
    id?: string;
    description?: React.ReactNode;
}

export type FormikDatepickerProps<FieldName> = OwnProps<FieldName> &
    TypedFormInputCommonProps &
    DatePickerPresentationProps &
    DatepickerLimitiations;

const placeholder = 'dd.mm.åååå';

function FormikDatepicker<FieldName>({
    validate,
    label,
    name,
    id,
    info,
    showYearSelector,
    fullscreenOverlay,
    fullScreenOnMobile,
    feil,
    minDate,
    maxDate,
    disableWeekend,
    disabledDateRanges,
    onChange,
    description,
    disableFormatValidation = false,
    invalidFormatErrorKey = 'datepicker.invalidFormat',
    ...restProps
}: FormikDatepickerProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    const isWide = useMedia({ minWidth: 736 });
    const elementId = id || guid();
    const position: CalendarPlacement | undefined =
        fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullscreen' : undefined;
    const inputName = (name || '') as string;

    const validations = disableFormatValidation
        ? []
        : [(value) => validateFormikDatepickerDate(value, invalidFormatErrorKey)];
    if (validate) {
        validations.push(validate);
    }

    return (
        <Field validate={validateAll(validations)} name={name}>
            {({ field, form }: FieldProps<FormikDatepickerValue>) => {
                const isInvalid = (feil || getFeilPropForFormikInput({ field, form, context, feil })) !== undefined;
                const fieldValue = field.value || {};
                const handleOnDatepickerChange: DatepickerChange = (dateString) => {
                    const value = createFormikDatepickerValue(dateString);
                    if (fieldValue.dateString !== value.dateString) {
                        form.setFieldValue(field.name, value);
                        if (onChange) {
                            onChange(value);
                        }
                        if (context) {
                            context.onAfterFieldValueSet();
                        }
                    }
                };

                return (
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={elementId}>
                            <LabelWithInfo info={info}>{label}</LabelWithInfo>
                        </Label>
                        {description && <div className={'skjemaelement__description'}>{description}</div>}
                        <Datepicker
                            inputId={elementId}
                            {...restProps}
                            inputProps={{ name: inputName, placeholder, 'aria-invalid': isInvalid }}
                            value={fieldValue.dateString}
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
