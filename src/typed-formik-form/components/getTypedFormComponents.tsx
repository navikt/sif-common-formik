/* eslint-disable react/display-name */
import React from 'react';
import FormikCheckboxPanelGroup, {
    FormikCheckboxPanelGroupProps,
} from './formik-checkbox-panel-group/FormikCheckboxPanelGroup';
import FormikCheckbox, { FormikCheckboxProps } from './formik-checkbox/FormikCheckbox';
import FormikConfirmationCheckboxPanel, {
    FormikConfirmationCheckboxPanelProps,
} from './formik-confirmation-checkbox-panel/FormikConfirmationCheckboxPanel';
import FormikCountrySelect, { FormikCountrySelectProps } from './formik-country-select/FormikCountrySelect';
import FormikDateIntervalPicker, {
    DateIntervalPickerProps,
} from './formik-date-interval-picker/FormikDateIntervalPicker';
import FormikDateRangePicker, { FormikDateRangePickerProps } from './formik-date-range-picker/FormikDateRangePicker';
import FormikDatepicker, { FormikDatepickerProps } from './formik-datepicker/FormikDatepicker';
import FormikFileInput, { FormikFileInputProps } from './formik-file-input/FormikFileInput';
import FormikInputGroup, { FormikInputGroupProps } from './formik-input-group/FormikInputGroup';
import FormikInput, { FormikInputProps } from './formik-input/FormikInput';
import FormikNumberInput, { FormikNumberInputProps } from './formik-number-input/FormikNumberInput';
import FormikRadioGroup, { FormikRadioGroupProps } from './formik-radio-group/FormikRadioGroup';
import FormikRadioPanelGroup, { FormikRadioPanelGroupProps } from './formik-radio-panel-group/FormikRadioPanelGroup';
import FormikSelect, { FormikSelectProps } from './formik-select/FormikSelect';
import FormikTextarea, { FormikTextareaProps } from './formik-textarea/FormikTextarea';
import FormikTimeInput, { FormikTimeInputProps } from './formik-time-input/FormikTimeInput';
import FormikYesOrNoQuestion, { FormikYesOrNoQuestionProps } from './formik-yes-or-no-question/FormikYesOrNoQuestion';
import TypedFormikForm, { TypedFormikFormProps } from './typed-formik-form/TypedFormikForm';
import TypedFormikWrapper, { TypedFormikWrapperProps } from './typed-formik-wrapper/TypedFormikWrapper';
import '../styles/nav-frontend-skjema-extension.less';

export function getTypedFormComponents<FieldName, FormValues, ErrorType>() {
    return {
        Checkbox: (props: FormikCheckboxProps<FieldName, ErrorType>) => (
            <FormikCheckbox<FieldName, ErrorType> {...props} />
        ),
        CheckboxPanelGroup: (props: FormikCheckboxPanelGroupProps<FieldName, ErrorType>) => (
            <FormikCheckboxPanelGroup<FieldName, ErrorType> {...props} />
        ),
        ConfirmationCheckbox: (props: FormikConfirmationCheckboxPanelProps<FieldName, ErrorType>) => (
            <FormikConfirmationCheckboxPanel<FieldName, ErrorType> {...props} />
        ),
        CountrySelect: (props: FormikCountrySelectProps<FieldName, ErrorType>) => (
            <FormikCountrySelect<FieldName, ErrorType> {...props} />
        ),
        DatePicker: (props: FormikDatepickerProps<FieldName, ErrorType>) => (
            <FormikDatepicker<FieldName, ErrorType> {...props} />
        ),
        DateIntervalPicker: (props: DateIntervalPickerProps<FieldName, ErrorType>) => (
            <FormikDateIntervalPicker<FieldName, ErrorType> {...props} />
        ),
        DateRangePicker: (props: FormikDateRangePickerProps<FieldName, ErrorType>) => (
            <FormikDateRangePicker<FieldName, ErrorType> {...props} />
        ),
        FileInput: (props: FormikFileInputProps<FieldName>) => <FormikFileInput<FieldName, ErrorType> {...props} />,
        Form: (props: TypedFormikFormProps<FormValues, ErrorType>) => <TypedFormikForm {...props} />,
        FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => <TypedFormikWrapper {...props} />,
        Input: (props: FormikInputProps<FieldName, ErrorType>) => <FormikInput<FieldName, ErrorType> {...props} />,
        NumberInput: (props: FormikNumberInputProps<FieldName, ErrorType>) => (
            <FormikNumberInput<FieldName, ErrorType> {...props} />
        ),
        InputGroup: (props: FormikInputGroupProps<ErrorType, FieldName>) => (
            <FormikInputGroup<ErrorType, FieldName> {...props} />
        ),
        RadioGroup: (props: FormikRadioGroupProps<FieldName, ErrorType>) => (
            <FormikRadioGroup<FieldName, ErrorType> {...props} />
        ),
        RadioPanelGroup: (props: FormikRadioPanelGroupProps<FieldName, ErrorType>) => (
            <FormikRadioPanelGroup<FieldName, ErrorType> {...props} />
        ),
        Select: (props: FormikSelectProps<FieldName, ErrorType>) => <FormikSelect<FieldName, ErrorType> {...props} />,
        Textarea: (props: FormikTextareaProps<FieldName, ErrorType>) => (
            <FormikTextarea<FieldName, ErrorType> {...props} />
        ),
        TimeInput: (props: FormikTimeInputProps<FieldName, ErrorType>) => (
            <FormikTimeInput<FieldName, ErrorType> {...props} />
        ),
        YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName, ErrorType>) => (
            <FormikYesOrNoQuestion<FieldName, ErrorType> {...props} />
        ),
    };
}
