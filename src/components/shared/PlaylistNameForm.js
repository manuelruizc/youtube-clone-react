import React from 'react';
import locales from '../../locales/playlistmodal';

const PlaylistNameForm = (props) => {
    return (
        <div className="playlist-group-form">
            <label>{locales.newPlaylistModal.name.title}</label>
            <input
                type="text"
                placeholder={locales.newPlaylistModal.name.placeholder}
                value={props.playlist_name}
                onChange={(e) => props.updatePlaylistName(e.target.value)}
            />
        </div>
    );
};

export default PlaylistNameForm;
