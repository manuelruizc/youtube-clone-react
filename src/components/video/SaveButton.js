import React from 'react';
import { Save } from '../../assets/Icons';
import locales from '../../locales/video';

const SaveButton = ({ user, updateVisitorModal, modalPlaylist }) => {
    return (
        <span
            onClick={!user ? updateVisitorModal : () => modalPlaylist(false)}
            className="video-actions-container"
        >
            <Save className="video-action-icon" />
            <span>{locales.uploaderInfo.tooltips.save}</span>
        </span>
    );
};

export default SaveButton;
