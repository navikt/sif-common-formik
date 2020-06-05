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
import FormikDatepicker, { FormikDatepickerProps } from './formik-datepicker/FormikDatepicker';
import FormikFileInput, { FormikFileInputProps } from './formik-file-input/FormikFileInput';
import FormikInputGroup, { FormikInputGroupProps } from './formik-input-group/FormikInputGroup';
import FormikInput, { FormikInputProps } from './formik-input/FormikInput';
import FormikRadioPanelGroup, { FormikRadioPanelGroupProps } from './formik-radio-panel-group/FormikRadioPanelGroup';
import FormikSelect, { FormikSelectProps } from './formik-select/FormikSelect';
import FormikTextarea, { FormikTextareaProps } from './formik-textarea/FormikTextarea';
import FormikTimeInput, { FormikTimeInputProps } from './formik-time-input/FormikTimeInput';
import FormikYesOrNoQuestion, { FormikYesOrNoQuestionProps } from './formik-yes-or-no-question/FormikYesOrNoQuestion';
import TypedFormikForm, { TypedFormikFormProps } from './typed-formik-form/TypedFormikForm';
import TypedFormikWrapper, { TypedFormikWrapperProps } from './typed-formik-wrapper/TypedFormikWrapper';
import '../styles/nav-frontend-skjema-extension.less';

export function getTypedFormComponents<FieldNames, FormValues>() {
    return {
        Checkbox: (props: FormikCheckboxProps<FieldNames>) => <FormikCheckbox<FieldNames> {...props} />,
        CheckboxPanelGroup: (props: FormikCheckboxPanelGroupProps<FieldNames>) => (
            <FormikCheckboxPanelGroup<FieldNames> {...props} />
        ),
        ConfirmationCheckbox: (props: FormikConfirmationCheckboxPanelProps<FieldNames>) => (
            <FormikConfirmationCheckboxPanel<FieldNames> {...props} />
        ),
        CountrySelect: (props: FormikCountrySelectProps<FieldNames>) => <FormikCountrySelect<FieldNames> {...props} />,
        DatePicker: (props: FormikDatepickerProps<FieldNames>) => <FormikDatepicker<FieldNames> {...props} />,
        DateIntervalPicker: (props: DateIntervalPickerProps<FieldNames>) => (
            <FormikDateIntervalPicker<FieldNames> {...props} />
        ),
        FileInput: (props: FormikFileInputProps<FieldNames>) => <FormikFileInput<FieldNames> {...props} />,
        Form: (props: TypedFormikFormProps<FormValues>) => <TypedFormikForm {...props} />,
        FormikWrapper: (props: TypedFormikWrapperProps<FormValues>) => <TypedFormikWrapper {...props} />,
        Input: (props: FormikInputProps<FieldNames>) => <FormikInput<FieldNames> {...props} />,
        InputGroup: (props: FormikInputGroupProps<FieldNames>) => <FormikInputGroup<FieldNames> {...props} />,
        RadioPanelGroup: (props: FormikRadioPanelGroupProps<FieldNames>) => (
            <FormikRadioPanelGroup<FieldNames> {...props} />
        ),
        Select: (props: FormikSelectProps<FieldNames>) => <FormikSelect<FieldNames> {...props} />,
        Textarea: (props: FormikTextareaProps<FieldNames>) => <FormikTextarea<FieldNames> {...props} />,
        TimeInput: (props: FormikTimeInputProps<FieldNames>) => <FormikTimeInput<FieldNames> {...props} />,
        YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldNames>) => (
            <FormikYesOrNoQuestion<FieldNames> {...props} />
        ),
    };
}
