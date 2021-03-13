import moment from 'moment';
import React from 'react';
import {
    _goToVideo,
    _navigateToMiniPlayerVideo,
    _playOnMiniPlayer,
} from '../../helpers/navigation';
import locales from '../../locales/historial';
import HistoryVideoThumbnail from '../shared/HistoryVideoThumbnail';

const HistoryVideos = (props) => {
    const {
        videoGroup,
        search,
        getVideos,
        user,
        updateLoadingState,
        updateCurrentVideoData,
        mutateRelatedVideos,
        updateVideoThumb,
        miniPlayerInfo,
        history,
        currentVideo,
    } = props;

    const formatDate = (groupDate) => {
        const currentDate = moment(new Date());
        groupDate = moment(groupDate);
        const groupDateFormat = groupDate.format();
        // const currentDateFormat = currentDate.format();
        const dateDifference = currentDate.diff(groupDateFormat);
        if (dateDifference < 604800000) return groupDate.format('dddd');
        else return groupDate.format('MMM DD');
    };

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

    if (videoGroup.length === 0) {
        return (
            <span className="playlist-empty-text">
                {locales.watch.noVideos}
            </span>
        );
    }
    return (
        <>
            {videoGroup.map((videoGroupItem, index) => {
                const { date, videos } = videoGroupItem;
                return (
                    <React.Fragment key={date + videos.length + index}>
                        <h4
                            style={{
                                marginLeft: '20px',
                                marginTop: '40px',
                                marginBottom: '20px',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                            }}
                        >
                            {formatDate(date)}
                        </h4>
                        {videos.map((video, index) => {
                            const { video_id, current_length, length } = video;
                            const pathname = current_length
                                ? current_length === length
                                    ? `/watch?v=${video_id}`
                                    : `/watch?v=${video_id}&t=${current_length}s`
                                : `/watch?v=${video_id}`;
                            return (
                                <HistoryVideoThumbnail
                                    key={video_id}
                                    pathname={pathname}
                                    user={user}
                                    getVideos={getVideos}
                                    search={search}
                                    video={video}
                                    onClick={
                                        isMiniPlayerActive
                                            ? video_id === currentVideo.id
                                                ? GoToMiniaturePlayerVideo
                                                : PlayOnMiniaturePlayer
                                            : GoToVideo
                                    }
                                    onClickParams={video}
                                    index={index}
                                    isMiniPlayerActive={isMiniPlayerActive}
                                    currentVideo={currentVideo}
                                />
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default HistoryVideos;
