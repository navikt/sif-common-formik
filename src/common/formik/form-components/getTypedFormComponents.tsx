import React from 'react';
import { FormikErrors } from 'formik';
import FormikForm, { FormikFormProps } from './formik-form/FormikForm';
import FormikWrapper, { FormikWrapperProps } from './formik-wrapper/FormikWrapper';
import FormikCheckboxPanelGroup, {
    FormikCheckboxPanelGroupProps
} from './inputs/formik-checkbox-panel-group/FormikCheckboxPanelGroup';
import FormikCheckbox, { FormikCheckboxProps } from './inputs/formik-checkbox/FormikCheckbox';
import FormikConfirmationCheckboxPanel, {
    FormikConfirmationCheckboxPanelProps
} from './inputs/formik-confirmation-checkbox-panel/FormikConfirmationCheckboxPanel';
import FormikCountrySelect, {
    FormikCountrySelectProps
} from './inputs/formik-country-select/FormikCountrySelect';
import FormikDateIntervalPicker, {
    DateIntervalPickerProps
} from './inputs/formik-date-interval-picker/FormikDateIntervalPicker';
import FormikDatepicker, {
    FormikDatepickerProps
} from './inputs/formik-datepicker/FormikDatepicker';
import FormikFileInput, { FormikFileInputProps } from './inputs/formik-file-input/FormikFileInput';
import FormikInputGroup, {
    FormikInputGroupProps
} from './inputs/formik-input-group/FormikInputGroup';
import FormikInput, { FormikInputProps } from './inputs/formik-input/FormikInput';
import FormikRadioPanelGroup, {
    FormikRadioPanelGroupProps
} from './inputs/formik-radio-panel-group/FormikRadioPanelGroup';
import FormikSelect, { FormikSelectProps } from './inputs/formik-select/FormikSelect';
import FormikTextarea, { FormikTextareaProps } from './inputs/formik-textarea/FormikTextarea';
import FormikYesOrNoQuestion, {
    FormikYesOrNoQuestionProps
} from './inputs/formik-yes-or-no-question/FormikYesOrNoQuestion';

export function getTypedFormComponents<FieldNames, FormValues, FieldValidationError = FormikErrors<FormValues>>() {
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
        Form: (props: FormikFormProps<FormValues, FieldValidationError>) => <FormikForm {...props} />,
        FormikWrapper: (props: FormikWrapperProps<FormValues>) => <FormikWrapper {...props} />,
        Input: (props: FormikInputProps<FieldNames>) => <FormikInput<FieldNames> {...props} />,
        InputGroup: (props: FormikInputGroupProps<FieldNames>) => <FormikInputGroup<FieldNames> {...props} />,
        RadioPanelGroup: (props: FormikRadioPanelGroupProps<FieldNames>) => (
            <FormikRadioPanelGroup<FieldNames> {...props} />
        ),
        Select: (props: FormikSelectProps<FieldNames>) => <FormikSelect<FieldNames> {...props} />,
        Textarea: (props: FormikTextareaProps<FieldNames>) => <FormikTextarea<FieldNames> {...props} />,
        YesOrNoQuestion: (props: FormikYesOrNoQuestionProps<FieldNames>) => (
            <FormikYesOrNoQuestion<FieldNames> {...props} />
        )
    };
}
