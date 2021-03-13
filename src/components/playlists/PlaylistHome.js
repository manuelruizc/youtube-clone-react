import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addToastNotification,
    mutateRelatedVideos,
    updateCurrentVideoData,
    updateLoadingState,
    updateVideoThumb,
} from '../../actions/reduxActions';
import { Delete, Options } from '../../assets/Icons';
import {
    agoFormatting,
    deletePlaylist,
    getUserLikedVideosPlaylist,
    getVideosFromPlaylist,
    LOADING_STATES,
} from '../../helpers/helpers';
import locales from '../../locales/playlist';
import ConfirmActionModal from '../shared/ConfirmActionModal';
import SmallModal from '../shared/SmallModal';
import './playlists.scss';
import PlaylistVideos from './PlaylistVideos';

class PlaylistHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            isModalActive: false,
            isDeleteModalActive: false,
            search: '',
            playlist_data: null,
            confirm_modal: false,
        };
        this.currentDate = moment(new Date());
    }

    closeConfirmModal = () => this.setState({ confirm_modal: false });
    openConfirmModal = () =>
        this.setState({ confirm_modal: true, isDeleteModalActive: false });

    componentDidMount() {
        const token = localStorage.getItem('jwt_token');
        this.props.updateLoadingState(LOADING_STATES.LOADING);
        document.body.style = 'overflow:inherit';
        const { props } = this;
        const { location } = props;
        let { pathname, search } = location;
        // If user is logged in
        if (token) {
            // If playlist is liked videos
            // make an API call to get the liked videos
            if (pathname === '/playlist' && search === '?list=LL') {
                return this.getLikedVideos();
            }
            // Else search the playlist by it's Id getting the
            // playlist id from the pathname query (?list=<playlistId>)
            search = search.substr(6);
            this.setState({ search }, () => {
                this.getVideos(search);
            });
            // If users is not logged in
        } else {
            search = search.substr(6);
            // Don't search for liked videos as user isn't logged in
            if (search === 'LL') return;
            this.setState({ search }, () => {
                this.getVideos(search);
            });
        }
    }

    // Make an Api call to delete playlist
    deletePlaylist = async () => {
        const { playlist_id } = this.state.playlist_data;
        if (playlist_id === 'LL' || playlist_id === 'WatchLater') return;
        const response = await deletePlaylist(playlist_id);
        if (response.status === 500) {
        }
        if (response.status === 200) this.props.history.push('/feed/library');
    };

    getLikedVideos = async () => {
        const response = await getUserLikedVideosPlaylist();
        let { videos } = response.data;
        const playlist_data = videos[1][0];
        document.title = locales.defaultPlaylists.LL + ' - Clonetube';
        videos = videos[0];
        this.setState({ videos, playlist_data });
        this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
    };

    getVideos = async (search) => {
        const response = await getVideosFromPlaylist(search);
        let { videos } = response.data;
        const playlist_data = videos[1][0];
        const { playlist_name } = playlist_data;
        if (playlist_name === 'WatchLater')
            document.title =
                locales.defaultPlaylists.WatchLater + ' - Clonetube';
        else document.title = playlist_name + ' - Clonetube';
        videos = videos[0];
        this.setState({ videos, playlist_data });
        this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
    };

    UNSAFE_componentWillReceiveProps(newProps) {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            if (newProps.location.search === this.props.location.search)
                return false;
            const { location } = newProps;
            const { pathname, search } = location;
            if (
                this.props.location.search !== search &&
                newProps.location.search !== '?list=LL'
            ) {
                let { search } = newProps.location;
                search = search.substr(6);
                this.getVideos(search);
                this.setState({ search });
            }
            if (pathname === '/playlist' && search === '?list=LL') {
                this.getLikedVideos();
            }
        } else {
            let { search } = newProps.location;
            search = search.substr(6);
            this.setState({ search });
            if (
                search === 'LL' ||
                search === this.props.location.search.substr(6)
            )
                return;
            this.getVideos(search);
        }
        return true;
    }

    goToVideo = (video) => {
        const { video_id, current_length } = video;
        let pathname = current_length
            ? `/watch?v=${video_id}&t=${current_length}s`
            : `/watch?v=${video_id}`;
        this.props.history.push(pathname);
    };

    dateFormatting = () => {};

    openDeleteModal = () => this.setState({ isDeleteModalActive: true });
    closeDeleteModal = () => this.setState({ isDeleteModalActive: false });

    render() {
        const playlistThumbnail =
            this.state.videos.length === 0
                ? '//s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg'
                : this.state.videos[0].thumbnail;
        const { playlist_data } = this.state;
        const { addToastNotification } = this.props;
        return (
            <div
                className={`playlist-container ${
                    !this.props.darkTheme ? ' playlist-container--light' : ''
                }`}
            >
                <div className="playlist-component-container">
                    <div className="playlist-info-container">
                        <div className="playlist-info">
                            <div
                                className="playlist-thumbnail"
                                style={{
                                    backgroundImage: `url('${playlistThumbnail}')`,
                                }}
                            ></div>
                            <span className="playlist-title">
                                {playlist_data
                                    ? playlist_data.playlist_name === 'LL' ||
                                      playlist_data.playlist_name ===
                                          'WatchLater'
                                        ? locales.defaultPlaylists[
                                              playlist_data.playlist_name
                                          ]
                                        : playlist_data.playlist_name
                                    : ''}
                            </span>
                            <span className="playlist-title-user only-mobile">
                                {playlist_data
                                    ? playlist_data.display_name
                                    : ''}
                            </span>
                            <span className="playlist-totalvideos">
                                {this.state.videos.length} videos{' '}
                                {playlist_data
                                    ? playlist_data.playlist_name === 'LL'
                                        ? ''
                                        : '· ' +
                                          locales.updated(
                                              agoFormatting(
                                                  playlist_data.updated_at,
                                                  false
                                              )
                                          )
                                    : ''}
                            </span>
                            <span className="playlist-type">
                                {playlist_data
                                    ? locales.playlistsType[playlist_data.type]
                                    : ''}
                            </span>
                            <div
                                onClick={this.openConfirmModal}
                                className="delete-playlist-mobile-btn"
                            >
                                <Delete className="icon-small-modal" />
                            </div>
                            {playlist_data &&
                                playlist_data.playlist_name !== 'LL' &&
                                playlist_data.playlist_name !==
                                    'WatchLater' && (
                                    <div
                                        onClick={this.openDeleteModal}
                                        className="delete-playlist-modal"
                                    >
                                        <Options className="icon-small-modal" />
                                        {this.state.isDeleteModalActive && (
                                            <div className="delete-playlist-desktop">
                                                <SmallModal
                                                    style={{
                                                        width:
                                                            '100px !important',
                                                        height:
                                                            '36px !important',
                                                    }}
                                                    closeDropdown={
                                                        this.closeDeleteModal
                                                    }
                                                    right
                                                    autoWidth
                                                >
                                                    <div
                                                        onClick={
                                                            this
                                                                .openConfirmModal
                                                        }
                                                        className="modal-rv-item"
                                                    >
                                                        <Delete className="icon-small-modal" />
                                                        <span>
                                                            {locales.delete}
                                                        </span>
                                                    </div>
                                                </SmallModal>
                                            </div>
                                        )}
                                    </div>
                                )}
                        </div>
                        <div className="playlist-user-info">
                            <img
                                alt="Playlist thumbnail"
                                src={
                                    playlist_data ? playlist_data.photo_url : ''
                                }
                            />
                            <span>
                                {playlist_data
                                    ? playlist_data.display_name
                                    : ''}
                            </span>
                        </div>
                    </div>
                    <div className="playlist-video-container">
                        <PlaylistVideos
                            search={this.state.search}
                            getVideos={this.getVideos}
                            getLikedVideos={this.getLikedVideos}
                            user={this.props.user}
                            videos={this.state.videos}
                            currentVideo={this.props.video_data}
                            updateLoadingState={this.props.updateLoadingState}
                            updateCurrentVideoData={
                                this.props.updateCurrentVideoData
                            }
                            mutateRelatedVideos={this.props.mutateRelatedVideos}
                            updateVideoThumb={this.props.updateVideoThumb}
                            miniPlayerInfo={this.props.miniplayerInfo}
                            history={this.props.history}
                            playlistName={
                                playlist_data
                                    ? playlist_data.playlist_name === 'LL' ||
                                      playlist_data.playlist_name ===
                                          'WatchLater'
                                        ? locales.defaultPlaylists[
                                              playlist_data.playlist_name
                                          ]
                                        : playlist_data.playlist_name
                                    : ''
                            }
                            playlistData={playlist_data}
                            addToastNotification={addToastNotification}
                        />
                    </div>
                </div>
                {this.state.confirm_modal && (
                    <ConfirmActionModal
                        title={locales.confirmModal.title}
                        description={locales.confirmModal.description(
                            playlist_data.playlist_name
                        )}
                        actionButtonTitle={locales.confirmModal.button}
                        action={this.deletePlaylist}
                        modalSize={'big'}
                        closeModal={this.closeConfirmModal}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        darkTheme: state.darkTheme,
        miniplayerInfo: state.thumbnailVideoActive,
        video_data: state.current_video_data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateVideoThumb: (payload) => dispatch(updateVideoThumb(payload)),
        updateCurrentVideoData: (payload) =>
            dispatch(updateCurrentVideoData(payload)),
        mutateRelatedVideos: (payload) =>
            dispatch(mutateRelatedVideos(payload)),
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
        addToastNotification: (payload) =>
            dispatch(addToastNotification(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistHome);
