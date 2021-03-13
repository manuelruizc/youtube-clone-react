import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleAutoplay, toggleTheaterMode } from '../../actions/reduxActions';
import {
    FullScreen,
    MaxVolume,
    MinVolume,
    MovieSvg,
    Muted,
    Next,
    Pause,
    PictureInPicture,
    Play,
    Replay,
} from '../../assets/Icons';
import { convertMinsSecs } from '../../helpers/helpers';
import locales from '../../locales/video';
import ToolTip from '../shared/ToolTip';
import BufferedTime from './BufferedTime';
import VideoModal from './VideoModal';

class VideoControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCogActive: false,
            range: React.createRef(),
            currentHoveredTime: '00:00',
            hoverTime: React.createRef(),
            hoveredTimeCoordinates: {
                x: '0px',
                y: '0px',
            },
            sliderHoverWidth: '0%',
            currentDurationOnSeconds: '0',
            annotations: localStorage.getItem('annotations')
                ? JSON.parse(localStorage.getItem('annotations'))
                : true,
        };
        this.hoverRef = React.createRef();
        this.hoverTime = '00:00';
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].style.cursor = 'default';
    }

    goToNextVideo = () => {
        const { history } = this.props;
        const nextId = this.props.related_videos[0].id;
        history.push(`/watch?v=${nextId}`);
    };

    changeCogState = (e) => {
        e.preventDefault();
        this.setState({ isCogActive: !this.state.isCogActive });
    };

    showRangeTime = (e) => {
        const range = this.state.range.current;
        const hoverTime = this.state.hoverTime.current;
        hoverTime.style.display = 'flex';
        const leftOffset = range.getBoundingClientRect().left;
        const { clientWidth } = range;
        const hoverTimeClientWidth = hoverTime.clientWidth;
        const { duration } = this.props;
        const { clientX, clientY } = e;
        const currentPosition = clientX - leftOffset;
        const videoDurationToPercentage = duration / 100; // 120 / 100 = 1.2
        const currentPercentageInPixels =
            (100 / clientWidth) * Math.floor(currentPosition); // (100 / 827) * 82.7 = 10
        const currentDurationOnSeconds =
            videoDurationToPercentage * currentPercentageInPixels; // 1.2 * 10 = 12
        const currentHoveredTime = convertMinsSecs(
            Math.round(currentDurationOnSeconds) * 1000,
            duration
        );
        this.setState({
            currentHoveredTime,
            hoveredTimeCoordinates: {
                x: currentPosition - hoverTimeClientWidth / 2 + 'px',
                y: clientY + 'px',
            },
            sliderHoverWidth: currentPercentageInPixels + '%',
            currentDurationOnSeconds: String(currentDurationOnSeconds),
        });
    };

    onRangeInput = () => {
        const { currentDurationOnSeconds } = this.state;
        const { rangeOutput } = this.props;
        rangeOutput(currentDurationOnSeconds, true);
    };

    onChangeInput = () => {
        const { rangeOutput } = this.props;
        rangeOutput();
    };

    removeHoverClass = () => {
        const hoverTime = this.state.hoverTime.current;
        hoverTime.style.display = 'none';
        this.setState({
            sliderHoverWidth: '0%',
        });
    };

    controlModal = (isCogActive) => this.setState({ isCogActive });

    setAnnotations = () =>
        this.setState({ annotations: !this.state.annotations });

    theaterModeToggle = () => {
        // this.setState({
        //     theater_mode: local_theater_mode ? local_theater_mode : !this.state.theater_mode
        // }, () => {
        //     if(!first_check)
        //         localStorage.setItem('theater_mode', this.state.theater_mode);
        // });
        this.props.toggleTheaterMode();
        const videoContainer = document.getElementById('video-container');
        const rootContainer = document.getElementsByClassName('root')[0];
        const rightContainer = document.getElementsByClassName(
            'right-container'
        )[0];
        if (videoContainer.classList.contains('video-container-theater')) {
            videoContainer.classList.remove('video-container-theater');
            rightContainer.classList.remove('right-container-theater');
            rootContainer.classList.remove('root-theater');
        } else {
            videoContainer.classList.add('video-container-theater');
            rightContainer.classList.add('right-container-theater');
            rootContainer.classList.add('root-theater');
        }
    };

    render() {
        const { controlModal, theaterModeToggle } = this;
        const {
            videoIsPlaying,
            volumeValue,
            bufferedTime,
            hide,
            muteVideo,
            videoEnded,
            watermark,
            autoplay,
            toggleAutoplay,
            captions,
            sources,
            rate,
            slowMotion,
        } = this.props;
        const VolumeIcon =
            Number(volumeValue) === 0 ? (
                <Muted />
            ) : Number(volumeValue) > 0 && Number(volumeValue) <= 50 ? (
                <MinVolume />
            ) : (
                <MaxVolume />
            );
        const currentTime = convertMinsSecs(
            Math.round(this.props.currentTime) * 1000,
            this.props.duration
        );
        const sliderThumbPosition = String(this.props.currentTime);
        const duration = isNaN(this.props.duration)
            ? '00:00'
            : convertMinsSecs(
                  Math.round(this.props.duration) * 1000,
                  this.props.duration
              );
        const {
            currentHoveredTime,
            hoverTime,
            hoveredTimeCoordinates,
            range,
            sliderHoverWidth,
            isCogActive,
            annotations,
        } = this.state;
        const { x } = hoveredTimeCoordinates;
        return (
            <>
                <div
                    className="video-content"
                    style={{
                        opacity:
                            !videoIsPlaying || isCogActive ? 1 : hide ? 0 : 1,
                    }}
                    onMouseEnter={() =>
                        document
                            .getElementsByClassName('video-container')[0]
                            .classList.add('cursor-default')
                    }
                    onMouseLeave={() =>
                        document
                            .getElementsByClassName('video-container')[0]
                            .classList.remove('cursor-default')
                    }
                >
                    <VideoModal
                        isCogActive={isCogActive}
                        captions={captions}
                        setAnnotations={this.setAnnotations}
                        annotations={annotations}
                        watermark={watermark}
                        controlModal={controlModal}
                        toggleAutoplay={toggleAutoplay}
                        autoplay={autoplay}
                        sources={sources}
                        rate={rate}
                        slowMotion={slowMotion}
                    />
                    <div
                        onMouseMove={(e) => this.showRangeTime(e)}
                        className="slider-container"
                    >
                        <span
                            style={{ left: x }}
                            className="hover-time"
                            ref={hoverTime}
                        >
                            {currentHoveredTime}
                        </span>
                        <input
                            id="range"
                            ref={range}
                            onMouseOut={this.removeHoverClass}
                            type="range"
                            step="1"
                            min="0"
                            max={String(this.props.duration)}
                            value={
                                range.current
                                    ? range.current.value
                                    : sliderThumbPosition
                            }
                            onChange={this.onChangeInput}
                            onInput={this.onRangeInput}
                            onClick={this.removeHoverClass}
                            tabIndex="0"
                            onFocus={() => {
                                const range = this.state.range.current;
                                const videoMiddleLayer = document.getElementById(
                                    'video-middlelayer'
                                );
                                range.blur();
                                videoMiddleLayer.focus();
                            }}
                        />
                        <div className="slider-sub">
                            <div
                                style={{ width: sliderHoverWidth }}
                                className="slider-hover"
                            />
                            <div className="slider-buffered-progress">
                                <BufferedTime bufferedTime={bufferedTime} />
                            </div>
                        </div>
                        <div className="slider-video-progress">
                            <div
                                style={{
                                    width:
                                        (100 / this.props.duration) *
                                            this.props.currentTime +
                                        '%',
                                    height: '100%',
                                }}
                            />
                        </div>
                    </div>
                    <div className="buttons-bottom">
                        <div className="buttons-left-container">
                            <span
                                className={'playpause-button'}
                                onClick={this.props.playAndPauseVideo}
                                id="button"
                            >
                                {videoEnded ? (
                                    <Replay className="replay-button" />
                                ) : videoIsPlaying ? (
                                    <Pause />
                                ) : (
                                    <Play />
                                )}
                            </span>
                            <div
                                onClick={this.goToNextVideo}
                                style={{ marginRight: 14, cursor: 'pointer' }}
                            >
                                <Next />
                            </div>
                            <div className="volume-container">
                                <div
                                    onClick={muteVideo}
                                    style={{ marginRight: 10 }}
                                >
                                    {VolumeIcon}
                                </div>
                                <div className="volume-runnable-tracker">
                                    <input
                                        className={'volume-rangeinput'}
                                        step="1"
                                        id="volume"
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={this.props.volumeValue}
                                        onChange={this.props.volumeOutput}
                                        onInput={this.props.volumeOutput}
                                    />
                                    <div
                                        style={{
                                            width: this.props.volumeValue + '%',
                                            height: '100%',
                                            backgroundColor:
                                                'rgb(247, 247, 247)',
                                        }}
                                    />
                                </div>
                            </div>
                            <span className={'video-duration-span'}>
                                {currentTime} / {duration}
                            </span>
                        </div>
                        <div className="buttons-right-container">
                            <span onClick={(e) => this.changeCogState(e)}>
                                <ToolTip
                                    message={
                                        locales.videoPlayer.tooltips.controls
                                            .settings
                                    }
                                    show={!this.state.isCogActive}
                                    videoControl
                                >
                                    <i
                                        className={`fa fa-cog ${
                                            this.state.isCogActive
                                                ? 'cog-rotate'
                                                : ''
                                        }`}
                                    ></i>
                                </ToolTip>
                            </span>
                            <span
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.controlVideoWithKeys(e, 73);
                                }}
                                href="#"
                            >
                                <ToolTip
                                    videoControl
                                    message={
                                        locales.videoPlayer.tooltips.controls
                                            .mini
                                    }
                                >
                                    <PictureInPicture />
                                </ToolTip>
                            </span>
                            <span onClick={theaterModeToggle}>
                                <ToolTip
                                    videoControl
                                    message={
                                        this.props.theaterMode
                                            ? locales.videoPlayer.tooltips
                                                  .controls.theaterMode.active
                                            : locales.videoPlayer.tooltips
                                                  .controls.theaterMode.unactive
                                    }
                                >
                                    <MovieSvg />
                                </ToolTip>
                            </span>
                            <span
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.props.openFullscreen();
                                }}
                                id="fs"
                            >
                                <ToolTip
                                    videoControl
                                    message={
                                        locales.videoPlayer.tooltips.controls
                                            .fullscreen
                                    }
                                >
                                    <FullScreen />
                                </ToolTip>
                            </span>
                        </div>
                    </div>
                </div>
                {watermark && (
                    <WaterMark
                        annotations={annotations}
                        src={watermark}
                        videoIsPlaying={videoIsPlaying}
                        isCogActive={isCogActive}
                        hide={hide}
                    />
                )}
            </>
        );
    }
}

const WaterMark = ({ src, annotations, videoIsPlaying, hide }) => {
    let className = 'watermark';
    if (!annotations) className += ' watermark-hide';
    if (videoIsPlaying)
        className += hide
            ? ' watermark-controls-unactive'
            : ' watermark-controls-active';
    if (!videoIsPlaying) className += ' watermark-controls-active';
    return (
        <div className={className}>
            <img alt="Channel thumbnail" src={src} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        autoplay: state.autoplay,
        theater_mode: state.theater_mode,
        related_videos: state.relatedVideos,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAutoplay: () => dispatch(toggleAutoplay()),
        toggleTheaterMode: () => dispatch(toggleTheaterMode()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoControls);
