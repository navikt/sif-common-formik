import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { Field, FieldProps } from 'formik';
import { CalendarPlacement, Datepicker, DatepickerChange } from 'nav-datovelger';
import useMedia from 'use-media';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import { DateRange, FormikValidateFunction, NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import datepickerUtils from './datepickerUtils';
import { validateAll, validateDateString } from './validateFormikDatepickerDate';
import './datepicker.less';

export interface DatepickerLimitiations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
}

export interface DatePickerBaseProps<FieldName> {
    name: FieldName;
    label: string;
    disabled?: boolean;
    feil?: NavFrontendSkjemaFeil;
    inputTitle?: string;
    dayPickerProps?: DayPickerProps;
    invalidFormatErrorKey?: string;
    disableFormatValidation?: boolean;
    onChange?: (date: string) => void;
    validate?: FormikValidateFunction<string | undefined>;
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
    Omit<TypedFormInputCommonProps, 'validate'> &
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
    inputTitle,
    onChange,
    description,
    disableFormatValidation = false,
    invalidFormatErrorKey = 'common.fieldvalidation.dato.ugyldigFormat',
    ...restProps
}: FormikDatepickerProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    const isWide = useMedia({ minWidth: 736 });
    const elementId = id || guid();
    const position: CalendarPlacement | undefined =
        fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullscreen' : undefined;
    const inputName = (name || '') as string;

    const validations = disableFormatValidation ? [] : [(value) => validateDateString(value, invalidFormatErrorKey)];
    if (validate) {
        validations.push(validate);
    }

    return (
        <Field validate={validateAll(validations)} name={name}>
            {({ field, form }: FieldProps<string>) => {
                const isInvalid = (feil || getFeilPropForFormikInput({ field, form, context, feil })) !== undefined;
                // const fieldValue = field.value || {};
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

                return (
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={elementId}>
                            <LabelWithInfo info={info}>{label}</LabelWithInfo>
                        </Label>
                        {description && <div className={'skjemaelement__description'}>{description}</div>}
                        <Datepicker
                            inputId={elementId}
                            {...restProps}
                            inputProps={{ name: inputName, placeholder, 'aria-invalid': isInvalid, title: inputTitle }}
                            value={field.value}
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
