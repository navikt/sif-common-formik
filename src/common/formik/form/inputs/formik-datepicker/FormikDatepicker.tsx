import * as React from 'react';
import { Field, FieldProps } from 'formik';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import useMedia from 'use-media';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import SkjemaGruppeSingleElement from '../../../components/skjemagruppe-single-element/SkjemaGruppeSingleElement';
import { FieldValidationError } from '../../../types/FieldValidationError';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';
import datepickerUtils from './datepickerUtils';

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
export interface FormikDatepickerProps<FieldName> {
    id?: string;
    name: FieldName;
    label: string;
    dateLimitations?: DateLimitiations;
    fullscreenOverlay?: boolean;
    fullScreenOnMobile?: boolean;
    disabled?: boolean;
    showYearSelector?: boolean;
    feil?: FieldValidationError;
    onChange?: (date: Date | undefined) => void;
}

type Props<FieldName> = FormikDatepickerProps<FieldName> & FormikInputCommonProps;

const placeholder = 'dd.mm.åååå';

function FormikDatepicker<FieldName>({
    validate,
    label,
    dateLimitations,
    name,
    id,
    helperText,
    showYearSelector,
    fullscreenOverlay,
    fullScreenOnMobile,
    feil,
    onChange,
    ...restProps
}: Props<FieldName>) {
    const context = React.useContext(FormikFormContext);
    const isWide = useMedia({ minWidth: 736 });
    const elementId = id || guid();
    const plassering = fullscreenOverlay || (fullScreenOnMobile && isWide === false) ? 'fullskjerm' : undefined;
    const inputName = (name || '') as string;
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <SkjemaGruppeSingleElement feil={context ? context.renderFieldError(field, form, context) : feil}>
                        <Label htmlFor={field.name}>
                            <LabelWithInfo helperText={helperText}>{label}</LabelWithInfo>
                        </Label>
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
                                plassering
                            }}
                            onChange={(dateString: string) => {
                                const date = datepickerUtils.getDateFromDateString(dateString);
                                if (field.value !== date) {
                                    form.setFieldValue(field.name, date);
                                    if (onChange) {
                                        onChange(date);
                                    }
                                }
                            }}
                        />
                    </SkjemaGruppeSingleElement>
                );
            }}
        </Field>
    );
}

export default FormikDatepicker;
