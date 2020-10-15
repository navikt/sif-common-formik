import React from 'react';
import { Field, FieldProps } from 'formik';
import { SelectProps } from 'nav-frontend-skjema';
import { TypedFormInputCommonProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import LabelWithInfo from '../helpers/label-with-info/LabelWithInfo';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import CountrySelect from './CountrySelect';

interface OwnProps<FieldName> extends Omit<SelectProps, 'name' | 'children'> {
    name: FieldName;
    showOnlyEuAndEftaCountries?: boolean;
    useAlpha3Code?: boolean;
}

export type FormikCountrySelectProps<FieldName> = OwnProps<FieldName> & TypedFormInputCommonProps;

function FormikCountrySelect<FieldName>({
    label,
    name,
    feil,
    validate,
    info,
    useAlpha3Code = true,
    showOnlyEuAndEftaCountries,
}: FormikCountrySelectProps<FieldName>) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <Field validate={validate} name={name}>
            {({ field, form }: FieldProps) => {
                return (
                    <CountrySelect
                        label={<LabelWithInfo info={info}>{label}</LabelWithInfo>}
                        {...field}
                        feil={getFeilPropForFormikInput({ field, form, context, feil })}
                        onChange={(value) => {
                            form.setFieldValue(field.name, value);
                            if (context) {
                                context.onAfterFieldValueSet();
                            }
                        }}
                        showOnlyEuAndEftaCountries={showOnlyEuAndEftaCountries}
                        useAlpha3Code={useAlpha3Code}
                    />
                );
            }}
        </Field>
    );
}

export default FormikCountrySelect;
