import React from 'react';

const VideoModalHeaderButton = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className="modal-item-header-button">
            {children}
        </div>
    );
};

export default VideoModalHeaderButton;
