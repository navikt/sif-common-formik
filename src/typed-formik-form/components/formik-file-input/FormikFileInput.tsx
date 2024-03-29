import React from 'react';
import { ArrayHelpers, Field, FieldArray, FieldProps } from 'formik';
import { NavFrontendSkjemaFeil, TypedFormInputValidationProps } from '../../types';
import { getFeilPropForFormikInput } from '../../utils/typedFormErrorUtils';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import FileInput from './file-input/FileInput';

export interface FormikFileInputProps<FieldName> {
    name: FieldName;
    label: string;
    acceptedExtensions: string;
    feil?: NavFrontendSkjemaFeil;
    onFilesSelect: (files: File[], arrayHelpers: ArrayHelpers) => void;
    onClick?: () => void;
}

function FormikFileInput<FieldName, ErrorType>({
    label,
    name,
    acceptedExtensions,
    validate,
    onFilesSelect,
    feil,
    onClick,
}: FormikFileInputProps<FieldName> & TypedFormInputValidationProps<FieldName, ErrorType>) {
    const context = React.useContext(TypedFormikFormContext);

    return (
        <FieldArray
            name={`${name}`}
            render={(arrayHelpers) => (
                <Field validate={validate ? (value: any) => validate(value, name) : undefined} name={name}>
                    {({ field, form }: FieldProps) => {
                        return (
                            <FileInput
                                id={field.name}
                                name={field.name}
                                label={label}
                                onClick={onClick}
                                onFilesSelect={(files) => onFilesSelect(files, arrayHelpers)}
                                multiple={true}
                                acceptedExtensions={acceptedExtensions}
                                feil={getFeilPropForFormikInput({ field, form, context, feil })}
                            />
                        );
                    }}
                </Field>
            )}
        />
    );
}

export default FormikFileInput;
