import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { Field, FieldProps } from 'formik';
import { Datovelger } from 'nav-datovelger';
import useMedia from 'use-media';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import { DateRange, NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import datepickerUtils from './datepickerUtils';
import ErrorBoundary from './ErrorBoundary';
import './datepicker.less';

export interface DatepickerLimitiations {
    minDate?: Date;
    maxDate?: Date;
    disabledDateRanges?: DateRange[];
    disableWeekend?: boolean;
}

export interface DatePickerBaseProps<FieldName> extends Pick<TypedFormInputCommonProps, 'validate'> {
    name: FieldName;
    label: string;
    disabled?: boolean;
    feil?: NavFrontendSkjemaFeil;
    onChange?: (date: Date | undefined) => void;
    dayPickerProps?: DayPickerProps;
}

export interface DatePickerPresentationProps {
    showYearSelector?: boolean;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
}
interface OwnProps<FieldName> extends DatePickerBaseProps<FieldName> {
    id?: string;
    description?: React.ReactNode;
    useErrorBoundary?: boolean;
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
    useErrorBoundary = false,
    ...restProps
}: FormikDatepickerProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    const isWide = useMedia({ minWidth: 736 });
    const elementId = id || guid();
    const plassering = fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullskjerm' : undefined;
    const inputName = (name || '') as string;
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                const datovelger = (
                    <Datovelger
                        id={elementId}
                        {...restProps}
                        input={{ name: inputName, placeholder, id: elementId }}
                        valgtDato={datepickerUtils.getDateStringFromValue(field.value)}
                        avgrensninger={datepickerUtils.parseDateLimitations({
                            minDate,
                            maxDate,
                            disableWeekend,
                            disabledDateRanges,
                        })}
                        visÅrVelger={showYearSelector}
                        kalender={{
                            plassering,
                        }}
                        onChange={(dateString) => {
                            const date = dateString ? datepickerUtils.getDateFromDateString(dateString) : undefined;
                            if (field.value !== date) {
                                form.setFieldValue(field.name, date);
                                if (onChange) {
                                    onChange(date);
                                }
                                context?.onAfterFieldValueSet();
                            }
                        }}
                    />
                );
                return (
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={elementId}>
                            <LabelWithInfo info={info}>{label}</LabelWithInfo>
                        </Label>
                        {description && <div className={'skjemaelement__description'}>{description}</div>}
                        {useErrorBoundary ? <ErrorBoundary>{datovelger}</ErrorBoundary> : datovelger}
                    </SkjemagruppeQuestion>
                );
            }}
        </Field>
    );
}

export default FormikDatepicker;
