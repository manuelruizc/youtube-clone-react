import React from 'react';
import './css/confirmactionmodal.scss';
import locales from '../../locales/subscriptions';

const ConfirmActionModal = ({
    title,
    description,
    actionButtonTitle,
    action,
    modalSize,
    closeModal
}) => {

    const doAction = () => {
        action();
        closeModal();
    }

    return (
        <div className="confirm-action-modal">
            <div onClick={closeModal} className="confirm-action-backdrop" />
            <div className={modalSize === 'big' ? 'confirm-action-info confirm-action-info--big' : 'confirm-action-info'}>
                {title && (
                    <div className="title-info-container">
                        <h3 className="modal-info-title">{title}</h3>
                    </div>
                )}
                <div className="description-info-container">
                    <span className="modal-info-description" dangerouslySetInnerHTML={{__html: description}}></span>
                </div>
                <div className="confirm-action-options">
                    <span onClick={closeModal}>{locales.confirmModal.cancelButton}</span>
                    <span onClick={doAction}>{actionButtonTitle}</span>
                </div>
            </div>
        </div>
    );
}
 
export default ConfirmActionModal;