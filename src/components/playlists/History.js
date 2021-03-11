import moment from "moment";
import React, { Component, createRef, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  mutateRelatedVideos,
  updateCurrentVideoData,
  updateLoadingState,
  updateVideoThumb,
} from "../../actions/darkTheme";
import {
  clearAllSearchHistory,
  clearAllWatchHistory,
  getVideoHistory,
  getVideosFromPlaylist,
  LOADING_STATES,
  searchUserHistoryByTerm,
} from "../../helpers/helpers";
import {
  _goToVideo,
  _navigateToMiniPlayerVideo,
  _playOnMiniPlayer,
} from "../../helpers/navigation";
import locales from "../../locales/historial";
import localesPlaylist from "../../locales/playlist";
import ConfirmActionModal from "../shared/ConfirmActionModal";
import HistoryVideoThumbnail from "../shared/HistoryVideoThumbnail";
import NotLoggedInScreen from "../shared/NotLoggedInScreen";
import SmallModal from "../shared/SmallModal";
import "./history.scss";
import "./playlists.scss";
import SearchHistory from "./SearchHistory";

const activeClass = "history-toggle-btn history-toggle-btn--selected";
const notActiveClass = "history-toggle-btn";
const TokenExists = localStorage.getItem("jwt_token");

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      isModalActive: false,
      search: "",
      playlist_data: null,
      playlists_type: ["Public", "Private", "Not Listed"],
      confirm_modal: false,
      lastDate: -1,
      playlistContainer: createRef(),
      gotAllVideos: false,
      initialAPICall: false,
    };
  }

  componentDidMount() {
    this.props.updateLoadingState(LOADING_STATES.LOADING);
    document.body.style = "overflow: auto";
    document.title = locales.title + " - CloneTube";
    window.onscroll = this.scrollingToGetVideos;
    if (!TokenExists)
      this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
    if (!this.props.user) return;
    if (this.props.history.location.pathname !== "/feed/history") return;
    return this.getHistorial(this.props.user.uid, this.state.lastDate);
  }

  closeConfirmModal = () => this.setState({ confirm_modal: false });
  openConfirmModal = () => this.setState({ confirm_modal: true });

  getHistorial = async (uid, lastDate, reset = false) => {
    const { search } = this.state;
    const response =
      search === ""
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
      pathname === "/feed/history/search_history" ? true : false;
    const response = isSearchHistory
      ? await clearAllSearchHistory(this.props.user.uid)
      : await clearAllWatchHistory(this.props.user.uid);
    if (!response.data.error) return this.setState({ videos: [] });
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    const self = this;
    if (
      newProps.location.pathname === "/feed/history" &&
      newProps.user &&
      !this.props.user !== newProps.user &&
      !this.state.initialAPICall
    ) {
      this.setState({ initialAPICall: true }, () => {
        return self.getHistorial(newProps.user.uid, self.state.lastDate);
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
    if (term === "") {
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
    if (pathname === "/feed/history") return locales.watch.title;
    else if (pathname === "/feed/history/search_history")
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
          !this.props.darkTheme ? " playlist-container--light" : ""
        }`}
      >
        <div className="playlist-component-container">
          <div
            id="playlist-container"
            ref={this.state.playlistContainer}
            onScroll={this.scrollingToGetVideos}
            className="playlist-video-container playlist-video-container-history"
            style={{ width: "59.5%" }}
          >
            <h4 style={{ marginTop: "20px", marginLeft: "20px" }}>
              {this.getDataContainerTitle()}
            </h4>
            {pathname === "/feed/history" ? (
              <HistoryVideos
                videoGroup={this.state.videos}
                search={this.state.search}
                getVideos={this.getVideos}
                user={this.props.user}
                currentVideo={this.props.video_data}
                updateLoadingState={this.props.updateLoadingState}
                updateCurrentVideoData={this.props.updateCurrentVideoData}
                mutateRelatedVideos={this.props.mutateRelatedVideos}
                updateVideoThumb={this.props.updateVideoThumb}
                miniPlayerInfo={this.props.miniplayerInfo}
                history={this.props.history}
              />
            ) : pathname === "/feed/history/search_history" ? (
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
              pathname === "/feed/history"
                ? locales.confirmModal.watch.title
                : locales.confirmModal.search.title
            }
            description={locales.confirmModal.watch.description(
              displayName,
              email
            )}
            actionButtonTitle={
              pathname === "/feed/history"
                ? locales.confirmModal.watch.confirmButton
                : locales.confirmModal.search.confirmButton
            }
            action={this.clearAllWatchHistory}
            modalSize={"big"}
            closeModal={this.closeConfirmModal}
          />
        )}
      </div>
    );
  }
}

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
    if (dateDifference < 604800000) return groupDate.format("dddd");
    else return groupDate.format("MMM DD");
  };

  const GoToVideo = async (video) => {
    let video_object = video;
    video_object["uri"] = video.video_id;
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
    video_object["uri"] = video.video_id;
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
    video_object["uri"] = video.video_id;
    await _navigateToMiniPlayerVideo(
      video_object,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      history
    );
  };

  const isMiniPlayerActive = miniPlayerInfo ? miniPlayerInfo.thumbnail : false;

  if (videoGroup.length === 0) {
    return (
      <span className="playlist-empty-text">{locales.watch.noVideos}</span>
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
                marginLeft: "20px",
                marginTop: "40px",
                marginBottom: "20px",
                fontSize: "0.95rem",
                fontWeight: "500",
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
                  // OptionsButton={HistoryOptionsButton} pending feature
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

const HistoryModal = ({ closeModal }) => {
  return (
    <SmallModal right closeDropdown={closeModal}>
      <div className="modal-innercontainer">
        <div className="modal-rv-item">
          <i className="pending-feature">O</i>
          <span className="pending-feature">
            {localesPlaylist.smallModal.queue}
          </span>
        </div>
      </div>
    </SmallModal>
  );
};

const HistoryOptionsButton = (props) => {
  const [isModalActive, setModalActive] = useState(false);
  const button = useRef(null);
  return (
    <div
      className={"btn-container"}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isModalActive && (
        <HistoryModal closeModal={() => setModalActive(false)} />
      )}
      <span
        style={{ paddingTop: 25 }}
        ref={button}
        onClick={() => setModalActive(true)}
        className="btn-options"
      >
        <span className="three-points-toggle" />
      </span>
    </div>
  );
};

// class OptionsButton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isModalActive: false,
//       modal_position_up: false,
//     };
//     this.button = createRef();
//   }

//   closeModal = () => {
//     this.setState({ isModalActive: false, modal_position_up: false });
//   };

//   openModal = () => {
//     const button = this.button.current;
//     const space = window.innerHeight - button.getBoundingClientRect().top;
//     let modal_position_up = space < 213 ? true : false;
//     this.setState({
//       isModalActive: !this.state.isModalActive,
//       modal_position_up,
//     });
//   };

//   render() {
//     const { isModalActive } = this.state;
//     return (
//       <div
//         className={"btn-container"}
//         style={{
//           position: "relative",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {isModalActive && (
//           <PlaylistModal
//             search={this.props.search}
//             getVideos={this.props.getVideos}
//             user={this.props.user}
//             video={this.props.video}
//             modal_element={this.state.modal_element}
//             closeModal={this.closeModal}
//             is_modal_up={this.state.modal_position_up}
//           />
//         )}
//         <span
//           style={{ paddingTop: 25 }}
//           ref={this.button}
//           onClick={this.openModal}
//           className="btn-options"
//         >
//           {<span className="three-points-toggle" />}
//         </span>
//       </div>
//     );
//   }
// }

// class PlaylistModal extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   deleteFromPlaylist = async () => {
//     const { video, user, getVideos, search } = this.props;
//     const { uid } = user;
//     const { video_id } = video;
//     const playlist_id = search;
//     const response = await deleteVideoFromPlaylist(uid, playlist_id, video_id);
//     if (response.status === 200) getVideos(search);
//   };

//   render() {
//     const { is_modal_up, closeModal, modal_element } = this.props;
//     return (
//       <SmallModal
//         modal_element={modal_element}
//         closeDropdown={closeModal}
//         is_modal_up={is_modal_up}
//         overlaping={false}
//       >
//         <div className="modal-innercontainer">
//           <div className="modal-rv-item">
//             <i className="pending-feature">O</i>
//             <span className="pending-feature">Agregar a la fila</span>
//           </div>
//           <div className="modal-rv-item">
//             <i className="pending-feature">O</i>
//             <span className="pending-feature">Guardar en ver más tarde</span>
//           </div>
//           <div onClick={this.openPlaylistModal} className="modal-rv-item">
//             <i className="pending-feature">O</i>
//             <span className="pending-feature">
//               Guardar en una lista de reproducción
//             </span>
//           </div>
//         </div>
//       </SmallModal>
//     );
//   }
// }

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
    mutateRelatedVideos: (payload) => dispatch(mutateRelatedVideos(payload)),
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
  };
};

const HistorySearchContainer = ({
  pathname,
  searchVideosByTerm,
  search,
  liftUpState,
  openConfirmModal,
}) => {
  return (
    <div className="history-search-container">
      {pathname === "/feed/history" && (
        <div className={"history-search-input-container"}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchVideosByTerm();
            }}
          >
            <input
              value={search}
              onChange={(e) => liftUpState(e.target.value)}
              type="text"
              placeholder={locales.manage.inputPlaceholder}
            />
          </form>
          <i onClick={searchVideosByTerm} className={"fa fa-search"} />
          <div className={"history-input-active"}>
            <div />
          </div>
        </div>
      )}
      <h4>{locales.manage.type}</h4>
      <div className="history-types-container">
        <Link to="/feed/history" className="history-type-container">
          <span>{locales.manage.watch}</span>
          <div
            className={
              pathname === "/feed/history" ? activeClass : notActiveClass
            }
          >
            <div />
          </div>
        </Link>
        <Link
          to="/feed/history/search_history"
          className="history-type-container"
        >
          <span>{locales.manage.search}</span>
          <div
            className={
              pathname === "/feed/history/search_history"
                ? activeClass
                : notActiveClass
            }
          >
            <div />
          </div>
        </Link>
        <Link
          to="/feed/history/comments_history"
          className="history-type-container"
        >
          <span>{locales.manage.comments}</span>
          <div
            className={
              pathname === "/feed/history/comments_history"
                ? activeClass
                : notActiveClass
            }
          >
            <div />
          </div>
        </Link>
        <Link
          to="/feed/history/community_history"
          className="history-type-container"
        >
          <span>{locales.manage.community}</span>
          <div
            className={
              pathname === "/feed/history/community_history"
                ? activeClass
                : notActiveClass
            }
          >
            <div />
          </div>
        </Link>
        <Link
          to="/feed/history/live_chat_history"
          className="history-type-container"
        >
          <span>{locales.manage.chat}</span>
          <div
            className={
              pathname === "/feed/history/live_chat_history"
                ? activeClass
                : notActiveClass
            }
          >
            <div />
          </div>
        </Link>
      </div>
      <div className="activity_manager-container">
        <span onClick={openConfirmModal}>
          {pathname === "/feed/history"
            ? locales.manage.buttons.clear.watch
            : locales.manage.buttons.clear.search}
        </span>
        <span>
          {pathname === "/feed/history"
            ? locales.manage.buttons.pause.watch
            : locales.manage.buttons.pause.search}
        </span>
        <span>{locales.manage.buttons.activity}</span>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
