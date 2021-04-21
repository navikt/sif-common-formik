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

export function getTypedFormComponents<FieldName, FormValues>() {
    return {
        Checkbox: (props: FormikCheckboxProps<FieldName>) => <FormikCheckbox<FieldName> {...props} />,
        CheckboxPanelGroup: (props: FormikCheckboxPanelGroupProps<FieldName>) => (
            <FormikCheckboxPanelGroup<FieldName> {...props} />
        ),
        ConfirmationCheckbox: (props: FormikConfirmationCheckboxPanelProps<FieldName>) => (
            <FormikConfirmationCheckboxPanel<FieldName> {...props} />
        ),
        CountrySelect: (props: FormikCountrySelectProps<FieldName>) => <FormikCountrySelect<FieldName> {...props} />,
        DatePicker: (props: FormikDatepickerProps<FieldName>) => <FormikDatepicker<FieldName> {...props} />,
        DateIntervalPicker: (props: DateIntervalPickerProps<FieldName>) => (
            <FormikDateIntervalPicker<FieldName> {...props} />
        ),
        DateRangePicker: (props: FormikDateRangePickerProps<FieldName>) => (
            <FormikDateRangePicker<FieldName> {...props} />
        ),
        FileInput: (props: FormikFileInputProps<FieldName>) => <FormikFileInput<FieldName> {...props} />,
        Form: (props: TypedFormikFormProps<FormValues>) => <TypedFormikForm {...props} />,
        FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => <TypedFormikWrapper {...props} />,
        Input: (props: FormikInputProps<FieldName>) => <FormikInput<FieldName> {...props} />,
        NumberInput: (props: FormikNumberInputProps<FieldName>) => <FormikNumberInput<FieldName> {...props} />,
        InputGroup: (props: FormikInputGroupProps<FieldName>) => <FormikInputGroup<FieldName> {...props} />,
        RadioGroup: (props: FormikRadioGroupProps<FieldName>) => <FormikRadioGroup<FieldName> {...props} />,
        RadioPanelGroup: (props: FormikRadioPanelGroupProps<FieldName>) => (
            <FormikRadioPanelGroup<FieldName> {...props} />
        ),
        Select: (props: FormikSelectProps<FieldName>) => <FormikSelect<FieldName> {...props} />,
        Textarea: (props: FormikTextareaProps<FieldName>) => <FormikTextarea<FieldName> {...props} />,
        TimeInput: (props: FormikTimeInputProps<FieldName>) => <FormikTimeInput<FieldName> {...props} />,
        YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldName>) => (
            <FormikYesOrNoQuestion<FieldName> {...props} />
        ),
    };
}
