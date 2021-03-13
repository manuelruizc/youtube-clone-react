import React from 'react';

const VideoModalHeaderSecondaryButton = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className="modal-item-header-secondary-button">
            {children}
        </div>
    );
};

export default VideoModalHeaderSecondaryButton;
