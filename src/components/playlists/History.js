import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import {
    mutateRelatedVideos,
    updateCurrentVideoData,
    updateLoadingState,
    updateVideoThumb,
} from '../../actions/reduxActions';
import {
    clearAllSearchHistory,
    clearAllWatchHistory,
    getVideoHistory,
    getVideosFromPlaylist,
    LOADING_STATES,
    searchUserHistoryByTerm,
} from '../../helpers/helpers';
import locales from '../../locales/historial';
import ConfirmActionModal from '../shared/ConfirmActionModal';
import NotLoggedInScreen from '../shared/NotLoggedInScreen';
import './history.scss';
import HistorySearchContainer from './HistorySearchContainer';
import HistoryVideos from './HistoryVideos';
import './playlists.scss';
import SearchHistory from './SearchHistory';

const TokenExists = localStorage.getItem('jwt_token');

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            isModalActive: false,
            search: '',
            playlist_data: null,
            playlists_type: ['Public', 'Private', 'Not Listed'],
            confirm_modal: false,
            lastDate: -1,
            playlistContainer: createRef(),
            gotAllVideos: false,
            initialAPICall: false,
        };
    }

    componentDidMount() {
        this.props.updateLoadingState(LOADING_STATES.LOADING);
        document.body.style = 'overflow: auto';
        document.title = locales.title + ' - CloneTube';
        window.onscroll = this.scrollingToGetVideos;
        if (!TokenExists)
            this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
        if (!this.props.user) return;
        if (this.props.history.location.pathname !== '/feed/history') return;
        return this.getHistorial(this.props.user.uid, this.state.lastDate);
    }

    closeConfirmModal = () => this.setState({ confirm_modal: false });
    openConfirmModal = () => this.setState({ confirm_modal: true });

    getHistorial = async (uid, lastDate, reset = false) => {
        const { search } = this.state;
        const response =
            search === ''
                ? await getVideoHistory(uid, lastDate)
                : await getVideoHistory(uid, lastDate, search);
        const { videos } = response.data;
        if (this.state.gotAllVideos) return;
        if (videos.length === 0) {
            this.setState({
                gotAllVideos: true,
                lastDate,
            });
            this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
            return;
        }
        const lastBatchOfVideos = videos[videos.length - 1].videos;
        const lastVideo = lastBatchOfVideos[lastBatchOfVideos.length - 1];
        lastDate = lastVideo.updated_at;
        this.setState({
            videos: reset ? [...videos] : [...this.state.videos, ...videos],
            lastDate,
        });
        this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
    };

    getVideos = async (search) => {
        const response = await getVideosFromPlaylist(search);
        let { videos } = response.data;
        const playlist_data = videos[0][1];
        videos = videos[0];
        this.setState({ videos, playlist_data });
    };

    clearAllWatchHistory = async () => {
        if (!this.props.user) return;
        const { pathname } = this.props.history.location;
        const isSearchHistory =
            pathname === '/feed/history/search_history' ? true : false;
        const response = isSearchHistory
            ? await clearAllSearchHistory(this.props.user.uid)
            : await clearAllWatchHistory(this.props.user.uid);
        if (!response.data.error) return this.setState({ videos: [] });
    };

    UNSAFE_componentWillReceiveProps(newProps) {
        const self = this;
        if (
            newProps.location.pathname === '/feed/history' &&
            newProps.user &&
            !this.props.user !== newProps.user &&
            !this.state.initialAPICall
        ) {
            this.setState({ initialAPICall: true }, () => {
                return self.getHistorial(
                    newProps.user.uid,
                    self.state.lastDate
                );
            });
            return true;
        }
        return false;
    }

    goToVideo = (video) => {
        const { video_id, current_length } = video;
        let pathname = current_length
            ? `/watch?v=${video_id}&t=${current_length}s`
            : `/watch?v=${video_id}`;
        this.props.history.push(pathname);
    };

    searchVideosByTerm = async () => {
        this.props.updateLoadingState(LOADING_STATES.LOADING);
        if (!this.props.user) return;
        const { user } = this.props;
        const { uid } = user;
        const term = this.state.search;
        let { lastDate } = this.state;
        if (term === '') {
            this.setState({ gotAllVideos: false });
            this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
            return this.getHistorial(uid, lastDate, true);
        }
        const response = await searchUserHistoryByTerm(term, uid);
        const { videos } = response.data;
        if (videos.length === 0) {
            this.setState({
                gotAllVideos: true,
                lastDate,
            });
            this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
            return;
        }
        const lastBatchOfVideos = videos[videos.length - 1].videos;
        const lastVideo = lastBatchOfVideos[lastBatchOfVideos.length - 1];
        lastDate = lastVideo.updated_at;
        this.setState({
            videos: [...videos],
            lastDate,
            gotAllVideos: false,
        });
        this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
    };

    getDataContainerTitle = () => {
        const { pathname } = this.props.history.location;
        if (pathname === '/feed/history') return locales.watch.title;
        else if (pathname === '/feed/history/search_history')
            return locales.search.title;
    };

    scrollingToGetVideos = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            const { uid } = this.props.user;
            this.getHistorial(uid, this.state.lastDate);
        }
    };

    render() {
        if (!TokenExists) {
            return (
                <NotLoggedInScreen
                    title="Keep track of what you watch"
                    description="Watch history isn't viewable when signed out."
                    icon="history"
                />
            );
        }

        const { user, history } = this.props;
        if (!user) return <></>;
        const { pathname } = history.location;
        const { displayName, email } = user;
        return (
            <div
                className={`playlist-container ${
                    !this.props.darkTheme ? ' playlist-container--light' : ''
                }`}
            >
                <div className="playlist-component-container">
                    <div
                        id="playlist-container"
                        ref={this.state.playlistContainer}
                        onScroll={this.scrollingToGetVideos}
                        className="playlist-video-container playlist-video-container-history"
                        style={{ width: '59.5%' }}
                    >
                        <h4 style={{ marginTop: '20px', marginLeft: '20px' }}>
                            {this.getDataContainerTitle()}
                        </h4>
                        {pathname === '/feed/history' ? (
                            <HistoryVideos
                                videoGroup={this.state.videos}
                                search={this.state.search}
                                getVideos={this.getVideos}
                                user={this.props.user}
                                currentVideo={this.props.video_data}
                                updateLoadingState={
                                    this.props.updateLoadingState
                                }
                                updateCurrentVideoData={
                                    this.props.updateCurrentVideoData
                                }
                                mutateRelatedVideos={
                                    this.props.mutateRelatedVideos
                                }
                                updateVideoThumb={this.props.updateVideoThumb}
                                miniPlayerInfo={this.props.miniplayerInfo}
                                history={this.props.history}
                            />
                        ) : pathname === '/feed/history/search_history' ? (
                            <SearchHistory
                                videos={this.state.videos}
                                search={this.state.search}
                                getVideos={this.getVideos}
                                user={this.props.user}
                            />
                        ) : null}
                    </div>
                    <HistorySearchContainer
                        pathname={pathname}
                        searchVideosByTerm={this.searchVideosByTerm}
                        search={this.state.search}
                        liftUpState={(search) => {
                            this.setState({ search, lastDate: -1 });
                        }}
                        openConfirmModal={this.openConfirmModal}
                    />
                </div>
                {this.state.confirm_modal && (
                    <ConfirmActionModal
                        title={
                            pathname === '/feed/history'
                                ? locales.confirmModal.watch.title
                                : locales.confirmModal.search.title
                        }
                        description={locales.confirmModal.watch.description(
                            displayName,
                            email
                        )}
                        actionButtonTitle={
                            pathname === '/feed/history'
                                ? locales.confirmModal.watch.confirmButton
                                : locales.confirmModal.search.confirmButton
                        }
                        action={this.clearAllWatchHistory}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
