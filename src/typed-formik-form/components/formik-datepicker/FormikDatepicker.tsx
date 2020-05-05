import React from 'react';
import { DayPickerProps } from 'react-day-picker';
import { Field, FieldProps } from 'formik';
import { Datovelger } from 'nav-datovelger';
import useMedia from 'use-media';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import { NavFrontendSkjemaFeil, TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import SkjemagruppeQuestion from '../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import datepickerUtils from './datepickerUtils';
import './datepicker.less';

interface DateRange {
    fom: Date;
    tom: Date;
}

export interface DateLimitiations {
    minDato?: Date;
    maksDato?: Date;
    ugyldigeTidsperioder?: DateRange[];
    helgedagerIkkeTillatt?: boolean;
}
interface OwnProps<FieldName> {
    id?: string;
    name: FieldName;
    label: string;
    dateLimitations?: DateLimitiations;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
    disabled?: boolean;
    showYearSelector?: boolean;
    feil?: NavFrontendSkjemaFeil;
    dayPickerProps?: DayPickerProps;
    description?: React.ReactNode;
    onChange?: (date: Date | undefined) => void;
}

export type FormikDatepickerProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

const placeholder = 'dd.mm.åååå';

function FormikDatepicker<FieldName>({
    validate,
    label,
    dateLimitations,
    name,
    id,
    info,
    showYearSelector,
    fullscreenOverlay,
    fullScreenOnMobile,
    feil,
    onChange,
    description,
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
                return (
                    <SkjemagruppeQuestion feil={getFeilPropForFormikInput({ field, form, context, feil })}>
                        <Label htmlFor={elementId}>
                            <LabelWithInfo info={info}>{label}</LabelWithInfo>
                        </Label>
                        {description && <div className={'skjemaelement__description'}>{description}</div>}
                        <Datovelger
                            id={elementId}
                            {...restProps}
                            input={{ name: inputName, placeholder, id: elementId }}
                            valgtDato={datepickerUtils.getDateStringFromValue(field.value)}
                            avgrensninger={
                                dateLimitations ? datepickerUtils.parseDateLimitations(dateLimitations) : undefined
                            }
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
                    </SkjemagruppeQuestion>
                );
            }}
        </Field>
    );
}

export default FormikDatepicker;
