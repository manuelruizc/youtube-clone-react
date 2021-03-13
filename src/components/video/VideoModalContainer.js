import React from 'react';

const VideoModalContainer = ({ videoModal, children, isCogActive }) => {
    let className = 'video-options-modal';
    if (!isCogActive) {
        className += ' video-options-modal--unactive';
    }
    return (
        <div ref={videoModal} className={className}>
            {children}
        </div>
    );
};

export default VideoModalContainer;
