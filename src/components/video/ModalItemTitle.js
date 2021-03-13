import React from 'react';

const ModalItemTitle = ({ children, single }) => (
    <span className={`video-modal-item-title${single ? ' single-item' : ''}`}>
        {children}
    </span>
);

export default ModalItemTitle;
