import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { guid } from 'nav-frontend-js-utils';
import { Knapp } from 'nav-frontend-knapper';
import SkjemagruppeQuestion from '../../helpers/skjemagruppe-question/SkjemagruppeQuestion';
import DialogFormWrapper, { DialogFormWrapperWidths } from '../dialog-form-wrapper/DialogFormWrapper';
import Modal from '../modal/Modal';
import { ModalFormAndListLabels, ModalFormAndListListItemBase } from '../types';
import './modalFormAndList.less';

type ModalFormRenderer<ItemType> = (props: {
    item?: ItemType;
    allItems?: ItemType[];
    onSubmit: (item: ItemType) => void;
    onCancel: () => void;
}) => React.ReactNode;

type ListRenderer<ItemType> = (props: {
    items: ItemType[];
    onEdit: (item: ItemType) => void;
    onDelete: (item: ItemType) => void;
}) => React.ReactNode;

export interface ModalFormAndListProps<ItemType extends ModalFormAndListListItemBase> {
    labels: ModalFormAndListLabels;
    maxItems?: number;
    listRenderer: ListRenderer<ItemType>;
    formRenderer: ModalFormRenderer<ItemType>;
    dialogWidth?: DialogFormWrapperWidths;
}
interface PrivateProps<ItemType> {
    onChange: (data: ItemType[]) => void;
    items: ItemType[];
    error?: React.ReactNode | boolean;
}

type Props<ItemType> = ModalFormAndListProps<ItemType> & PrivateProps<ItemType>;

function ModalFormAndList<ItemType extends ModalFormAndListListItemBase>({
    items = [],
    listRenderer,
    formRenderer,
    labels,
    error,
    dialogWidth,
    maxItems,
    onChange,
}: Props<ItemType>) {
    const [modalState, setModalState] = React.useState<{ isVisible: boolean; selectedItem?: ItemType }>({
        isVisible: false,
    });

    const handleOnSubmit = (values: ItemType) => {
        if (values.id) {
            onChange([...items.filter((item) => item.id !== values.id), values]);
        } else {
            onChange([...items, { id: guid(), ...values }]);
        }
        setModalState({ isVisible: false });
    };

    const handleEdit = (item: ItemType) => {
        setModalState({ isVisible: true, selectedItem: item });
    };

    const handleDelete = (item: ItemType) => {
        onChange([...items.filter((i) => i.id !== item.id)]);
    };

    const resetModal = () => {
        setModalState({ isVisible: false, selectedItem: undefined });
    };

    const showListTitle = items.length > 0;
    return (
        <>
            <Modal isOpen={modalState.isVisible} contentLabel={labels.modalTitle} onRequestClose={resetModal}>
                <DialogFormWrapper width={dialogWidth}>
                    {formRenderer({
                        onSubmit: handleOnSubmit,
                        onCancel: resetModal,
                        item: modalState.selectedItem,
                        allItems: items,
                    })}
                </DialogFormWrapper>
            </Modal>
            <SkjemagruppeQuestion legend={showListTitle ? labels.listTitle : undefined} feil={error} tag="div">
                {items.length > 0 && (
                    <div className="modalFormAndList__listWrapper">
                        {listRenderer({ items, onEdit: handleEdit, onDelete: handleDelete })}
                    </div>
                )}
                {items.length === 0 && labels.emptyListText && (
                    <div style={{ paddingBottom: '2rem' }}>
                        <AlertStripeInfo>{labels.emptyListText}</AlertStripeInfo>
                    </div>
                )}
                {(maxItems === undefined || maxItems > items.length) && (
                    <div
                        style={showListTitle ? { marginTop: '1rem' } : undefined}
                        className={'modalFormAndList__addButton'}>
                        <Knapp htmlType="button" onClick={() => setModalState({ isVisible: true })} mini={true}>
                            {labels.addLabel}
                        </Knapp>
                    </div>
                )}
            </SkjemagruppeQuestion>
        </>
    );
}

export default ModalFormAndList;
