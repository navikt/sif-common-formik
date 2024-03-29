import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Modal, { ModalProps } from 'nav-frontend-modal';
import Panel from 'nav-frontend-paneler';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import DialogFormWrapper, { DialogFormWrapperWidths } from '../dialog-form-wrapper/DialogFormWrapper';
import { ModalFormAndInfoLabels } from '../types';
import './modalFormAndInfo.less';

type ModalFormRenderer<DataType> = (props: {
    data?: DataType;
    onSubmit: (data: DataType) => void;
    onCancel: () => void;
}) => React.ReactNode;

type InfoRenderer<DataType> = (props: {
    data: DataType;
    onEdit: (data: DataType) => void;
    onDelete: (data: DataType) => void;
}) => React.ReactNode;

export interface ModalFormAndInfoProps<DataType> extends Pick<ModalProps, 'shouldCloseOnOverlayClick'> {
    labels: ModalFormAndInfoLabels;
    infoRenderer: InfoRenderer<DataType>;
    formRenderer: ModalFormRenderer<DataType>;
    wrapInfoInFieldset?: boolean;
    renderEditButtons?: boolean;
    renderDeleteButton?: boolean;
    dialogWidth?: DialogFormWrapperWidths;
    dialogClassName?: string;
    wrapInfoInPanel?: boolean;
}
interface PrivateProps<DataType> {
    onDelete: () => void;
    onChange: (data: DataType) => void;
    data?: DataType;
    error?: React.ReactNode | boolean;
}

type Props<DataType> = ModalFormAndInfoProps<DataType> &
    PrivateProps<DataType> &
    Pick<ModalProps, 'shouldCloseOnOverlayClick'>;

function ModalFormAndInfo<DataType>({
    data,
    labels,
    error,
    dialogWidth,
    renderEditButtons = false,
    renderDeleteButton = true,
    dialogClassName,
    wrapInfoInPanel = true,
    shouldCloseOnOverlayClick = false,
    wrapInfoInFieldset = true,
    infoRenderer,
    formRenderer,
    onDelete,
    onChange,
}: Props<DataType>) {
    const [modalState, setModalState] = React.useState<{ isVisible: boolean; data?: DataType }>({
        isVisible: false,
    });

    const handleOnSubmit = (values: DataType) => {
        onChange(values);
        setModalState({ isVisible: false });
    };

    const handleEdit = (data: DataType) => {
        setModalState({ isVisible: true, data });
    };

    const handleDelete = () => {
        onDelete();
    };

    const resetModal = () => {
        setModalState({ isVisible: false, data: undefined });
    };

    const content =
        data === undefined ? (
            <Knapp htmlType="button" onClick={() => setModalState({ isVisible: true, data })} mini={true}>
                {labels.addLabel}
            </Knapp>
        ) : (
            <>
                <div className="modalFormAndInfo__infoWrapper">
                    {wrapInfoInPanel ? (
                        <Panel border={true} className={'modalFormAndInfo__infoWrapper__panel'}>
                            {infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete })}
                        </Panel>
                    ) : (
                        infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete })
                    )}
                </div>
                {renderEditButtons && (
                    <div className={'modalFormAndInfo__buttons'}>
                        <Knapp htmlType="button" onClick={() => setModalState({ isVisible: true, data })} mini={true}>
                            {data ? labels.editLabel : labels.addLabel}
                        </Knapp>
                        {renderDeleteButton && (
                            <Knapp
                                htmlType="button"
                                onClick={() => {
                                    onDelete();
                                }}
                                mini={true}>
                                {labels.deleteLabel}
                            </Knapp>
                        )}
                    </div>
                )}
            </>
        );

    return (
        <>
            <Modal
                className={dialogClassName}
                isOpen={modalState.isVisible}
                contentLabel={labels.modalTitle}
                shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
                onRequestClose={resetModal}>
                <DialogFormWrapper width={dialogWidth}>
                    {formRenderer({
                        onSubmit: handleOnSubmit,
                        onCancel: resetModal,
                        data: modalState.data,
                    })}
                </DialogFormWrapper>
            </Modal>
            {wrapInfoInFieldset === true ? (
                <SkjemagruppeQuestion feil={error} legend={labels.infoTitle}>
                    {content}
                </SkjemagruppeQuestion>
            ) : (
                content
            )}
        </>
    );
}

export default ModalFormAndInfo;
