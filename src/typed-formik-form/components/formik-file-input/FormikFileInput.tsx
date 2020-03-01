import * as React from 'react';
import { ArrayHelpers, Field, FieldArray, FieldProps } from 'formik';
import { FieldValidationError } from '../../types/FieldValidationError';
import { TypedFormInputCommonProps } from '../../types/TypedFormInputCommonProps';
import { TypedFormikFormContext } from '../typed-formik-form/TypedFormikForm';
import FileInput from './file-input/FileInput';

export interface FormikFileInputProps<FieldName> {
    name: FieldName;
    label: string;
    acceptedExtensions: string;
    feil?: FieldValidationError;
    onFilesSelect: (files: File[], arrayHelpers: ArrayHelpers) => void;
    onClick?: () => void;
}

function FormikFileInput<FieldName>({
    label,
    name,
    acceptedExtensions,
    validate,
    onFilesSelect,
    feil,
    onClick
}: FormikFileInputProps<FieldName> & TypedFormInputCommonProps) {
    const context = React.useContext(TypedFormikFormContext);
    return (
        <FieldArray
            name={`${name}`}
            render={(arrayHelpers) => (
                <Field validate={validate} name={name}>
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
                                feil={context ? context.renderFieldError(field, form) : feil}
                            />
                        );
                    }}
                </Field>
            )}
        />
    );
}

export default FormikFileInput;