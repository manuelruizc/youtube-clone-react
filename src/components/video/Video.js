import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    mutateRelatedVideos,
    toggleTheaterMode,
    updateCurrentVideoData,
    updateLoadingState,
    updateVideoEnded,
    updateVideoThumb,
} from '../../actions/reduxActions';
import {
    convertMinsSecs,
    LOADING_STATES,
    _addVideoToHistorial,
    _getVideoSource,
} from '../../helpers/helpers';
import './css/videowrapper.scss';
import LoadingSkeleton from './LoadingSkeleton';
import MobileVolumeControl from './MobileVolumeControl';
import UploaderInfo from './UploaderInfo';
import VideoControls from './VideoControls';
import { VideoBlocked, VideoGeoBlocked, VideoWaiting } from './VideoLayers';
import VideoMiddleLayer from './VideoMiddleLayer';
import VideoPlayerContainer from './VideoPlayerContainer';
import VideoWrapper from './VideoWrapper';

class Video extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            video: React.createRef(),
            videoContainer: React.createRef(),
            rangeInp: null,
            volumeRange: null,
            videoIsPlaying: true,
            volumeValue: Number(localStorage.getItem('volume')) * 100,
            videoDuration: 0,
            isVideoMuted: false,
            animationLogo: '',
            width: window.innerWidth,
            bufferedTime: 0,
            sources: null,
            videoNotAvailable: false,
            cursorTimer: null,
            fadeInBuffer: false,
            hideMouse: false,
            hideControls: true,
            rate: 1,
            videoIsWaiting: false,
            videoIsGeoBlocked: false,
        };
        this.timer = 0;
        this.isMouseVisible = true;
    }

    // NATIVE VIDEO FUNCTIONS
    rangeOutput = (value = null, fromClick = false) => {
        if (this.props.videoEnded) this.props.updateVideoEnded(false);
        const video = this.state.video.current;
        const { duration } = video;
        const rangeInp = document.getElementById('range');
        if (!value) video.currentTime = rangeInp.value;
        else if (fromClick) rangeInp.value = value;
        else {
            const currentValue =
                Number(rangeInp.value) + value < 0
                    ? 0
                    : Number(rangeInp.value) + value > duration
                    ? duration
                    : Number(rangeInp.value) + value;
            rangeInp.value = String(currentValue);
            video.currentTime = currentValue;
        }
    };

    volumeOutput = (value = null) => {
        const self = this;
        const { volumeValue } = self.state;
        const volumeRange = document.getElementById('volume');
        const video = this.state.video.current;
        if (!isNaN(value) === false) {
            self.setState({
                volumeValue: String(volumeRange.value),
                isVideoMuted: false,
            });
            video.volume = volumeRange.value / 100;
            localStorage.setItem('volume', video.volume);
            localStorage.setItem('valueVolume', String(volumeRange.value));
        } else {
            let newVolume =
                Number(volumeValue) + value > 100
                    ? 100
                    : Number(volumeValue) + value < 0
                    ? 0
                    : Number(volumeValue) + value;
            self.setState({
                volumeValue: String(newVolume),
                isVideoMuted: false,
            });
            video.volume = newVolume / 100;
            localStorage.setItem('volume', video.volume);
            localStorage.setItem('valueVolume', String(volumeRange.value));
        }
    };
    rangeUpdate = () => {
        const video = this.state.video.current;
        const rangeInp = document.getElementById('range');
        rangeInp.value = video.currentTime;
    };
    playAndPauseVideo = (e) => {
        const self = this;
        e.preventDefault();
        const { videoEnded } = this.props;
        const video = this.state.video.current;
        const code = video.paused ? 'pause' : 'play';
        this.setState(
            {
                animationLogo: code,
                videoIsPlaying: video.paused ? false : true,
            },
            () => {
                if (videoEnded) self.props.updateVideoEnded(false);
                const videoContent = document.getElementsByClassName(
                    'video-content'
                )[0];
                this._controlWithKeysAnimations();
                video.paused ? video.play() : video.pause();
                video.paused
                    ? videoContent.classList.add('opacity')
                    : videoContent.classList.remove('opacity');
            }
        );
    };
    seekVideoTime = (forward = true, seconds = 10) => {
        const video = this.state.video.current;
        forward
            ? (video.currentTime += seconds)
            : (video.currentTime -= seconds);
    };
    muteVideo = () => {
        const { isVideoMuted } = this.state;
        const video = this.state.video.current;
        const volumeRange = document.getElementById('volume');
        if (isVideoMuted) {
            const volume = localStorage.getItem('volume');
            const valueVolume = localStorage.getItem('valueVolume');
            video.volume = volume;
            this.setState({ isVideoMuted: false, volumeValue: valueVolume });
        } else {
            localStorage.setItem('volume', video.volume);
            localStorage.setItem('valueVolume', String(volumeRange.value));
            video.volume = 0;
            this.setState({ isVideoMuted: true, volumeValue: '0' });
        }
    };
    slowMotion = (rate = null, isSlow = true) => {
        const video = this.state.video.current;
        const { playbackRate } = video;
        if (rate) {
            video.playbackRate = rate;
            this.setState({ rate });
            return;
        }
        if (isSlow) {
            const newPlayback =
                playbackRate - 0.25 === 0 ? 0.25 : playbackRate - 0.25;
            video.playbackRate = newPlayback;
        } else {
            const newPlayback =
                playbackRate + 0.25 === 2 ? 1.75 : playbackRate + 0.25;
            video.playbackRate = newPlayback;
        }
    };
    // END NATIVE VIDEO FUNCTIONS

    // VIDEO FEATURES
    openFullscreen = (videoContainer) => {
        const fullscreen =
            (document.fullscreenElement &&
                document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement &&
                document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement &&
                document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement &&
                document.msFullscreenElement !== null);

        if (fullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) {
                /* Firefox */
                videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                /* IE/Edge */
                videoContainer.msRequestFullscreen();
            }
        }
    };
    mouseInactivity = () => {
        let { fadeInBuffer, cursorTimer } = this.state;
        const videocontainer =
            document.getElementsByClassName('video-container').length === 0
                ? null
                : document.getElementsByClassName('video-container')[0];
        if (!videocontainer) return;
        if (!fadeInBuffer) {
            if (cursorTimer) {
                clearTimeout(cursorTimer);
                this.setState({ cursorTimer: 0 });
            }
            // fade in
            videocontainer.style.cursor = 'default';

            this.setState({ hideMouse: false, hideControls: true });
        } else {
            this.setState({ fadeInBuffer: false });
        }

        const self = this;
        let timer = setTimeout(function () {
            // fade out
            videocontainer.style.cursor = 'none';
            self.setState({
                hideMouse: true,
                hideControls: true,
                fadeInBuffer: true,
            });
        }, 3800);

        this.setState({ cursorTimer: timer });
    };
    _controlWithKeysAnimations = () => {
        const animationDOM =
            document.getElementsByClassName('keyboard-interactions-logo')
                .length === 0
                ? null
                : document.getElementsByClassName(
                      'keyboard-interactions-logo'
                  )[0];
        if (!animationDOM) return;
        const { animationLogo } = this.state;
        const volumeValueDOM = document.getElementById(
            'middlelayer-volume-container'
        );
        animationDOM.classList.remove('keyboard-animation');
        animationDOM.classList.add('keyboard-animation');
        if (animationLogo === 'volume-up' || animationLogo === 'volume-down')
            volumeValueDOM.style.display = 'flex';
        setTimeout(() => {
            animationDOM.classList.remove('keyboard-animation');
            if (
                animationLogo === 'volume-up' ||
                animationLogo === 'volume-down'
            )
                volumeValueDOM.style.display = 'none';
        }, 1200);
    };
    controlVideoWithKeys = (e, code = null) => {
        let keyCode = code ? code : e.keyCode;
        e.preventDefault();
        const numberCodes = {
            48: 0,
            49: 1,
            50: 2,
            51: 3,
            52: 4,
            53: 5,
            54: 6,
            55: 7,
            56: 8,
            57: 9,
            96: 0,
            97: 1,
            98: 2,
            99: 3,
            100: 4,
            101: 5,
            102: 6,
            103: 7,
            104: 8,
            105: 9,
        };
        let animationCodes = {
            38: 'volume-up',
            40: 'volume-down',
            39: 'forward',
            37: 'backward',
            32: this.state.videoIsPlaying ? 'pause' : 'play',
            77: 'volume-off',
            70: 'compress',
            68: 'arrow-up',
            83: 'arrow-down',
        };

        code = animationCodes[keyCode];
        this.setState({ animationLogo: code });

        if (keyCode === 38) {
            this._controlWithKeysAnimations();
            this.volumeOutput(5);
        } else if (keyCode === 84) {
            this.props.toggleTheaterMode();
        } else if (keyCode === 73) {
            // Tecla I/i
            this.changeToMiniaturePlayer();
        } else if (keyCode === 40) {
            this._controlWithKeysAnimations();
            this.volumeOutput(-5);
        } else if (keyCode === 39) {
            this._controlWithKeysAnimations();
            this.rangeOutput(5);
        } else if (keyCode === 37) {
            this._controlWithKeysAnimations();
            this.rangeOutput(-5);
        } else if (keyCode === 32) {
            this._controlWithKeysAnimations();
            this.playAndPauseVideo(e);
        } else if (keyCode === 77) {
            this._controlWithKeysAnimations();
            this.muteVideo();
        } else if (keyCode === 70) {
            this._controlWithKeysAnimations();
            this.openFullscreen(this.state.videoContainer.current);
        } else if (keyCode === 68) {
            this._controlWithKeysAnimations();
            this.slowMotion(null, false);
        } else if (keyCode === 83) {
            this._controlWithKeysAnimations();
            this.slowMotion();
        } else if (
            (keyCode <= 57 && keyCode >= 48) ||
            (keyCode <= 106 && keyCode >= 96)
        ) {
            this.videoFragmentation(numberCodes[keyCode]);
        }
    };
    videoFragmentation = (number) => {
        const video = this.state.video.current;
        if (number === 0) {
            video.currentTime = 0;
        } else {
            const videoFragmentationDuration = (video.duration / 10) * number;
            video.currentTime = videoFragmentationDuration;
        }
    };

    // ENDVIDEO FEATURES

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
    };

    // OTHER FUNCTIONS
    changeToMiniaturePlayer = () => {
        const self = this;
        const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
        const { updateLoadingState } = this.props;
        updateLoadingState(LOADING);
        const video = this.state.video.current;
        const videoURL = video.src;
        const videothumb = document.getElementById('thumb-video');
        videothumb.src = videoURL;
        videothumb.onloadedmetadata = () => {
            const currentTime = video.currentTime;
            videothumb.currentTime = currentTime;
        };

        videothumb.oncanplay = () => {
            updateLoadingState(LOADING_COMPLETE);
            const currentTime = video.currentTime;
            const currentVolume = video.volume;

            videothumb.play();
            videothumb.volume = 0;
            self.props.updateVideoThumb({
                uri: self.props.query,
                currentTime,
                videoURL,
                thumbnail: true,
                currentVolume,
            });
            self.props.history.push({
                pathname: '/',
                state: {
                    thumbnail: true,
                    uri: self.props.query,
                    currentTime,
                    videoURL,
                    currentVolume,
                },
            });
            if (currentVolume !== undefined) videothumb.volume = currentVolume;
        };
    };

    goToNextVideo = (history) => {
        const nextId = document
            .getElementsByClassName('videocard')[0]
            .href.substr(-11);
        history.push(`/watch?v=${nextId}`);
    };
    // END OTHER FUNCTIONS

    // COMPONENT LIFE CYCLES
    componentDidMount() {
        this._isMounted = true;
        this.updateWindowDimensions();
        window.scrollTo(0, 0);
        window.addEventListener('resize', this.updateWindowDimensions);

        const { updateLoadingState, current_video_data } = this.props;
        const { LOADING, LOADING_COMPLETE } = LOADING_STATES;

        if (this.props.history.location.state && current_video_data) {
            const {
                comingFromMiniature,
                videoSource,
                currentTime,
            } = this.props.history.location.state;
            if (current_video_data.isError) {
                updateLoadingState(LOADING_COMPLETE);
                this.setState({ videoNotAvailable: true });
                return;
            }
            if (comingFromMiniature && current_video_data) {
                let video_data = current_video_data;
                this.setState({
                    // uri:
                    //   video_data.all_formats.audioandvideoFormats[
                    //     video_data.all_formats.audioandvideoFormats.length - 1
                    //   ].url,
                    sources: video_data.all_formats.audioandvideoFormats,
                    uri: video_data.uri,
                });
                this.videoListeners();
                const video = this.state.video.current;
                video.src = videoSource;
                video.currentTime = currentTime;
                video.play();
                updateLoadingState(LOADING_COMPLETE);
            } else if (current_video_data && !comingFromMiniature) {
                if (
                    current_video_data.all_formats.audioandvideoFormats
                        .length === 0
                ) {
                    this.setState({ videoNotAvailable: true });
                    return;
                }
                this.putVideo(null, current_video_data);
                return;
            }
        } else {
            updateLoadingState(LOADING);
            const id = this.props.query;
            if (id != null) {
                // this.getVideoSource(id);
                this.getVideoInfo(id);
            }
        }
    }

    componentWillUnmount() {
        this.props.updateVideoEnded(false);
        this.props.updateVideoThumb({
            uri: this.props.query,
            currentTime: 0,
            videoURL: '',
            thumbnail: false,
        });
        if (this.props.current_video_data) this.addVideoToHistorial();
        document.getElementsByClassName('video-container')[0].style.cursor =
            'default';
        const videoTag = document.getElementsByTagName('video')[0];
        videoTag.pause();
        videoTag.src = '';
        videoTag.parentNode.removeChild(videoTag);
        this.setState({ video: null });
        this._isMounted = false;
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.query === this.props.query) return false;
        if (newProps.query !== this.props.query) {
            this.addVideoToHistorial(
                this.props.current_video_data,
                this.props.user
            );
        }
        const id = newProps.query;
        const { LOADING } = LOADING_STATES;
        this.props.updateLoadingState(LOADING);
        this.props.updateVideoEnded(false);
        if (id != null) {
            //  this.getVideoSource(id);
            this.setState({ videoNotAvailable: false });
            this.getVideoInfo(id);
        }
        return true;
    }
    // END COMPONENT LIFE CYCLES

    controlVolume = () => {
        const video = this.state.video.current;
        video.volume = video.volume === 1 ? 0 : 1;
    };

    render() {
        const {
            state,
            controlVolume,
            props,
            rangeUpdate,
            openFullscreen,
            playAndPauseVideo,
            controlVideoWithKeys,
            volumeOutput,
            rangeOutput,
            muteVideo,
            slowMotion,
        } = this;
        const {
            videoEnded,
            isThumbnail,
            query,
            current_video_data,
            history,
            toggleTheaterMode,
            theater_mode,
        } = props;
        const {
            videoNotAvailable,
            videoContainer,
            cursorTimer,
            width,
            volumeValue,
            rewindKeysActive,
            hideControls,
            videoDuration,
            bufferedTime,
            animationLogo,
            videoThumb,
            uri,
            sources,
            rate,
            videoIsWaiting,
        } = state;
        const video = state.video.current;
        const paused = video ? video.paused : true;
        const videoid = query.substr(0, 11);
        let videoContainerClass = isThumbnail
            ? 'video-container video-container-thumbnail-video'
            : 'video-container';
        videoContainerClass = theater_mode
            ? videoContainerClass + ' video-container-theater'
            : videoContainerClass;
        const fullscreenActiveState =
            (document.fullscreenElement &&
                document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement &&
                document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement &&
                document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement &&
                document.msFullscreenElement !== null);
        return (
            <>
                <VideoPlayerContainer
                    videoContainer={this.state.videoContainer}
                    id="video-container"
                    className={
                        fullscreenActiveState
                            ? videoContainerClass +
                              ' video-container--fullscreen'
                            : videoContainerClass
                    }
                    onMouseOut={
                        width > 768
                            ? () =>
                                  this.setState({
                                      fadeInBuffer: false,
                                      hideControls: true,
                                      hideMouse: false,
                                      cursorTimer: clearInterval(cursorTimer),
                                  })
                            : null
                    }
                    onMouseMove={
                        width > 768
                            ? () => {
                                  this.mouseInactivity();
                                  this.setState({ hideControls: false });
                              }
                            : null
                    }
                >
                    <video
                        ref={this.state.video}
                        controls={width <= 768 ? true : false}
                        // onTimeUpdate={changeDuration}
                        id="video"
                        onTimeUpdate={rangeUpdate}
                    />
                    {video
                        ? !!window.chrome &&
                          window.navigator.appVersion.includes('Android') &&
                          video.volume === 0 && (
                              <MobileVolumeControl
                                  controlVolume={controlVolume}
                              />
                          )
                        : null}
                    {videoEnded && <VideoWrapper />}
                    <VideoTitle
                        isFullScreenActive={fullscreenActiveState}
                        hideControls={hideControls}
                        current_video_data={current_video_data}
                        paused={paused}
                    />

                    <VideoMiddleLayer
                        volumeValue={volumeValue}
                        openFullscreen={openFullscreen}
                        videoContainer={videoContainer.current}
                        playAndPauseVideo={playAndPauseVideo}
                        controlVideoWithKeys={controlVideoWithKeys}
                        animationLogo={animationLogo}
                    />
                    {!videoNotAvailable && (
                        <VideoControls
                            rewindActive={rewindKeysActive}
                            theaterModeToggle={toggleTheaterMode}
                            controlVideoWithKeys={controlVideoWithKeys}
                            hide={hideControls}
                            history={history}
                            duration={video !== null ? video.duration : 0}
                            currentTime={videoDuration}
                            volumeOutput={volumeOutput}
                            volumeValue={volumeValue}
                            playAndPauseVideo={(e) => playAndPauseVideo(e)}
                            openFullscreen={() =>
                                openFullscreen(videoContainer.current)
                            }
                            rangeOutput={rangeOutput}
                            videoIsPlaying={!paused}
                            video={video}
                            videoEnded={videoEnded}
                            bufferedTime={bufferedTime}
                            muteVideo={muteVideo}
                            watermark={
                                current_video_data
                                    ? !current_video_data.isError
                                        ? current_video_data.watermark
                                            ? current_video_data.watermark
                                            : null
                                        : null
                                    : null
                            }
                            // captions={current_video_data ? current_video_data.captions : null} for parent component
                            captions={
                                current_video_data
                                    ? !current_video_data.isError
                                        ? current_video_data.captions
                                            ? current_video_data.captions
                                                  .playerCaptionsTracklistRenderer
                                                  .captionTracks
                                            : null
                                        : null
                                    : null
                            }
                            sources={
                                current_video_data
                                    ? !current_video_data.isError
                                        ? current_video_data.all_formats
                                              .audioandvideoFormats
                                        : null
                                    : null
                            }
                            rate={rate}
                            slowMotion={slowMotion}
                        />
                    )}
                    {videoNotAvailable && <VideoBlocked />}
                    {videoIsWaiting && <VideoWaiting />}
                    {this.state.videoIsGeoBlocked && <VideoGeoBlocked />}
                </VideoPlayerContainer>
                {current_video_data &&
                !isThumbnail &&
                !current_video_data.isError ? (
                    <UploaderInfo
                        thumbnail={
                            videoThumb === undefined || videoThumb === null
                                ? ''
                                : videoThumb
                        }
                        uri={uri}
                        video_data={current_video_data}
                        videoid={videoid}
                        sources={sources}
                    />
                ) : current_video_data &&
                  videoNotAvailable &&
                  !current_video_data.isError ? (
                    <UploaderInfo
                        thumbnail={
                            videoThumb === undefined || videoThumb === null
                                ? ''
                                : videoThumb
                        }
                        uri={uri}
                        video_data={current_video_data}
                        videoid={videoid}
                        sources={sources}
                    />
                ) : !isThumbnail ? (
                    <LoadingSkeleton />
                ) : null}
            </>
        );
    }

    // FUNCTIONS THAT COMUNICATES  WITH SERVER
    getVideoInfo = async (id) => {
        window.scroll({
            top: 0,
            left: 0,
        });
        document.body.style = 'overflow:hidden';

        if (!this.props.videoURL) {
            const response = await _getVideoSource(id);
            const { data } = response;
            const { current_video_data } = data;
            if (
                response.data.isError ||
                current_video_data.all_formats.audioandvideoFormats.length === 0
            ) {
                this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
                this.setState({ videoNotAvailable: true }, () => {
                    document.body.style = 'overflow:auto';
                });
                return;
            }

            document.title = data.current_video_data.title + ' - CloneTube';

            this.setState({ current_video_data: data.current_video_data });

            this.props.updateCurrentVideoData(data.current_video_data);
            this.props.mutateRelatedVideos(data.related_videos);

            this.setState({ videoThumb: response.data.thumbnail });
            if (!response.data.formats) {
                this.setState({ videoNotAvailable: true });
                const { LOADING_COMPLETE } = LOADING_STATES;
                this.props.updateLoadingState(LOADING_COMPLETE);
                document.body.style = 'overflow:auto';
                return;
            }
            this.putVideo(response);
            return false;
        }
        this.putVideo(null);
    };

    putVideo = (response, current_video_data = null) => {
        if (this.state.video === null) return false;
        if (!this._isMounted) {
            return false;
        }
        const { video } = this.state;

        if (video.current === null) return false;
        if (response != null) {
            const { formats } = response.data;
            const currentVideoData = response.data.current_video_data;
            if (
                formats.length === 0 ||
                !formats ||
                formats[0].url.substr(-4) === 'm3u8' ||
                currentVideoData.all_formats.audioandvideoFormats.length === 0
            ) {
                const { LOADING_COMPLETE } = LOADING_STATES;
                this.props.updateLoadingState(LOADING_COMPLETE);
                this.setState({ videoNotAvailable: true }, () => {
                    document.body.style = 'overflow:auto';
                    localStorage.setItem(
                        'video_data',
                        JSON.stringify(response.data)
                    );
                });
                return;
            }
            const posters = response.data.current_video_data.video_posters;

            video.current.src =
                response.data.all_formats.audioandvideoFormats[
                    response.data.all_formats.audioandvideoFormats.length - 1
                ].url;
            video.current.poster = posters[posters.length - 1].url;
            const { LOADING_COMPLETE } = LOADING_STATES;
            this.props.updateLoadingState(LOADING_COMPLETE);
            this.setState(
                {
                    uri: response.data.formats[1].url,
                    sources: response.data.all_formats.audioandvideoFormats,
                },
                () => {
                    localStorage.setItem(
                        'video_data',
                        JSON.stringify(response.data)
                    );
                }
            );
        } else if (current_video_data === null) {
            video.current.src = this.props.videoURL;
            this.setState({ uri: this.props.videoURL });
        } else {
            const video_source =
                current_video_data.all_formats.audioandvideoFormats[
                    current_video_data.all_formats.audioandvideoFormats.length -
                        1
                ].url;
            video.current.src = video_source;
            this.setState({ uri: video_source });
        }
        this.videoListeners();
    };
    // ENDS FUNCTIONS THAT COMUNICATES  WITH SERVER

    addVideoToHistorial = async (current_video_data, user) => {
        current_video_data = current_video_data
            ? current_video_data
            : this.props.current_video_data;
        if (current_video_data.isError || this.state.videoNotAvailable) return;
        user = user ? user : this.props.user;
        if (!user) return;
        const { uid } = user;
        const video = this.state.video.current;
        const video_info = {
            video_id: current_video_data.id,
            video_channel: current_video_data.uploader,
            video_title: current_video_data.title,
            thumbnail:
                current_video_data.video_posters[
                    current_video_data.video_posters.length - 1
                ].url,
            video_duration: convertMinsSecs(
                video.duration * 1000,
                video.duration
            ),
            current_length: Math.round(video.currentTime),
            length: Math.round(video.duration),
        };
        const response = await _addVideoToHistorial(video_info, uid);
    };

    videoListeners = () => {
        const video = this.state.video.current;
        const self = this;
        const rangeInp = document.getElementById('range');
        video.onloadedmetadata = () => {
            self.addVideoToHistorial();
            if (this.props.history.location.search.length >= 17) {
                let time = this.props.history.location.search.substr(17);
                time = time.substring(0, time.length - 1);
                video.currentTime = time > video.duration ? 0 : time;
            }
            const { isVideoMuted } = self.state;
            self.props.updateVideoEnded(false);
            if (self.props.currentTime) {
                video.currentTime = self.props.currentTime;
            }
            rangeInp.min = 0;
            rangeInp.max = video.duration;
            const storaged_volume = localStorage.getItem('volume');
            if (storaged_volume === 'undefined') {
                localStorage.setItem('volume', '0.5');
            }
            if (!isVideoMuted)
                video.volume =
                    storaged_volume === 'undefined'
                        ? 0.5
                        : Number(localStorage.getItem('volume'));
            const promise = video.play();
            if (promise !== undefined) {
                promise
                    .catch((error) => {
                        console.error(error);
                        // Auto-play was prevented
                        // Show a UI element to let the user manually start playback
                    })
                    .then(() => {
                        // Auto-play started
                    });
            }
            self.setState({
                videoNotAvailable: false,
                videoIsGeoBlocked: false,
            });
            document.body.style = 'overflow:inherit';
            document.title = `${self.props.current_video_data.title} - CloneTube`;
        };
        video.oncanplay = () => {
            const { videoIsWaiting } = self.state;
            if (videoIsWaiting) self.setState({ videoIsWaiting: false });
        };
        video.onwaiting = () => {
            self.setState({ videoIsWaiting: true });
        };
        video.ontimeupdate = () => {
            if (
                Math.round(video.currentTime) % 15 === 0 &&
                Math.round(video.currentTime) !== 0
            )
                self.addVideoToHistorial();
            const buffLen = video.buffered.length;
            self.setState({
                bufferedTime: buffLen === 0 ? 0 : video.buffered,
                videoDuration: video ? video.currentTime : 0,
            });
        };
        video.onerror = () => {
            if (video.error.code === 4) {
                self.setState({ videoIsGeoBlocked: true });
                document.body.style = 'overflow:auto';
            }
        };
    };
}

const VideoTitle = (props) => {
    const {
        isFullScreenActive,
        hideControls,
        current_video_data,
        paused,
    } = props;
    return (
        <div
            style={{
                opacity: !isFullScreenActive
                    ? 0
                    : paused
                    ? 1
                    : hideControls
                    ? 0
                    : 1,
            }}
            className="fullscreen-title--container"
        >
            <span className={'fullscreen-title'}>
                {current_video_data ? current_video_data.title : ''}
            </span>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateVideoEnded: (payload) => dispatch(updateVideoEnded(payload)),
        updateVideoThumb: (payload) => dispatch(updateVideoThumb(payload)),
        updateCurrentVideoData: (payload) =>
            dispatch(updateCurrentVideoData(payload)),
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
        mutateRelatedVideos: (payload) =>
            dispatch(mutateRelatedVideos(payload)),
        toggleTheaterMode: () => dispatch(toggleTheaterMode()),
    };
};

const mapStateToProps = (state) => {
    return {
        videoEnded: state.videoEnded,
        current_video_data: state.current_video_data,
        LOADING_STATE: state.loading_state,
        user: state.user,
        theater_mode: state.theater_mode,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Video);
