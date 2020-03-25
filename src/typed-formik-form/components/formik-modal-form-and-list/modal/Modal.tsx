import * as React from 'react';
import { default as NFModal } from 'nav-frontend-modal';
import './modal.less';

export interface ModalProps {
    className?: string;
    isOpen: boolean;
    onRequestClose: () => void;
    contentLabel: string;
    shouldCloseOnOverlayClick?: boolean;
}

const Modal: React.FunctionComponent<ModalProps> = ({
    isOpen,
    onRequestClose,
    contentLabel,
    className,
    shouldCloseOnOverlayClick = false,
    children
}) => (
    <NFModal
        className={`modal ${className ? className : ''}`}
        isOpen={isOpen}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        contentLabel={contentLabel}
        onRequestClose={onRequestClose}>
        <article className="modal__content">{children}</article>
    </NFModal>
);

export default Modal;
