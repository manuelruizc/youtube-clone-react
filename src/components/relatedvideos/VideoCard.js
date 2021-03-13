import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import {
    addToastNotification,
    mutateRelatedVideos,
    updateCurrentVideoData,
    updateLoadingState,
    updateVisitorModal,
} from '../../actions/reduxActions';
import { _goToVideo } from '../../helpers/navigation';
import AddToPlaylistModal from '../shared/AddToPlaylistModal';
import ButtonContainer from './ButtonContainer';
import RelatedVideoModal from './RelatedVideoModal';
import VideoCardContainer from './VideoCardContainer';
import VideoInfo from './VideoInfo';
import VideoThumbnail from './VideoThumbnail';

class VideoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: createRef(),
            modal_position_up: true,
            is_modal_playlist: false,
        };
    }

    modalPlaylist = (close = true) => {
        this.setState({ is_modal_playlist: close ? false : true });
    };

    openModal = (e) => {
        e.preventDefault();
        const button = this.state.button.current;
        const space = window.innerHeight - button.getBoundingClientRect().top;
        let modal_position_up = space < 300 ? true : false;

        this.setState({
            isModalActive: !this.state.isModalActive,
            modal_position_up,
        });
    };

    closeDropdown = () => {
        this.setState({ isModalActive: false, modal_position_up: false });
    };

    GoToVideo = (e, video) => {
        e.preventDefault();
        const {
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            history,
        } = this.props;
        video['uri'] = video.id;
        _goToVideo(
            video,
            updateLoadingState,
            updateCurrentVideoData,
            mutateRelatedVideos,
            history
        );
    };

    render() {
        const { props } = this;
        const { video } = props;
        const { current_length, length, id } = video;
        const pathname = current_length
            ? current_length === length
                ? `/watch?v=${id}`
                : `/watch?v=${id}&t=${current_length}s`
            : `/watch?v=${id}`;
        return (
            <VideoCardContainer>
                <a
                    onClick={(e) => this.GoToVideo(e, video)}
                    data-id={video.id}
                    data-thumbnail={video.thumbnail}
                    data-duration={video.duration}
                    data-title={video.video_title}
                    data-channel={video.channel}
                    style={{ textDecoration: 'none' }}
                    href={pathname}
                    className="videocard"
                >
                    <VideoThumbnail info={props.video} />
                    <VideoInfo info={props.video} />
                </a>
                <ButtonContainer>
                    {this.state.isModalActive && (
                        <RelatedVideoModal
                            updateVisitorModal={this.props.updateVisitorModal}
                            user={this.props.user}
                            closeDropdown={this.closeDropdown}
                            is_modal_up={this.state.modal_position_up}
                            video={video}
                            openPlaylistModal={this.modalPlaylist}
                            addToastNotification={
                                this.props.addToastNotification
                            }
                        />
                    )}
                    <a
                        ref={this.state.button}
                        onClick={(e) => this.openModal(e)}
                        className="btn-options"
                        href="/"
                    >
                        <span className="three-points-toggle" />
                    </a>
                </ButtonContainer>
                {this.state.is_modal_playlist && (
                    <AddToPlaylistModal
                        isParentAThumbnail={true}
                        modalPlaylist={this.modalPlaylist}
                        uri={video.id}
                        current_video_data={video}
                    />
                )}
            </VideoCardContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        darkTheme: state.darkTheme,
        user: state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateVisitorModal: () => dispatch(updateVisitorModal()),
        addToastNotification: (payload) =>
            dispatch(addToastNotification(payload)),
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
        mutateRelatedVideos: (payload) =>
            dispatch(mutateRelatedVideos(payload)),
        updateCurrentVideoData: (payload) =>
            dispatch(updateCurrentVideoData(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
