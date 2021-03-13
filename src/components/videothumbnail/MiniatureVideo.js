import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    updateLoadingState,
    updateVideoThumb,
} from '../../actions/reduxActions';
import { LOADING_STATES } from '../../helpers/helpers';
import MiniatureContainer from './MiniatureContainer';
import MiniaturePlayerContainer from './MiniaturePlayerContainer';
import MiniaturePlayerControls from './MiniaturePlayerControls';
import PlayerInput from './PlayerInput';
import VideoContainer from './VideoContainer';

class MiniatureVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0,
            video: createRef(),
            bufferedTime: 0,
            volumeValue: 0,
        };
    }

    componentDidMount() {
        const self = this;
        const video = this.state.video.current;
        video.onprogress = () => {
            const buffLen = video.buffered.length;
            self.setState({
                bufferedTime: buffLen === 0 ? 0 : video.buffered,
            });
        };
        video.ondurationchange = () => {
            if (self.state.videoNotAvailable) {
                self.setState({ videoNotAvailable: false });
            }
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (!newProps.isThumbnailActive) return false;
        if (!newProps.isThumbnailActive && !this.props.isThumbnailActive)
            return false;
        const videothumb = this.state.video.current;
        const { video_data } = newProps;
        if (video_data.isError && !this.state.videoNotAvailable) {
            this.setState({ videoNotAvailable: true }, () => {
                this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
                this.props.updateLoadingState(LOADING_STATES.NOT_LOADING);
                videothumb.pause();
                videothumb.src = '';
            });
            return;
        }
        this.setState({ volumeValue: videothumb.volume });
        if (!newProps.isThumbnailActive) {
            videothumb.src = '';
        }

        return true;
    }

    _goToVideo = (e) => {
        e.preventDefault();
        this.props.updateVideoThumb(null);
        const video = this.state.video.current;
        const { currentTime } = video;
        const { src } = video;
        video.pause();
        video.src = '';
        this.props.history.push({
            pathname: `/watch`,
            search: `?v=${this.props.thumb.uri}`,
            state: { videoSource: src, currentTime, comingFromMiniature: true },
        });
    };

    closeMiniaturePlayer = () => {
        const video = this.state.video.current;
        video.src = '';
        this.props.updateVideoThumb(null);
    };

    playPause = () => {
        const video = this.state.video.current;
        video.paused ? video.play() : video.pause();
    };

    rangeUpdate = () => {
        const video = this.state.video.current;
        const progress = document.getElementById('progress');
        const rangeInp = document.getElementById('range');
        rangeInp.value = video.currentTime;
        const { duration, currentTime } = video;
        const percentage = (100 / duration) * currentTime;
        progress.style.width = `${percentage}%`;
        this.setState({
            currentTime: video ? video.currentTime : 0,
        });
    };

    playAndPauseVideo = (e) => {
        // const self = this;
        e.preventDefault();

        const video = this.state.video.current;
        const code = video.paused ? 'pause' : 'play';
        this.setState(
            {
                animationLogo: code,
                videoIsPlaying: video.paused ? false : true,
            },
            () => {
                // const videoContent = document.getElementsByClassName("video-content")[0];
                // this._controlWithKeysAnimations();
                video.paused ? video.play() : video.pause();
                // video.paused ? self.setState({videoIsPlaying: false}) : self.setState({videoIsPlaying: true})
                // video.paused ? videoContent.classList.add("opacity") : videoContent.classList.remove("opacity");
            }
        );
    };

    controlVideoWithKeys = (e, code = null) => {
        let keyCode = code ? code : e.keyCode;
        e.preventDefault();
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

        if (keyCode === 38) {
            // this._controlWithKeysAnimations();
            this.volumeOutput(5);
        } else if (keyCode === 40) {
            // this._controlWithKeysAnimations();
            this.volumeOutput(-5);
        } else if (keyCode === 39) {
            // this._controlWithKeysAnimations();
            this.rangeOutput(5);
        } else if (keyCode === 37) {
            // this._controlWithKeysAnimations();
            this.rangeOutput(-5);
        } else if (keyCode === 32) {
            // this._controlWithKeysAnimations();
            this.playAndPauseVideo(e);
        } else if (keyCode === 77) {
            // this._controlWithKeysAnimations();
            this.muteVideo();
        }
    };

    // VIDEO FEATURES
    _controlWithKeysAnimations = () => {
        const animationDOM =
            document.getElementsByClassName('keyboard-interactions-logo')
                .length === 0
                ? null
                : document.getElementsByClassName(
                      'keyboard-interactions-logo'
                  )[0];
        if (!animationDOM) return;
        animationDOM.classList.remove('keyboard-animation');
        animationDOM.classList.add('keyboard-animation');
        // animationDOM.classList.remove("keyboard-animation");
        setTimeout(() => {
            animationDOM.classList.remove('keyboard-animation');
        }, 500);
    };
    // END VIDEO FEATURES

    // NATIVE VIDEO FUNCTIONS
    rangeOutput = (value = null) => {
        if (this.props.videoEnded) this.props.updateVideoEnded(false);
        const video = this.state.video.current;
        const rangeInp = document.getElementById('range');
        if (!isNaN(value) === false) video.currentTime = rangeInp.value;
        else video.currentTime = video.currentTime + value;
    };
    volumeOutput = (value = null) => {
        const self = this;
        const video = this.state.video.current;
        const volumeRange = video.volume;
        if (!value) {
            self.setState({
                volumeValue: String(volumeRange),
                isVideoMuted: false,
            });
            video.volume = volumeRange;
            localStorage.setItem('volume', video.volume);
            localStorage.setItem('valueVolume', String(volumeRange));
        } else {
            let newVolume =
                volumeRange * 100 + value > 100
                    ? 1
                    : volumeRange * 100 + value < 0
                    ? 0
                    : (volumeRange * 100 + value) * 0.01;

            self.setState({ volumeValue: newVolume, isVideoMuted: false });
            video.volume = newVolume;
            localStorage.setItem('volume', video.volume);
            localStorage.setItem('valueVolume', String(volumeRange));
        }
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
        const volumeRange = video.volume;
        if (isVideoMuted) {
            const volume = localStorage.getItem('volume');
            const valueVolume = localStorage.getItem('valueVolume');
            video.volume = volume;
            this.setState({
                isVideoMuted: false,
                volumeValue: Number(valueVolume),
            });
        } else {
            localStorage.setItem('volume', volumeRange);
            localStorage.setItem('valueVolume', String(volumeRange));
            video.volume = 0;
            this.setState({ isVideoMuted: true, volumeValue: 0 });
        }
    };
    slowMotion = (isSlow = true) => {
        const video = this.state.video.current;
        const { playbackRate } = video;
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

    render() {
        const {
            isThumbnailActive,
            video_data,
            darkTheme,
            history,
        } = this.props;
        const { pathname } = history.location;
        const isThumbnailActiveAndPathnameIsNotWatch =
            pathname === '/watch' ? false : isThumbnailActive;
        const { videoNotAvailable } = this.state;
        const title = video_data ? video_data.title : '';
        const uploader = video_data ? video_data.uploader : '';
        const video = this.state.video.current
            ? this.state.video.current
            : false;
        return (
            <MiniaturePlayerContainer
                darkTheme={darkTheme}
                isThumbnailActive={isThumbnailActiveAndPathnameIsNotWatch}
            >
                <VideoContainer
                    close={this.closeMiniaturePlayer}
                    _goToVideo={this._goToVideo}
                    controlVideoWithKeys={this.controlVideoWithKeys}
                    video={video}
                    playPause={this.playPause}
                    videoNotAvailable={videoNotAvailable}
                >
                    <video
                        onTimeUpdate={this.rangeUpdate}
                        ref={this.state.video}
                        id="thumb-video"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    ></video>
                    <MiniaturePlayerControls
                        bufferedTime={this.state.bufferedTime}
                    >
                        <PlayerInput
                            duration={!video ? 0 : video.duration}
                            video={
                                this.state.video.current
                                    ? this.state.video.current
                                    : null
                            }
                            currentTime={this.state.currentTime}
                        />
                    </MiniaturePlayerControls>
                </VideoContainer>
                {videoNotAvailable && (
                    <div className="miniature-player-video-not-available">
                        <h4 style={{ color: 'white' }}>
                            Video is not available
                        </h4>
                    </div>
                )}
                <MiniatureContainer
                    title={title}
                    uploader={uploader}
                    _goToVideo={this._goToVideo}
                />
            </MiniaturePlayerContainer>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateVideoThumb: (payload) => dispatch(updateVideoThumb(payload)),
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
    };
};

const mapStateToProps = (state) => {
    return {
        thumbnail: state.thumbnailVideoActive,
        video_data: state.current_video_data,
        darkTheme: state.darkTheme,
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MiniatureVideo)
);
