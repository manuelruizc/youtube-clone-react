import React from 'react';
import { VideoAlert } from '../../assets/Icons';

export const VideoWaiting = () => {
    return (
        <div className="video-waiting">
            <img
                alt="Waiting for video..."
                src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
        </div>
    );
};

export const VideoBlocked = () => {
    return (
        <div className="video-blocked">
            <VideoAlert className="video-blocked-icon" />
            <div className="video-blocked-info">
                <span className={'video-blocked-text-title'}>
                    Video unavailable
                </span>
                <span className={'video-blocked-text-subtitle'}>
                    This video is no longer available.
                </span>
            </div>
        </div>
    );
};

export const VideoGeoBlocked = () => {
    return (
        <div className="video-blocked">
            <VideoAlert className="video-blocked-icon" />
            <div className="video-blocked-info">
                <span className={'videonotavailable-text-title'}>
                    Video unavailable
                </span>
                <span className={'videonotavailable-text-subtitle'}>
                    The uploader has not made this video available in your
                    country.
                </span>
            </div>
        </div>
    );
};
