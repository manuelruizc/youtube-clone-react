import moment from "moment";
import React, { Component, createRef, useState } from "react";
import { connect } from "react-redux";
import {
  addToastNotification,
  mutateRelatedVideos,
  updateCurrentVideoData,
  updateLoadingState,
  updateVideoThumb,
} from "../../actions/darkTheme";
import { Delete, Options, Playlist, WatchLater } from "../../assets/Icons";
import {
  addVideoToPlaylist,
  agoFormatting,
  deletePlaylist,
  deleteVideoFromPlaylist,
  getUserLikedVideosPlaylist,
  getVideosFromPlaylist,
  LOADING_STATES,
  removeLikedVideo,
} from "../../helpers/helpers";
import {
  _goToVideo,
  _navigateToMiniPlayerVideo,
  _playOnMiniPlayer,
} from "../../helpers/navigation";
import locales from "../../locales/playlist";
import AddToPlaylistModal from "../shared/AddToPlaylistModal";
import ConfirmActionModal from "../shared/ConfirmActionModal";
import Overlay from "../shared/Overlay";
import SmallModal from "../shared/SmallModal";
import "./playlists.scss";

class PlaylistHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      isModalActive: false,
      isDeleteModalActive: false,
      search: "",
      playlist_data: null,
      confirm_modal: false,
    };
    this.currentDate = moment(new Date());
  }

  closeConfirmModal = () => this.setState({ confirm_modal: false });
  openConfirmModal = () =>
    this.setState({ confirm_modal: true, isDeleteModalActive: false });

  componentDidMount() {
    const token = localStorage.getItem("jwt_token");
    this.props.updateLoadingState(LOADING_STATES.LOADING);
    document.body.style = "overflow:inherit";
    const { props } = this;
    const { location } = props;
    let { pathname, search } = location;
    if (token) {
      if (pathname === "/playlist" && search === "?list=LL") {
        return this.getLikedVideos();
      }
      search = search.substr(6);
      this.setState({ search }, () => {
        this.getVideos(search);
      });
    } else {
      search = search.substr(6);
      if (search === "LL") return;
      this.setState({ search }, () => {
        this.getVideos(search);
      });
    }
  }

  deletePlaylist = async () => {
    const { playlist_id } = this.state.playlist_data;
    if (playlist_id === "LL" || playlist_id === "WatchLater") return;
    const response = await deletePlaylist(playlist_id);
    if (response.status === 500) return;
    if (response.status === 200) this.props.history.push("/feed/library");
  };

  getLikedVideos = async () => {
    const response = await getUserLikedVideosPlaylist();
    let { videos } = response.data;
    const playlist_data = videos[1][0];
    document.title = locales.defaultPlaylists.LL + " - Clonetube";
    videos = videos[0];
    this.setState({ videos, playlist_data });
    this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
  };

  getVideos = async (search) => {
    const response = await getVideosFromPlaylist(search);
    let { videos } = response.data;
    const playlist_data = videos[1][0];
    const { playlist_name } = playlist_data;
    if (playlist_name === "WatchLater")
      document.title = locales.defaultPlaylists.WatchLater + " - Clonetube";
    else document.title = playlist_name + " - Clonetube";
    videos = videos[0];
    this.setState({ videos, playlist_data });
    this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      if (newProps.location.search === this.props.location.search) return false;
      const { location } = newProps;
      const { pathname, search } = location;
      if (
        this.props.location.search !== search &&
        newProps.location.search !== "?list=LL"
      ) {
        let { search } = newProps.location;
        search = search.substr(6);
        this.getVideos(search);
        this.setState({ search });
      }
      if (pathname === "/playlist" && search === "?list=LL") {
        this.getLikedVideos();
      }
    } else {
      let { search } = newProps.location;
      search = search.substr(6);
      this.setState({ search });
      if (search === "LL" || search === this.props.location.search.substr(6))
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
        ? "//s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg"
        : this.state.videos[0].thumbnail;
    const { playlist_data } = this.state;
    const { addToastNotification } = this.props;
    return (
      <div
        className={`playlist-container ${
          !this.props.darkTheme ? " playlist-container--light" : ""
        }`}
      >
        <div className="playlist-component-container">
          <div className="playlist-info-container">
            <div className="playlist-info">
              <div
                className="playlist-thumbnail"
                style={{ backgroundImage: `url('${playlistThumbnail}')` }}
              ></div>
              <span className="playlist-title">
                {playlist_data
                  ? playlist_data.playlist_name === "LL" ||
                    playlist_data.playlist_name === "WatchLater"
                    ? locales.defaultPlaylists[playlist_data.playlist_name]
                    : playlist_data.playlist_name
                  : ""}
              </span>
              <span className="playlist-title-user only-mobile">
                {playlist_data ? playlist_data.display_name : ""}
              </span>
              <span className="playlist-totalvideos">
                {this.state.videos.length} videos{" "}
                {playlist_data
                  ? playlist_data.playlist_name === "LL"
                    ? ""
                    : "· " +
                      locales.updated(
                        agoFormatting(playlist_data.updated_at, false)
                      )
                  : ""}
              </span>
              <span className="playlist-type">
                {playlist_data ? locales.playlistsType[playlist_data.type] : ""}
              </span>
              <div
                onClick={this.openConfirmModal}
                className="delete-playlist-mobile-btn"
              >
                <Delete className="icon-small-modal" />
              </div>
              {playlist_data &&
                playlist_data.playlist_name !== "LL" &&
                playlist_data.playlist_name !== "WatchLater" && (
                  <div
                    onClick={this.openDeleteModal}
                    className="delete-playlist-modal"
                  >
                    <Options className="icon-small-modal" />
                    {this.state.isDeleteModalActive && (
                      <div className="delete-playlist-desktop">
                        <SmallModal
                          style={{
                            width: "100px !important",
                            height: "36px !important",
                          }}
                          closeDropdown={this.closeDeleteModal}
                          right
                          autoWidth
                        >
                          <div
                            onClick={this.openConfirmModal}
                            className="modal-rv-item"
                          >
                            <Delete className="icon-small-modal" />
                            <span>{locales.delete}</span>
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
                src={playlist_data ? playlist_data.photo_url : ""}
              />
              <span>{playlist_data ? playlist_data.display_name : ""}</span>
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
              updateCurrentVideoData={this.props.updateCurrentVideoData}
              mutateRelatedVideos={this.props.mutateRelatedVideos}
              updateVideoThumb={this.props.updateVideoThumb}
              miniPlayerInfo={this.props.miniplayerInfo}
              history={this.props.history}
              playlistName={
                playlist_data
                  ? playlist_data.playlist_name === "LL" ||
                    playlist_data.playlist_name === "WatchLater"
                    ? locales.defaultPlaylists[playlist_data.playlist_name]
                    : playlist_data.playlist_name
                  : ""
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
            modalSize={"big"}
            closeModal={this.closeConfirmModal}
          />
        )}
      </div>
    );
  }
}

// const HistoryVideos = ({videoGroup, search, getVideos, user}) => {
//     return(
//         <>
//         {videoGroup.map((videoGroupItem, index) => {
//             const { date, videos } = videoGroupItem;
//             return(
//                 <>
//                     <h4>{date}</h4>
//                     {videos.map((video, index) => {
//                         const { video_id, current_length, length } = video;
//                         const pathname =  current_length ? current_length === length ? `/watch?v=${video_id}` : `/watch?v=${video_id}&t=${current_length}s` : `/watch?v=${video_id}`;
//                         return(
//                             <div key={video.id} className="playlist-video" >
//                                 <span className="number">{index + 1}</span>
//                                 <Link to={pathname} className="video-basic-data">
//                                     <div style={{backgroundImage: `url("${video.thumbnail}")`}} className="video-thumb">
//                                         <span>{video.video_duration}</span>
//                                         {(video.current_length !== undefined) &&
//                                         (<div className="video_current_progress" >
//                                             <div style={{width: ((100/video.length)*video.current_length)+'%'}} />
//                                         </div>)
//                                         }
//                                     </div>
//                                     <div className="video-title-channel-container">
//                                         <span className='video-title'>{video.video_title}</span>
//                                         <span className='video-channel'>{video.video_channel}ass</span>
//                                     </div>
//                                 </Link>
//                                 <HistoryOptionsButton />
//                             </div>
//                         )
//                     })}
//                 </>
//             )
//         })}
//         </>
//     );
// }

const PlaylistVideos = (props) => {
  const {
    updateLoadingState,
    updateCurrentVideoData,
    mutateRelatedVideos,
    updateVideoThumb,
    miniPlayerInfo,
    history,
    currentVideo,
    videos,
    search,
    getVideos,
    user,
    addToastNotification,
    getLikedVideos,
  } = props;
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

  if (videos.length === 0) {
    return <span className="playlist-empty-text">{locales.noVideos}</span>;
  }

  return (
    <>
      {videos.map((video, index) => {
        return (
          <PlaylistCard
            key={video.id}
            video={video}
            index={index}
            isMiniPlayerActive={isMiniPlayerActive}
            currentVideo={currentVideo}
            search={search}
            getVideos={getVideos}
            user={user}
            playlistName={props.playlistName}
            playlistData={props.playlistData}
            getLikedVideos={getLikedVideos}
            addToastNotification={addToastNotification}
            GoToMiniaturePlayerVideo={GoToMiniaturePlayerVideo}
            PlayOnMiniaturePlayer={PlayOnMiniaturePlayer}
            GoToVideo={GoToVideo}
          />
        );
      })}
    </>
  );
};

const PlaylistCard = ({
  video,
  index,
  isMiniPlayerActive,
  currentVideo,
  search,
  getVideos,
  user,
  playlistName,
  addToastNotification,
  GoToMiniaturePlayerVideo,
  PlayOnMiniaturePlayer,
  GoToVideo,
  playlistData,
  getLikedVideos,
}) => {
  const [playlistModal, setPlaylistModal] = useState(false);
  const { video_id, current_length, length } = video;
  const pathname = current_length
    ? current_length === length
      ? `/watch?v=${video_id}`
      : `/watch?v=${video_id}&t=${current_length}s`
    : `/watch?v=${video_id}`;
  return (
    <div key={video.id} className="playlist-video">
      <span className="number">{index + 1}</span>
      <a
        href={pathname}
        className="video-basic-data"
        onClick={(e) => {
          e.preventDefault();
          isMiniPlayerActive
            ? video_id === currentVideo.id
              ? GoToMiniaturePlayerVideo(video)
              : PlayOnMiniaturePlayer(video)
            : GoToVideo(video);
        }}
      >
        <div
          style={{ backgroundImage: `url("${video.thumbnail}")` }}
          className="video-thumb"
        >
          <span>{video.video_duration}</span>
          {video.current_length !== undefined && (
            <div className="video_current_progress">
              <div
                style={{
                  width: (100 / video.length) * video.current_length + "%",
                }}
              />
            </div>
          )}
          {currentVideo && isMiniPlayerActive
            ? video_id === currentVideo.id && <Overlay />
            : null}
        </div>
        <div className="video-title-channel-container">
          <span className="video-title">{video.video_title}</span>
          <span className="video-channel">{video.video_channel}</span>
        </div>
      </a>
      <OptionsButton
        search={search}
        getVideos={getVideos}
        user={user}
        video={video}
        playlistName={playlistName}
        openPlaylist={() => setPlaylistModal(true)}
        changeModalStatus={setPlaylistModal}
        addToastNotification={addToastNotification}
        playlistData={playlistData}
        getLikedVideos={getLikedVideos}
      />
      {playlistModal && (
        <AddToPlaylistModal
          isParentAThumbnail={true}
          modalPlaylist={() => setPlaylistModal(false)}
          uri={video.video_id}
          current_video_data={{
            title: video.video_title,
            author: video.video_channel,
            video_thumbnail: video.thumbnail,
            length_seconds: video.video_duration,
          }}
        />
      )}
    </div>
  );
};

class OptionsButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false,
      modal_position_up: false,
    };
    this.button = createRef();
  }

  closeModal = () => {
    this.setState({
      isModalActive: false,
      modal_position_up: false,
    });
  };

  openModal = () => {
    const button = this.button.current;
    const space = window.innerHeight - button.getBoundingClientRect().top;
    let modal_position_up = space < 213 ? true : false;
    this.setState({
      isModalActive: !this.state.isModalActive,
      modal_position_up,
    });
  };

  render() {
    const { isModalActive } = this.state;
    const {
      playlistName = "",
      addToastNotification,
      changeModalStatus,
      playlistData,
      getLikedVideos,
    } = this.props;
    return (
      <div className={"btn-container"}>
        {isModalActive && (
          <PlaylistModal
            search={this.props.search}
            getVideos={this.props.getVideos}
            user={this.props.user}
            video={this.props.video}
            modal_element={this.state.modal_element}
            closeModal={this.closeModal}
            is_modal_up={this.state.modal_position_up}
            playlistName={playlistName}
            changeModalStatus={changeModalStatus}
            addToastNotification={addToastNotification}
            playlistData={playlistData}
            getLikedVideos={getLikedVideos}
          />
        )}
        <span
          style={{ paddingTop: 25 }}
          ref={this.button}
          onClick={this.openModal}
          className="btn-options"
        >
          <span className="three-points-toggle" />
        </span>
      </div>
    );
  }
}

