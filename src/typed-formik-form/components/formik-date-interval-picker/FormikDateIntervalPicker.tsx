import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { TypedFormInputCommonProps } from '../../types';
import FormikDatepicker, { FormikDatepickerProps } from '../formik-datepicker/FormikDatepicker';
import FormikInputGroup from '../formik-input-group/FormikInputGroup';
import './dateIntervalPicker.less';

export interface DateIntervalPickerProps<FieldName> extends TypedFormInputCommonProps {
    legend?: string;
    fromDatepickerProps: FormikDatepickerProps<FieldName>;
    toDatepickerProps: FormikDatepickerProps<FieldName>;
    description?: React.ReactNode;
}

function FormikDateIntervalPicker<FieldName>({
    legend,
    fromDatepickerProps,
    toDatepickerProps,
    description,
    validate,
}: DateIntervalPickerProps<FieldName>) {
    const name = `${fromDatepickerProps.name}_${toDatepickerProps.name}`;
    return (
        <FormikInputGroup
            name={name}
            validate={validate}
            legend={legend ? <Element tag="div">{legend}</Element> : undefined}
            description={description}
            className="dateIntervalPicker">
            <div className="dateIntervalPicker__flexContainer">
                <FormikDatepicker<FieldName> {...fromDatepickerProps} />
                <FormikDatepicker<FieldName> {...toDatepickerProps} />
            </div>
        </FormikInputGroup>
    );
}

export default FormikDateIntervalPicker;
