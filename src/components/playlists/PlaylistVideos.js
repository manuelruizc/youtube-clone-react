import React from 'react';
import {
    _goToVideo,
    _navigateToMiniPlayerVideo,
    _playOnMiniPlayer,
} from '../../helpers/navigation';
import locales from '../../locales/playlist';
import PlaylistCard from './PlaylistCard';

const PlaylistVideos = (props) => {
    const {
        updateLoadingState,
        updateCurrentVideoData,
        mutateRelatedVideos,
        updateVideoThumb,
        miniPlayerInfo,
        history,
        currentVideo,
        videos,
        search,
        getVideos,
        user,
        addToastNotification,
        getLikedVideos,
    } = props;
    const GoToVideo = async (video) => {
        let video_object = video;
        video_object['uri'] = video.video_id;
        await _goToVideo(
            video_object,
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            history
        );
    };

    const PlayOnMiniaturePlayer = async (video) => {
        let video_object = video;
        video_object['uri'] = video.video_id;
        await _playOnMiniPlayer(
            video_object,
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            updateVideoThumb
        );
    };

    const GoToMiniaturePlayerVideo = async (video) => {
        let video_object = video;
        video_object['uri'] = video.video_id;
        await _navigateToMiniPlayerVideo(
            video_object,
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            history
        );
    };

    const isMiniPlayerActive = miniPlayerInfo
        ? miniPlayerInfo.thumbnail
        : false;

    if (videos.length === 0) {
        return <span className="playlist-empty-text">{locales.noVideos}</span>;
    }

    return (
        <>
            {videos.map((video, index) => {
                return (
                    <PlaylistCard
                        key={video.id}
                        video={video}
                        index={index}
                        isMiniPlayerActive={isMiniPlayerActive}
                        currentVideo={currentVideo}
                        search={search}
                        getVideos={getVideos}
                        user={user}
                        playlistName={props.playlistName}
                        playlistData={props.playlistData}
                        getLikedVideos={getLikedVideos}
                        addToastNotification={addToastNotification}
                        GoToMiniaturePlayerVideo={GoToMiniaturePlayerVideo}
                        PlayOnMiniaturePlayer={PlayOnMiniaturePlayer}
                        GoToVideo={GoToVideo}
                    />
                );
            })}
        </>
    );
};

export default PlaylistVideos;