class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addToPlaylist = async () => {
    const { user, closeModal, addToastNotification } = this.props;

    if (user === null) return false;
    const { uid } = user;
    const {
      video_title,
      video_channel,
      id,
      thumbnail,
      video_duration,
    } = this.props.video;
    const playlistName = "WatchLater";
    const video_object = {
      uid,
      videoid: id,
      title: video_title,
      uploader: video_channel,
      length_seconds: video_duration,
      playlistName,
      type: 1,
      thumbnail,
    };
    const response = await addVideoToPlaylist(video_object);
    if (response.status === 200) {
      addToastNotification({
        toast_message: "Saved to Watch later",
        id: String(new Date()) + "added_to_wl",
      });
      closeModal();
    }
  };

  deleteFromPlaylist = async () => {
    const {
      video,
      addToastNotification,
      closeModal,
      user,
      getVideos,
      getLikedVideos,
      search,
      playlistData,
    } = this.props;
    const { uid } = user;
    const { video_id } = video;
    const playlist_id = search;
    const { playlist_name } = playlistData;
    if (playlist_name === "LL") {
      const response = await removeLikedVideo(uid, playlist_id, video_id);
      if (response.status === 200) {
        getLikedVideos(uid);
        addToastNotification({
          toast_message: `Removed from Liked videos`,
          id: String(new Date()) + "added_to_wl",
        });
      }
    } else {
      const response = await deleteVideoFromPlaylist(
        uid,
        playlist_id,
        video_id
      );
      if (response.status === 200) {
        getVideos(search);
        addToastNotification({
          toast_message: `Removed from ${playlist_name}`,
          id: String(new Date()) + "added_to_wl",
        });
      }
    }
    closeModal();
  };

  render() {
    const {
      is_modal_up,
      closeModal,
      modal_element,
      playlistName = "",
      changeModalStatus,
      user,
      playlistData,
    } = this.props;
    return (
      <SmallModal
        modal_element={modal_element}
        closeDropdown={closeModal}
        is_modal_up={is_modal_up}
      >
        <div className="modal-innercontainer">
          {user && (
            <>
              <div onClick={this.addToPlaylist} className="modal-rv-item">
                <WatchLater className="icon-small-modal" />
                <span>{locales.smallModal.watchLater}</span>
              </div>
              <div
                onClick={() => {
                  closeModal();
                  changeModalStatus(true);
                }}
                className="modal-rv-item"
              >
                <Playlist className="icon-small-modal playlist" />
                <span>{locales.smallModal.playlist}</span>
              </div>

              {user.uid === playlistData.uid && (
                <>
                  <div className="divider">
                    <div className="inner-divider" />
                  </div>
                  <div
                    onClick={this.deleteFromPlaylist}
                    className="modal-rv-item"
                  >
                    <Delete className="icon-small-modal" />
                    <span>{locales.smallModal.remove(playlistName)}</span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </SmallModal>
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
    mutateRelatedVideos: (payload) => dispatch(mutateRelatedVideos(payload)),
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
    addToastNotification: (payload) => dispatch(addToastNotification(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistHome);
