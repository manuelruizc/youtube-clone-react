import React from 'react';

const VideoModalHeader = ({ single, children }) => {
    let className = 'video-modal-item-header';
    if (single) className += ' single-item';
    return <div className={className}>{children}</div>;
};

export default VideoModalHeader;
