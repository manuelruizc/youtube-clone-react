import React from 'react';
import { Share } from '../../assets/Icons';
import locales from '../../locales/video';

// FEATURE NOT WORKING
const ShareButton = ({ user, updateVisitorModal, modalPlaylist }) => {
    return (
        <span
            onClick={!user ? updateVisitorModal : () => modalPlaylist(false)}
            className="video-actions-container"
        >
            <Share className="video-action-icon" />
            <span>{locales.uploaderInfo.tooltips.share}</span>
        </span>
    );
};

export default ShareButton;
