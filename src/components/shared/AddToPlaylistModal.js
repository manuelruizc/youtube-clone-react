import React, { Component } from "react";
import { connect } from "react-redux";
import { addToastNotification } from "../../actions/darkTheme";
import { CloseButton } from "../../assets/Icons";
import {
  addVideoToExistingPlaylist,
  addVideoToPlaylist,
  checkIfVideoExistsInPlaylist,
  convertMinsSecs,
  deleteVideoFromExistingPlaylist,
  getUserPlaylists,
} from "../../helpers/helpers";
import locales from "../../locales/playlistmodal";
import "./addtoplaylistmodal.scss";

class AddToPlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistNameActive: false,
      playlist_name: "",
      isPrivacyOptionActive: false,
      playlist: locales.playlistsPrivacy,
      current_playlist: locales.playlistsPrivacy[0],
      database_playlists: [],
      playlists_including_video: [],
    };
  }

  getPlaylists = async (uid) => {
    const response = await getUserPlaylists(uid);
    const { playlists } = response.data;
    this.getPlaylistsIncludingVideo(uid, playlists);
  };

  getPlaylistsIncludingVideo = async (uid, database_playlists) => {
    const { uri } = this.props;
    const response = await checkIfVideoExistsInPlaylist(uri, uid);
    let { playlists } = response.data;
    playlists = playlists.map((playlist) => playlist.playlist_name);
    this.setState({ playlists_including_video: playlists, database_playlists });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.uri !== this.props.uri) {
      const { user } = this.props;
      if (user !== null) {
        const { uid } = user;
        this.getPlaylists(uid);
      }
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (this.props.user) {
      this.getPlaylists(this.props.user.uid);
    }
  }

  privacyActive = (close = true) => {
    this.setState({ isPrivacyOptionActive: close ? false : true });
  };

  _activateNewPlaylistProcess = () => {
    this.setState({ playlistNameActive: true });
  };

  updatePlaylistName = (text) => {
    this.setState({ playlist_name: text });
  };

  selectPrivacy = (index) => {
    this.privacyActive();
    this.setState({ current_playlist: this.state.playlist[index] });
  };

  checkboxChanged = async (e, index) => {
    const checkbox = e.target;
    const { user, uri, addToastNotification } = this.props;

    if (user === null) return false;

    const {
      title,
      uploader,
      video_posters,
      length,
    } = this.props.current_video_data;
    const videoDuration = convertMinsSecs(
      Number(length) * 1000,
      Number(length)
    );
    const thumbnail =
      video_posters.length - 1 === 1
        ? video_posters[video_posters.length - 1].url
        : video_posters[video_posters.length - 2].url;
    const playlist_name = checkbox.value;
    let database_playlists = this.state.database_playlists;
    let playlists_including_video = this.state.playlists_including_video;

    const { uid } = user;

    if (checkbox.checked) {
      playlists_including_video.filter(
        (playlist) => playlist !== playlist_name
      );
      this.setState({ playlists_including_video });
      const video_object = {
        videoid: uri,
        title,
        uploader,
        videoDuration,
        playlistName: playlist_name,
        thumbnail,
      };
      const response = await addVideoToExistingPlaylist(uid, video_object);
      if (response.status === 200) {
        addToastNotification({
          toast_message: `Added to ${playlist_name}`,
          id: String(new Date()) + "added_to_playlist",
        });
        this.getPlaylists(uid);
      } else {
        addToastNotification({
          toast_message: `There was an error.`,
          id: String(new Date()) + "added_to_playlist",
        });
      }
    } else {
      playlists_including_video.push(database_playlists[index]);
      this.setState({ playlists_including_video });
      const video_object = { videoid: uri, playlistName: playlist_name };
      const response = await deleteVideoFromExistingPlaylist(uid, video_object);
      if (response.status === 200) {
        this.getPlaylists(uid);
        addToastNotification({
          toast_message: `Removed from ${playlist_name}`,
          id: String(new Date()) + "added_to_playlist",
        });
      } else {
        addToastNotification({
          toast_message: `There was an error.`,
          id: String(new Date()) + "added_to_playlist",
        });
      }
    }
  };

  checkboxChangedRelatedVideo = async (e) => {
    const checkbox = e.target;
    const { user, uri, addToastNotification, current_video_data } = this.props;

    if (user === null) return false;

    const {
      title,
      author,
      video_thumbnail,
      length_seconds,
      thumbnails,
    } = current_video_data;
    const videoDuration =
      typeof length_seconds === "string"
        ? length_seconds
        : convertMinsSecs(length_seconds * 1000, length_seconds);
    const playlist_name = checkbox.value;
    const new_playlists = this.state.playlists_including_video.filter(
      (play) => play.playlist_name !== playlist_name
    );
    this.setState({ playlists_including_video: new_playlists });

    const { uid } = user;

    if (checkbox.checked) {
      const video_object = {
        videoid: uri,
        title,
        uploader: author.name ? author.name : author,
        videoDuration,
        playlistName: playlist_name,
        thumbnail: thumbnails
          ? thumbnails[thumbnails.length - 1].url
          : video_thumbnail,
      };
      const response = await addVideoToExistingPlaylist(uid, video_object);
      if (response.status === 200) {
        this.getPlaylists(uid);
        addToastNotification({
          toast_message: `Added to ${playlist_name}`,
          id: String(new Date()) + "added_to_playlist",
        });
      } else {
        addToastNotification({
          toast_message: `There was an error.`,
          id: String(new Date()) + "added_to_playlist",
        });
      }
    } else {
      const video_object = { videoid: uri, playlistName: playlist_name };
      const response = await deleteVideoFromExistingPlaylist(uid, video_object);
      if (response.status === 200) {
        addToastNotification({
          toast_message: `Removed from ${playlist_name}`,
          id: String(new Date()) + "added_to_playlist",
        });
        this.getPlaylists(uid);
      } else {
        addToastNotification({
          toast_message: `There was an error.`,
          id: String(new Date()) + "added_to_playlist",
        });
      }
    }
  };

  addToPlaylist = async () => {
    const { playlist_name } = this.state;
    if (playlist_name === "") return;
    const { user, current_video_data, uri, addToastNotification } = this.props;
    const { title, uploader, video_posters, length } = current_video_data;
    const videoDuration = length;
    const thumbnail =
      video_posters.length - 1 === 1
        ? video_posters[video_posters.length - 1].url
        : video_posters[video_posters.length - 2].url;
    if (user === null) return false;
    const { uid } = user;
    const video_object = {
      uid,
      videoid: uri,
      title,
      uploader,
      videoDuration,
      length_seconds: Number(videoDuration),
      playlistName: playlist_name,
      type: this.state.current_playlist.value,
      thumbnail,
    };
    const response = await addVideoToPlaylist(video_object);
    if (response.status === 200) {
      this.setState({ playlist_name: "" }, () => {
        this.getPlaylists(uid);
        this.props.modalPlaylist();
        addToastNotification({
          toast_message: `Added to ${playlist_name}`,
          id: String(new Date()) + "added_to_playlist",
        });
      });
    } else {
      addToastNotification({
        toast_message: `There was an error.`,
        id: String(new Date()) + "added_to_playlist",
      });
    }
  };

  addToPlaylistRelatedVideo = async () => {
    const { user, current_video_data, uri, addToastNotification } = this.props;
    const {
      title,
      author,
      video_thumbnail,
      length_seconds,
      thumbnails,
    } = current_video_data;
    const videoDuration = length_seconds;
    const { playlist_name } = this.state;
    if (user === null) return false;
    const { uid } = user;
    const video_object = {
      uid,
      videoid: uri,
      title,
      uploader: author.name ? author.name : author,
      videoDuration,
      length_seconds: videoDuration,
      playlistName: playlist_name,
      type: this.state.current_playlist.value,
      thumbnail: thumbnails
        ? thumbnails[thumbnails.length - 1].url
        : video_thumbnail,
    };
    const response = await addVideoToPlaylist(video_object);

    if (response.status === 200) {
      this.setState({ playlist_name: "" }, () => {
        this.getPlaylists(uid);
        addToastNotification({
          toast_message: `Added to ${playlist_name}`,
          id: String(new Date()) + "added_to_playlist",
        });
      });
    } else {
      addToastNotification({
        toast_message: `There was an error.`,
        id: String(new Date()) + "added_to_playlist",
      });
    }
  };

  render() {
    const { isParentAThumbnail, darkTheme } = this.props;
    return (
      <div
        id="modal-container"
        className={
          darkTheme ? "modal-container" : "modal-container--light-theme"
        }
      >
        <div onClick={this.props.modalPlaylist} id="modal-out"></div>
        <div className="playlist-form-container">
          <div className="form-header">
            <span>{locales.modal.title}</span>
            <CloseButton className="close-playlist-icon" />
          </div>
          <div className="playlist-scroll">
            {this.state.database_playlists.map((playlist, index) => {
              let _playlistName = playlist.playlist_name;

              if (
                _playlistName === "WatchLater" ||
                _playlistName === "Favorites"
              )
                _playlistName = locales.customPlaylists[_playlistName];
              return (
                <label key={index}>
                  <div
                    className={
                      this.state.playlists_including_video.includes(
                        playlist.playlist_name
                      )
                        ? "box-checking checked"
                        : "box-checking"
                    }
                  >
                    <div
                      className={
                        this.state.playlists_including_video.includes(
                          playlist.playlist_name
                        )
                          ? "box-checked"
                          : "box-uncheked"
                      }
                    >
                      <i className={"fa fa-check"} />
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    onChange={
                      isParentAThumbnail
                        ? (e) => this.checkboxChangedRelatedVideo(e, index)
                        : (e) => this.checkboxChanged(e, index)
                    }
                    id={index}
                    checked={
                      this.state.playlists_including_video.includes(
                        playlist.playlist_name
                      )
                        ? true
                        : false
                    }
                    value={playlist.playlist_name}
                  />
                  <span>{_playlistName}</span>
                </label>
              );
            })}
          </div>
          {this.state.playlistNameActive ? (
            <NewPlaylistForm
              playlist_name={this.state.playlist_name}
              updatePlaylistName={this.updatePlaylistName}
              isPrivacyOptionActive={this.state.isPrivacyOptionActive}
              selectPrivacy={this.selectPrivacy}
              playlist={this.state.playlist}
              current_playlist={this.state.current_playlist}
              privacyActive={this.privacyActive}
              addToPlaylist={
                isParentAThumbnail
                  ? this.addToPlaylistRelatedVideo
                  : this.addToPlaylist
              }
            />
          ) : (
            <div
              onClick={this._activateNewPlaylistProcess}
              className="add-new-playlist"
            >
              + {locales.modal.add}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const NewPlaylistForm = (props) => {
  return (
    <div className="playlist-name-form">
      <PlaylistNameForm
        playlist_name={props.playlist_name}
        updatePlaylistName={props.updatePlaylistName}
      />
      <PrivacySelectionContainer
        privacyActive={props.privacyActive}
        current_playlist={props.current_playlist}
      >
        {props.isPrivacyOptionActive && (
          <PrivacySelection
            selectPrivacy={props.selectPrivacy}
            playlist={props.playlist}
          />
        )}
      </PrivacySelectionContainer>
      <span onClick={props.addToPlaylist} className="create-playlist">
        {locales.newPlaylistModal.confirmButton}
      </span>
    </div>
  );
};
const PlaylistNameForm = (props) => {
  return (
    <div className="playlist-group-form">
      <label>{locales.newPlaylistModal.name.title}</label>
      <input
        type="text"
        placeholder={locales.newPlaylistModal.name.placeholder}
        value={props.playlist_name}
        onChange={(e) => props.updatePlaylistName(e.target.value)}
      />
    </div>
  );
};
const PrivacySelectionContainer = (props) => {
  return (
    <div className="playlist-group-form">
      <label>{locales.newPlaylistModal.privacy.title}</label>
      <div className="select-privacy">
        <div
          className="active-privacy"
          onClick={() => props.privacyActive(false)}
          data-value={props.current_playlist.value}
        >
          {props.current_playlist.title}
        </div>
        <i className={"fa fa-caret-down"} />
        {props.children}
      </div>
    </div>
  );
};

const PrivacySelection = (props) => {
  return (
    <div className="privacy-container">
      {props.playlist.map((play, i) => {
        return (
          <div
            key={i}
            onClick={() => props.selectPrivacy(i)}
            className="privacy-setting"
          >
            {play.title}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    darkTheme: state.darkTheme,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToastNotification: (payload) => dispatch(addToastNotification(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylistModal);
