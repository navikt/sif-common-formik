import * as React from 'react';
import { ArrayHelpers, Field, FieldArray, FieldProps } from 'formik';
import FileInput from '../../../components/file-input/FileInput';
import { FieldValidationError } from '../../../types/FieldValidationError';
import { FormikInputCommonProps } from '../../../types/FormikInputCommonProps';
import { FormikFormContext } from '../../formik-form/FormikForm';

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
}: FormikFileInputProps<FieldName> & FormikInputCommonProps) {
    const context = React.useContext(FormikFormContext);
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
                                feil={context ? context.renderFieldError(field, form, context) : feil}
                            />
                        );
                    }}
                </Field>
            )}
        />
    );
}

export default FormikFileInput;
