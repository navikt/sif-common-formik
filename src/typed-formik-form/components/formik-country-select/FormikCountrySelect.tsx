import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { SelectProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import CountrySelect from './CountrySelect';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name' | 'children'> {
    name: FieldName;
    showOnlyEuAndEftaCountries?: boolean;
}

export type FormikCountrySelectProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikCountrySelect<FieldName>({
    label,
    name,
    feil,
    validate,
    info,
    showOnlyEuAndEftaCountries
}: FormikCountrySelectProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CountrySelect
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        {...field}
                        feil={context ? context.getAndRenderFieldErrorMessage(field, form) : feil}
                        onChange={(value) => form.setFieldValue(field.name, value)}
                        showOnlyEuAndEftaCountries={showOnlyEuAndEftaCountries}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCountrySelect;
