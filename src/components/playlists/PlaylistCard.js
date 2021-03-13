import React, { useState } from 'react';
import AddToPlaylistModal from '../shared/AddToPlaylistModal';
import Overlay from '../shared/Overlay';
import OptionsButton from './OptionsButton';

const PlaylistCard = ({
    video,
    index,
    isMiniPlayerActive,
    currentVideo,
    search,
    getVideos,
    user,
    playlistName,
    addToastNotification,
    GoToMiniaturePlayerVideo,
    PlayOnMiniaturePlayer,
    GoToVideo,
    playlistData,
    getLikedVideos,
}) => {
    const [playlistModal, setPlaylistModal] = useState(false);
    const { video_id, current_length, length } = video;
    const pathname = current_length
        ? current_length === length
            ? `/watch?v=${video_id}`
            : `/watch?v=${video_id}&t=${current_length}s`
        : `/watch?v=${video_id}`;
    return (
        <div key={video.id} className="playlist-video">
            <span className="number">{index + 1}</span>
            <a
                href={pathname}
                className="video-basic-data"
                onClick={(e) => {
                    e.preventDefault();
                    isMiniPlayerActive
                        ? video_id === currentVideo.id
                            ? GoToMiniaturePlayerVideo(video)
                            : PlayOnMiniaturePlayer(video)
                        : GoToVideo(video);
                }}
            >
                <div
                    style={{ backgroundImage: `url("${video.thumbnail}")` }}
                    className="video-thumb"
                >
                    <span>{video.video_duration}</span>
                    {video.current_length !== undefined && (
                        <div className="video_current_progress">
                            <div
                                style={{
                                    width:
                                        (100 / video.length) *
                                            video.current_length +
                                        '%',
                                }}
                            />
                        </div>
                    )}
                    {currentVideo && isMiniPlayerActive
                        ? video_id === currentVideo.id && <Overlay />
                        : null}
                </div>
                <div className="video-title-channel-container">
                    <span className="video-title">{video.video_title}</span>
                    <span className="video-channel">{video.video_channel}</span>
                </div>
            </a>
            <OptionsButton
                search={search}
                getVideos={getVideos}
                user={user}
                video={video}
                playlistName={playlistName}
                openPlaylist={() => setPlaylistModal(true)}
                changeModalStatus={setPlaylistModal}
                addToastNotification={addToastNotification}
                playlistData={playlistData}
                getLikedVideos={getLikedVideos}
            />
            {playlistModal && (
                <AddToPlaylistModal
                    isParentAThumbnail={true}
                    modalPlaylist={() => setPlaylistModal(false)}
                    uri={video.video_id}
                    current_video_data={{
                        title: video.video_title,
                        author: video.video_channel,
                        video_thumbnail: video.thumbnail,
                        length_seconds: video.video_duration,
                    }}
                />
            )}
        </div>
    );
};

export default PlaylistCard;
