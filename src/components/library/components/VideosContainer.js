import React from 'react';
import LibraryThumbnail from '../../shared/LibraryThumbnail';
import PlaylistThumbnail from '../../shared/PlaylistThumbnail';

const VideosContainer = ({ videos, pathname, playlist }) => {
    if (videos.length === 0 || !videos) {
        return (
            <div className="library-section-video-container empty">
                <span className="empty-text">
                    Save videos to watch later. Your list shows up right here.
                </span>
            </div>
        );
    }

    return (
        <div className={'library-section-video-container'}>
            {videos.map((video, i) => {
                if (playlist) return <PlaylistThumbnail playlist={video} />;
                return <LibraryThumbnail video={video} />;
            })}
        </div>
    );
};

export default VideosContainer;
