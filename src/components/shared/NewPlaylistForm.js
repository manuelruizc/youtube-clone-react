import React from 'react';
import locales from '../../locales/playlistmodal';
import PlaylistNameForm from './PlaylistNameForm';
import PrivacySelection from './PrivacySelection';
import PrivacySelectionContainer from './PrivacySelectionContainer';

const NewPlaylistForm = (props) => {
    return (
        <div className="playlist-name-form">
            <PlaylistNameForm
                playlist_name={props.playlist_name}
                updatePlaylistName={props.updatePlaylistName}
            />
            <PrivacySelectionContainer
                privacyActive={props.privacyActive}
                current_playlist={props.current_playlist}
            >
                {props.isPrivacyOptionActive && (
                    <PrivacySelection
                        selectPrivacy={props.selectPrivacy}
                        playlist={props.playlist}
                    />
                )}
            </PrivacySelectionContainer>
            <span onClick={props.addToPlaylist} className="create-playlist">
                {locales.newPlaylistModal.confirmButton}
            </span>
        </div>
    );
};

export default NewPlaylistForm;
