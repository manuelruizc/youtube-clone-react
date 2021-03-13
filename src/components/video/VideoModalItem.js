import React from 'react';

const VideoModalItem = ({ children, onClick }) => {
    return (
        <div onClick={onClick} className={'video-options-modal-item'}>
            {children}
        </div>
    );
};

export default VideoModalItem;
