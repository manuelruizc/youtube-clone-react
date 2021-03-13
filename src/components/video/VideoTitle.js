import React from 'react';

const VideoTitle = (props) => {
    const {
        isFullScreenActive,
        hideControls,
        current_video_data,
        paused,
    } = props;
    return (
        <div
            style={{
                opacity: !isFullScreenActive
                    ? 0
                    : paused
                    ? 1
                    : hideControls
                    ? 0
                    : 1,
            }}
            className="fullscreen-title--container"
        >
            <span className={'fullscreen-title'}>
                {current_video_data ? current_video_data.title : ''}
            </span>
        </div>
    );
};

export default VideoTitle;
