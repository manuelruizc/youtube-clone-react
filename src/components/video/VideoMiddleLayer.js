import React from 'react';

const VideoMiddleLayer = (props) => {
    const {
        openFullscreen,
        videoContainer,
        playAndPauseVideo,
        controlVideoWithKeys,
        animationLogo,
        volumeValue,
    } = props;
    return (
        <div
            onDoubleClick={() => openFullscreen(videoContainer)}
            onClick={(e) => playAndPauseVideo(e)}
            className="video-middlelayer"
            id="video-middlelayer"
            onKeyDown={(e) => controlVideoWithKeys(e)}
            tabIndex="0"
        >
            <div className="keyboard-interactions-container">
                <div
                    className="middlelayer-volume-container"
                    id="middlelayer-volume-container"
                >
                    <span className="middlelayer-volume">
                        {volumeValue + '%'}
                    </span>
                </div>
                <span className="keyboard-interactions-logo">
                    <i className={`fa fa-${animationLogo}`}></i>
                </span>
            </div>
        </div>
    );
};

export default VideoMiddleLayer;
