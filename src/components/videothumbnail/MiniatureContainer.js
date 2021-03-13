import React from 'react';

const MiniatureContainer = (props) => {
    const { title, uploader } = props;
    return (
        <div
            className="miniatureplayer-info-container"
            onClick={(e) => props._goToVideo(e)}
        >
            <span className="video-title">{title}</span>
            <span className="video-uploader">{uploader}</span>
        </div>
    );
};

export default MiniatureContainer;
