import * as React from 'react';
import { Field, FieldProps } from 'formik';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import useMedia from 'use-media';
import { guid } from 'nav-frontend-js-utils';
import { Label } from 'nav-frontend-skjema';
import { NavFrontendSkjemaFeil } from '../../types/NavFrontendSkjemaFeil';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import CustomInput from '../helpers/custom-input/CustomInput';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
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
                    <CustomInput feil={context ? context.getAndRenderFieldErrorMessage(field, form) : feil}>
                        <Label htmlFor={field.name}>
                            <LabelWithInfo info={info}>{label}</LabelWithInfo>
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
                    </CustomInput>
                );
            }}
        </Field>
    );
}

export default FormikDatepicker;
