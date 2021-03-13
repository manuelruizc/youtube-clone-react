import React from 'react';
import locales from '../../locales/playlistmodal';

const PrivacySelectionContainer = (props) => {
    return (
        <div className="playlist-group-form">
            <label>{locales.newPlaylistModal.privacy.title}</label>
            <div className="select-privacy">
                <div
                    className="active-privacy"
                    onClick={() => props.privacyActive(false)}
                    data-value={props.current_playlist.value}
                >
                    {props.current_playlist.title}
                </div>
                <i className={'fa fa-caret-down'} />
                {props.children}
            </div>
        </div>
    );
};

export default PrivacySelectionContainer;
