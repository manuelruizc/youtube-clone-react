import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    mutateRelatedVideos,
    updateCurrentVideoData,
    updateLoadingState,
    updateVideoThumb,
} from '../../actions/reduxActions';
import {
    _goToVideo,
    _navigateToMiniPlayerVideo,
    _playOnMiniPlayer,
} from '../../helpers/navigation';
import HomeVideoThumbnail from '../shared/HomeVideoThumbnail';
import Overlay from '../shared/Overlay';

class Section extends Component {
    render() {
        let {
            section,
            updateCurrentVideoData,
            updateLoadingState,
            mutateRelatedVideos,
            updateVideoThumb,
            mini_player_info,
            video_data,
            history,
            key,
        } = this.props;

        // Home page section data, it includes an array with
        // section[0] is the section title
        // section[1, 2, 3+...] are section videos
        let data = section;
        // Get the section title
        const title = data[0];
        return (
            <HomepageSection title={title}>
                <SectionItems
                    key={key}
                    data={data}
                    updateCurrentVideoData={updateCurrentVideoData}
                    updateLoadingState={updateLoadingState}
                    mutateRelatedVideos={mutateRelatedVideos}
                    updateVideoThumb={updateVideoThumb}
                    miniPlayerInfo={mini_player_info}
                    video_data={video_data}
                    history={history}
                />
            </HomepageSection>
        );
    }
}
// Home page section
export const HomepageSection = (props) => {
    let title = props.title ? props.title : '';
    return (
        <div className="section-wrapper">
            {props.title && <h2>{title}</h2>}
            <div className="big-section">{props.children}</div>
        </div>
    );
};

// Section video thumbnails
const SectionItems = (props) => {
    const {
        data,
        updateLoadingState,
        updateCurrentVideoData,
        mutateRelatedVideos,
        updateVideoThumb,
        miniPlayerInfo,
        history,
        video_data,
    } = props;

    // Function to watch video on /watch page
    // Uses helpers global function
    const GoToVideo = async (video) => {
        // helpers/navigation.js
        await _goToVideo(
            video,
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            history
        );
    };

    // Function to watch video on miniature player
    // Uses helpers global function
    const PlayOnMiniaturePlayer = async (video) => {
        // helpers/navigation.js
        await _playOnMiniPlayer(
            video,
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            updateVideoThumb
        );
    };

    // Function to watch video on /watch page when miniature
    // player is active and video is currently playing
    // Uses helpers global function
    const GoToMiniaturePlayerVideo = async (video) => {
        // helpers/navigation.js
        await _navigateToMiniPlayerVideo(
            video,
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            history
        );
    };

    const isMiniPlayerActive = miniPlayerInfo
        ? miniPlayerInfo.thumbnail
        : false;

    return (
        <>
            {data.map((video, index) => {
                const { uri, current_length, length } = video;
                // pathname depending if the user already have watched the video
                const pathname = current_length
                    ? current_length === length
                        ? `/watch?v=${uri}`
                        : `/watch?v=${uri}&t=${current_length}s`
                    : `/watch?v=${uri}`;
                if (index > 0) {
                    return (
                        <HomeVideoThumbnail
                            onClick={
                                isMiniPlayerActive
                                    ? uri === video_data.id
                                        ? GoToMiniaturePlayerVideo
                                        : PlayOnMiniaturePlayer
                                    : GoToVideo
                            }
                            onClickParams={video}
                            video={video}
                            pathname={pathname}
                            index={index}
                            key={uri}
                        >
                            <Thumbnail video={video}>
                                {video_data && isMiniPlayerActive
                                    ? uri === video_data.id && <Overlay />
                                    : null}
                            </Thumbnail>
                        </HomeVideoThumbnail>
                    );
                }
                return null;
            })}
        </>
    );
};

const Thumbnail = (props) => {
    const { video } = props;
    return (
        <div className="thumb-cnt">
            <img src={video.thumbnail} alt={''} />
            <span>{video.duration}</span>
            {video.current_length !== undefined && (
                <div className="video_current_progress">
                    <div
                        style={{
                            width:
                                (100 / video.length) * video.current_length +
                                '%',
                        }}
                    />
                </div>
            )}
            {props.children}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateVideoThumb: (payload) => dispatch(updateVideoThumb(payload)),
        updateCurrentVideoData: (payload) =>
            dispatch(updateCurrentVideoData(payload)),
        mutateRelatedVideos: (payload) =>
            dispatch(mutateRelatedVideos(payload)),
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
    };
};

const mapStateToProps = (state) => {
    return {
        mini_player_info: state.thumbnailVideoActive,
        video_data: state.current_video_data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
