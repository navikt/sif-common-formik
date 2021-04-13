import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { useIntl } from 'react-intl';
import { Field, FieldProps } from 'formik';
import { CalendarPlacement, Datepicker, DatepickerChange } from 'nav-datovelger';
import useMedia from 'use-media';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import { DateRange, NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { validateDatePickerString } from '../../validation/validations';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import datepickerUtils from './datepickerUtils';
import './datepicker.less';
import { validateAll } from '../../validation/validateAll';

export interface DatepickerLimitiations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
}

export interface DatePickerBaseProps<FieldName> extends TypedFormInputCommonProps {
    name: FieldName;
    label: string;
    disabled?: boolean;
    feil?: NavFrontendSkjemaFeil;
    inputTitle?: string;
    placeholder?: string;
    dayPickerProps?: DayPickerProps;
    invalidFormatError?: string;
    disableFormatValidation?: boolean;
    locale?: 'nb' | 'nn' | 'en';
    onChange?: (date: string) => void;
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

function FormikDatepicker<FieldName>({
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
    disableFormatValidation = false,
    invalidFormatError = 'Ugyldig dato. Formatet må være på dd.mm.åååå.',
    placeholder,
    locale,
    ...restProps
}: FormikDatepickerProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    const isWide = useMedia({ minWidth: 736 });
    const elementId = id || guid();
    const position: CalendarPlacement | undefined =
        fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullscreen' : undefined;
    const inputName = (name || '') as string;
    const intl = useIntl();

    const validations = disableFormatValidation
        ? []
        : [(value) => validateDatePickerString(value, { dateHasInvalidFormat: invalidFormatError })];
    if (validate) {
        if (Array.isArray(validate)) {
            validations.push(...validate);
        } else {
            validations.push(validate);
        }
    }

    return (
        <Field validate={validateAll(validations)} name={name}>
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

                return (
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={elementId}>{label}</Label>
                        {description && <div className={'skjemaelement__description'}>{description}</div>}
                        <Datepicker
                            inputId={elementId}
                            locale={getLocaleToUse(locale || intl.locale)}
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
