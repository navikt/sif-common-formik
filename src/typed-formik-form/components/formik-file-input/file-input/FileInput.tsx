import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import { NavFrontendSkjemaFeil } from '../../../types';
import CustomInput from '../../helpers/custom-input/CustomInput';
import UploadSvg from './UploadSvg';
import './fileInput.less';

interface FileInputProps {
    id: string;
    label: string;
    name: string;
    onFilesSelect: (files: File[]) => void;
    multiple?: boolean;
    acceptedExtensions: string;
    feil?: NavFrontendSkjemaFeil;
    onClick?: () => void;
}

export default class FileInput extends React.Component<FileInputProps> {
    constructor(props: FileInputProps) {
        super(props);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);
        this.onFileDropHandler = this.onFileDropHandler.bind(this);
        this.onFileDragOverHandler = this.onFileDragOverHandler.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    fileSelectHandler(fileList: FileList) {
        const files = Array.from(fileList) as File[];
        this.props.onFilesSelect(files);
    }

    onFileDragOverHandler(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
    }

    onFileDropHandler(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        this.fileSelectHandler(e.dataTransfer.files);
    }

    onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            this.fileSelectHandler(e.target.files);
            e.target.value = '';
        }
    }

    onKeyPress(e: React.KeyboardEvent<HTMLLabelElement>) {
        const { id } = this.props;
        const ENTER_KEYCODE = 13;
        const inputElement = document.getElementById(id);
        if (e.which === ENTER_KEYCODE && inputElement !== null) {
            inputElement.click();
        }
    }

    render() {
        const { id, name, label, feil, multiple, onClick, acceptedExtensions } = this.props;
        const inputId = `${id}-input`;

        return (
            <CustomInput feil={feil} className={`fileInput ${feil !== undefined ? 'fileInput--withError' : ''}`}>
                <label
                    role="button"
                    id={id}
                    tabIndex={0}
                    htmlFor={inputId}
                    className="attachmentButton"
                    onDragOver={this.onFileDragOverHandler}
                    onDrop={this.onFileDropHandler}
                    onKeyPress={this.onKeyPress}
                    onClick={onClick}>
                    <div className="attachmentButton__icon">
                        <UploadSvg />
                    </div>
                    <Element className="attachmentButton__label">{label}</Element>
                    <input
                        id={inputId}
                        name={name}
                        type="file"
                        accept={acceptedExtensions}
                        onChange={(e) => this.onFileSelect(e)}
                        multiple={multiple === true}
                    />
                </label>
            </CustomInput>
        );
    }
}
