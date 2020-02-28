import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { SelectProps } from 'nav-frontend-skjema';
import CountrySelect from '../../../components/country-select/CountrySelect';
import LabelWithInfo from '../../../components/label-with-info/LabelWithInfo';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name' | 'children'> {
    name: FieldName;
    showOnlyEuAndEftaCountries?: boolean;
}

export type FormikCountrySelectProps<FieldName> = OwnProps<FieldName> & FormikInputCommonProps;

function FormikCountrySelect<FieldName>({
    label,
    name,
    feil,
    validate,
    info,
    showOnlyEuAndEftaCountries
}: FormikCountrySelectProps<FieldName>) {
    const context = React.useContext(FormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CountrySelect
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        {...field}
                        feil={context ? context.renderFieldError(field, form, context) : feil}
                        onChange={(value) => form.setFieldValue(field.name, value)}
                        showOnlyEuAndEftaCountries={showOnlyEuAndEftaCountries}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCountrySelect;
