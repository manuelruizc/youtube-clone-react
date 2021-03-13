import React from 'react';
import { CloseButton, Expand, Pause, Play } from '../../assets/Icons';

const VideoContainer = (props) => {
    const { video, playPause, _goToVideo, close, videoNotAvailable } = props;
    let containerClassName = 'miniature-player-content';
    if (videoNotAvailable)
        containerClassName += ' miniature-player-content-not-available';
    return (
        <div
            tabIndex="0"
            onKeyDown={(e) => props.controlVideoWithKeys(e)}
            className={containerClassName}
        >
            {props.children}
            <div onClick={playPause} className="miniature-middle-layer">
                <div
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {!video ? (
                        <Pause size={30} />
                    ) : video.paused ? (
                        <Play size={30} />
                    ) : (
                        <Pause size={30} />
                    )}
                </div>
                <div
                    className={'miniature-player-btn'}
                    onClick={(e) => _goToVideo(e)}
                    style={{ position: 'absolute', top: 8, left: 8 }}
                >
                    <Expand className="miniature-player-icon" />
                </div>
                <div
                    className={'miniature-player-btn'}
                    onClick={close}
                    style={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseButton className="miniature-player-icon" />
                </div>
            </div>
        </div>
    );
};

export default VideoContainer;
