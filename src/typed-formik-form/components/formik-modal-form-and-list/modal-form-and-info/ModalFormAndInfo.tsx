import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import DialogFormWrapper, { DialogFormWrapperWidths } from '../dialog-form-wrapper/DialogFormWrapper';
import Modal from '../modal/Modal';
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

export interface ModalFormAndInfoProps<DataType> {
    labels: ModalFormAndInfoLabels;
    infoRenderer: InfoRenderer<DataType>;
    formRenderer: ModalFormRenderer<DataType>;
    renderEditButtons?: boolean;
    dialogWidth?: DialogFormWrapperWidths;
}
interface PrivateProps<DataType> {
    onDelete: () => void;
    onChange: (data: DataType) => void;
    data: DataType;
    error?: React.ReactNode | boolean;
}

type Props<DataType> = ModalFormAndInfoProps<DataType> & PrivateProps<DataType>;

function ModalFormAndInfo<DataType>({
    data,
    labels,
    error,
    dialogWidth,
    renderEditButtons = false,
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

    return (
        <>
            <Modal isOpen={modalState.isVisible} contentLabel={labels.modalTitle} onRequestClose={resetModal}>
                <DialogFormWrapper width={dialogWidth}>
                    {formRenderer({
                        onSubmit: handleOnSubmit,
                        onCancel: resetModal,
                        data: modalState.data,
                    })}
                </DialogFormWrapper>
            </Modal>
            <SkjemagruppeQuestion feil={error} tag="div" legend={labels.infoTitle}>
                {data === undefined && (
                    <Knapp htmlType="button" onClick={() => setModalState({ isVisible: true, data })} mini={true}>
                        {labels.addLabel}
                    </Knapp>
                )}
                {data !== undefined && (
                    <>
                        <div className="modalFormAndInfo__infoWrapper">
                            <Panel border={true} style={{ padding: '1rem' }}>
                                {infoRenderer({ data, onEdit: handleEdit, onDelete: handleDelete })}
                            </Panel>
                        </div>
                        {renderEditButtons && (
                            <div className={'modalFormAndInfo__buttons'}>
                                <Knapp
                                    htmlType="button"
                                    onClick={() => setModalState({ isVisible: true, data })}
                                    mini={true}>
                                    {data ? labels.editLabel : labels.addLabel}
                                </Knapp>
                                <Knapp
                                    htmlType="button"
                                    onClick={() => {
                                        onDelete();
                                    }}
                                    mini={true}>
                                    {labels.deleteLabel}
                                </Knapp>
                            </div>
                        )}
                    </>
                )}
            </SkjemagruppeQuestion>
        </>
    );
}

export default ModalFormAndInfo;
