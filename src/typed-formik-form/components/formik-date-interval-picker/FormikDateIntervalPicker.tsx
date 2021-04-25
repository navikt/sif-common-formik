import React from 'react';
import { Element } from 'nav-frontend-typografi';
import { TypedFormInputValidationProps } from '../../types';
import FormikDatepicker, { FormikDatepickerProps } from '../formik-datepicker/FormikDatepicker';
import FormikInputGroup from '../formik-input-group/FormikInputGroup';
import './dateIntervalPicker.less';

export interface DateIntervalPickerProps<FieldName, ErrorType>
    extends TypedFormInputValidationProps<FieldName, ErrorType> {
    legend?: string;
    fromDatepickerProps: FormikDatepickerProps<FieldName, ErrorType>;
    toDatepickerProps: FormikDatepickerProps<FieldName, ErrorType>;
    description?: React.ReactNode;
}

function FormikDateIntervalPicker<FieldName, ErrorType>({
    legend,
    fromDatepickerProps,
    toDatepickerProps,
    description,
    validate,
}: DateIntervalPickerProps<FieldName, ErrorType>) {
    const name = `${fromDatepickerProps.name}_${toDatepickerProps.name}` as any;
    return (
        <FormikInputGroup
            name={name}
            validate={validate ? (value) => validate(value, name) : undefined}
            legend={legend ? <Element tag="div">{legend}</Element> : undefined}
            description={description}
            className="dateIntervalPicker">
            <div className="dateIntervalPicker__flexContainer">
                <FormikDatepicker<FieldName, ErrorType> {...fromDatepickerProps} />
                <FormikDatepicker<FieldName, ErrorType> {...toDatepickerProps} />
            </div>
        </FormikInputGroup>
    );
}

export default FormikDateIntervalPicker;
