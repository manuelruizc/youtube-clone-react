import { LOADING_STATES, _getVideoSource } from './helpers';
const { LOADING_COMPLETE, LOADING } = LOADING_STATES;

export const _navigateToMiniPlayerVideo = async (
    video,
    updateLoadingState,
    updateCurrentVideoData,
    mutateRelatedVideos,
    history
) => {
    let { uri } = video;
    uri = uri.length > 11 ? uri.substr(0, 11) : uri;
    updateLoadingState(LOADING);
    const thumbvideo = document.getElementById('thumb-video');
    const { src, currentTime } = thumbvideo;
    thumbvideo.src = '';
    updateLoadingState(LOADING_COMPLETE);
    history.push({
        pathname: `/watch`,
        search: `?v=${uri}`,
        state: { videoSource: src, currentTime, comingFromMiniature: true },
    });
};

export const _playOnMiniPlayer = async (
    video,
    updateLoadingState,
    updateCurrentVideoData,
    mutateRelatedVideos,
    updateVideoThumb
) => {
    let { uri, length } = video;
    uri = uri.length > 11 ? uri.substr(0, 11) : uri;
    updateLoadingState(LOADING);
    let response = await _getVideoSource(uri);
    const { data } = response;
    if (data.isError) {
        updateCurrentVideoData(data);
        return;
    } else {
        if (!data.formats) {
            updateCurrentVideoData({ isError: true });
            return;
        }

        updateCurrentVideoData(data.current_video_data);
        mutateRelatedVideos(data.related_videos);
        const { formats } = response.data;
        updateVideoThumb({
            uri,
            currentTime: length ? parseInt(length) : 0,
            videoURL: formats[1].url,
            thumbnail: true,
        });
        const thumbVideo = document.getElementById('thumb-video');
        thumbVideo.src = response.data.formats[1].url;
        thumbVideo.currentTime = video.current_length
            ? video.current_length === video.length
                ? 0
                : video.current_length
            : 0;
        thumbVideo.onloadedmetadata = undefined;
        thumbVideo.oncanplay = undefined;
        thumbVideo.play();
        updateLoadingState(LOADING_COMPLETE);
    }
};

export const _goToVideo = async (
    video,
    updateLoadingState,
    updateCurrentVideoData,
    mutateRelatedVideos,
    history
) => {
    let { uri } = video;
    uri = uri.length > 11 ? uri.substr(0, 11) : uri;
    updateLoadingState(LOADING);
    let response = await _getVideoSource(uri);
    const { data } = response;
    if (data.isError) {
        updateCurrentVideoData(data);
        mutateRelatedVideos([]);
        const thumbvideo = document.getElementById('thumb-video');
        if (thumbvideo) thumbvideo.src = '';
        const currentTime = video.current_length ? video.current_length : 0;
        updateLoadingState(LOADING_COMPLETE);
        history.push({
            pathname: `/watch`,
            search: video.current_length
                ? video.current_length === video.length
                    ? `?v=${uri}`
                    : `?v=${uri}&t=${video.current_length}s`
                : `?v=${uri}`,
            state: { currentTime },
        });
        return;
    } else {
        updateCurrentVideoData(data.current_video_data);
        mutateRelatedVideos(data.related_videos);
        const thumbvideo = document.getElementById('thumb-video');
        if (thumbvideo) thumbvideo.src = '';
        const currentTime = video.current_length ? video.current_length : 0;
        updateLoadingState(LOADING_COMPLETE);
        history.push({
            pathname: `/watch`,
            search: video.current_length
                ? video.current_length === video.length
                    ? `?v=${uri}`
                    : `?v=${uri}&t=${video.current_length}s`
                : `?v=${uri}`,
            state: { currentTime },
        });
    }
};
