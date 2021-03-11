import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistThumbnail = ({
    playlist
}) => {
    const { 
        thumbnail,
        playlist_name,
        playlist_id,
        display_name,
    } = playlist;
    return(
        <Link key={playlist_id} title={playlist_name} className="library-thumbnail" to={'/playlist?list='+playlist_id}>
            <div className="thumb-cnt">
                <img src={thumbnail} alt={''} />
            </div>
            <div className={'thumb-infocontainer'}>
                <div className={'thumb-title-container'}>
                    <span className="tmb-title">{playlist_name}</span>
                    <span className="tmb-channel">{display_name}</span>
                    <span className="tmb-views">View full playlist</span>
                </div>
            </div>
        </Link>
    );
}
 
export default PlaylistThumbnail;