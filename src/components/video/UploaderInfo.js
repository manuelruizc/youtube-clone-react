import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addToastNotification,
  updateVisitorModal,
} from "../../actions/darkTheme";
import { Save, Share, ThumbDown, ThumbUp } from "../../assets/Icons";
import {
  checkIfVideoExistsInPlaylist,
  commaFormatting,
  convertMinsSecs,
  getUserPlaylists,
  isUserSubscribed,
  KiloFormatting,
  ownerBadgeText,
  subscribeToAChannel,
} from "../../helpers/helpers";
import locales from "../../locales/video";
import AddToPlaylistModal from "../shared/AddToPlaylistModal";
import ConfirmActionModal from "../shared/ConfirmActionModal";
import OwnerBadges from "../shared/OwnerBadges";
import ToolTip from "../shared/ToolTip";
import CommentSection from "./CommentSection";
import VideoDescriptions from "./VideoDescriptions";

class UploaderInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVideoDisliked: false,
      isVideoLiked: false,
      videoid: "",
      isModalPlaylist: false,
      isModalDownload: false,
      playlistNameActive: false,
      playlist: [
        { title: "Pública", value: 1 },
        { title: "No listada", value: 2 },
        { title: "Privada", value: 3 },
      ],
      currentPlaylist: { title: "Pública", value: 1 },
      isModalPrivacy: false,
      playlistName: "",
      databasePlaylists: [],
      playlistsIncludingVideo: [],
      isSubscribed: false,
      confirm_modal: false,
      descriptionShowMore: false,
    };
  }

  componentDidMount() {
    const { user, videoid, current_video_data } = this.props;
    if (user !== null) {
      const { uid } = user;
      const { id } = current_video_data.uploader_info;
      this.isVideoLiked(uid, videoid);
      this.getPlaylists(uid);
      this.getSubscriptionState(uid, id);
    }
  }

  closeConfirmModal = () => this.setState({ confirm_modal: false });
  openConfirmModal = () => this.setState({ confirm_modal: true });

  getSubscriptionState = async (uid, cid) => {
    const response = await isUserSubscribed(uid, cid);
    const { isSubscribed } = response.data;
    this.setState({ isSubscribed });
  };

  subscribeToChannel = async () => {
    const { isSubscribed } = this.state;
    const is_subscribed = isSubscribed ? 0 : 1;
    const { user, current_video_data, addToastNotification } = this.props;
    const { uid } = user;
    const { thumbnails, id, name } = current_video_data.uploader_info;
    const avatar = thumbnails[thumbnails.length - 1].url;
    const response = await subscribeToAChannel(
      uid,
      id,
      name,
      avatar,
      is_subscribed
    );
    const { error } = response.data;
    if (!error) {
      addToastNotification({
        toast_message: isSubscribed
          ? locales.uploaderInfo.toast.subscription.subscribed
          : locales.uploaderInfo.toast.subscription.unsubscribed,
        id: String(new Date()) + "subscribe_to_channel",
      });
      return this.setState({ isSubscribed: !isSubscribed });
    }
  };

  isVideoLiked = (uid, videoid) => {
    const self = this;
    axios
      .post(`/database/is_video_liked`, { uid, videoid })
      .then((response) => {
        self.setState({
          isVideoLiked: response.data.video_liked,
          isVideoDisliked: response.data.video_disliked,
        });
      })
      .catch((error) => console.error(error));
  };
  getPlaylists = async (uid) => {
    const response = await getUserPlaylists(uid);
    const { playlists } = response.data;
    this.getPlaylistsIncludingVideo(uid, playlists);
  };

  getPlaylistsIncludingVideo = async (uid, databasePlaylists) => {
    const uri = this.props.history.location.search.substr(3);
    const response = await checkIfVideoExistsInPlaylist(uri, uid);
    let { playlists } = response.data;
    playlists = playlists.map((playlist) => playlist.playlist_name);
    this.setState({ playlistsIncludingVideo: playlists, databasePlaylists });
  };

  modalPlaylist = (close = true) => {
    if (close) this.setState({ isModalPlaylist: false, isModalPrivacy: false });
    else this.setState({ isModalPlaylist: true });
  };

  activeDownloadModal = (open = true) => {
    if (!open) {
      this.setState({ isModalDownload: false });
      return;
    }
    const self = this;
    axios
      .get(`/database/get_user_downloads/${this.props.user.uid}`)
      .then((response) => {
        const { token_redeemed, downloads } = response.data.results;
        if (!token_redeemed && downloads > 5) {
          self.props.updateVisitorModal(true);
          return;
        }
        self.setState({ isModalDownload: open ? true : false });
      })
      .catch((error) => console.error(error));
  };

  playlistActive = (open = true) => {
    if (open) this.setState({ playlistNameActive: true });
  };

  privacyActive = (close = true) => {
    if (close) this.setState({ isModalPrivacy: false });
    else this.setState({ isModalPrivacy: true });
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.videoid !== this.props.videoid) {
      const { user } = this.props;
      if (user !== null) {
        const { uid } = user;
        this.isVideoLiked(uid, newProps.videoid);
        this.getPlaylists(uid);
      }
      return true;
    }
    if (!newProps.current_video_data) return false;
    if (
      JSON.stringify(newProps.current_video_data) !==
      JSON.stringify(this.props.current_video_data)
    ) {
      const { id } = newProps.current_video_data.uploader_info;
      const { user } = newProps;
      if (user !== null) {
        const { uid } = user;
        this.getSubscriptionState(uid, id);
      }
      return true;
    }
    return false;
  }

  viewsFormatting = (views_int) => {
    if (isNaN(views_int)) return "362";
    if (views_int < 1000) return String(views_int);
    const views_string = String(views_int);
    let views_string_split_array = views_string.split("").reverse();
    views_string_split_array = views_string_split_array.map((number, i) => {
      const current_iteration = i + 1;
      if (
        current_iteration % 3 === 0 &&
        i < views_string_split_array.length - 1
      ) {
        return "," + number;
      }
      return number;
    });
    const formatted_views = views_string_split_array.reverse().join("");
    return formatted_views;
  };

  subscribersFormatting = (subs) => {
    if (subs !== undefined) {
      if (subs < 1000) {
        return subs;
      } else if (subs >= 1000 && subs < 10000) {
        subs = String(subs);
        return `${subs.substr(0, 1)},${subs.substr(1, 1)}00`;
      } else if (subs >= 10000 && subs < 1000000) {
        subs = String(subs);
        return subs.length < 6
          ? `${subs.substr(0, 2)},${subs.substr(2, 1)}00`
          : `${subs.substr(0, 3)},${subs.substr(3, 1)}00`;
      } else if (subs >= 1000000 && subs < 9999999) {
        subs = String(subs);
        return `${subs.substr(0, 1)}.${subs.substr(1, 2)}M`;
      } else if (subs >= 10000000 && subs < 99999999) {
        subs = String(subs);
        return `${subs.substr(0, 2)}.${subs.substr(2, 2)}M`;
      }
      return subs;
    }
    return subs;
  };

  voteVideo = (e, like = true) => {
    e.preventDefault();
    const { state, props } = this;
    if (props.video === null) return false;
    const { videoid, user, addToastNotification } = props;
    const { title, uploader, length, video_posters } = props.video_data;
    const thumbnail = video_posters[video_posters.length - 1].url;

    const videoDuration = convertMinsSecs(length * 1000, length);

    if (like) {
      if (user !== null && !state.isVideoLiked) {
        addToastNotification({
          toast_message: locales.uploaderInfo.toast.likes.liked,
          id: String(new Date()) + "vote_video",
        });
        const { uid } = user;
        const videoliked = true;
        const videodisliked = false;
        axios
          .post(`/database/like_video`, {
            uid,
            videoid,
            title,
            uploader,
            videoDuration,
            videoliked,
            videodisliked,
            thumbnail,
          })
          .then((response) => {})
          .catch((error) => console.error(error));
      } else if (user !== null && state.isVideoLiked) {
        addToastNotification({
          toast_message: locales.uploaderInfo.toast.likes.unliked,
          id: String(new Date()) + "vote_video",
        });
        const { uid } = user;
        const videoliked = false;
        const videodisliked = false;
        axios
          .post(`/database/like_video`, {
            uid,
            videoid,
            title,
            uploader,
            videoDuration,
            videoliked,
            videodisliked,
            thumbnail,
          })
          .then((response) => {})
          .catch((error) => console.error(error));
      }
      this.setState({
        isVideoLiked: !state.isVideoLiked,
        isVideoDisliked: false,
      });
      return true;
    }

    if (user !== null && !state.isVideoDisliked) {
      addToastNotification({
        toast_message: locales.uploaderInfo.toast.likes.disliked,
        id: String(new Date()) + "vote_video",
      });
      const { uid } = user;
      const videoliked = false;
      const videodisliked = true;
      axios
        .post(`/database/like_video`, {
          uid,
          videoid,
          title,
          uploader,
          videoDuration,
          videoliked,
          videodisliked,
          thumbnail,
        })
        .then((response) => {})
        .catch((error) => console.error(error));
    } else if (user !== null && state.isVideoDisliked) {
      addToastNotification({
        toast_message: locales.uploaderInfo.toast.likes.undisliked,
        id: String(new Date()) + "vote_video",
      });
      const { uid } = user;
      const videoliked = false;
      const videodisliked = false;
      axios
        .post(`/database/like_video`, {
          uid,
          videoid,
          title,
          uploader,
          videoDuration,
          videoliked,
          videodisliked,
          thumbnail,
        })
        .then((response) => {})
        .catch((error) => console.error(error));
    }

    this.setState({
      isVideoDisliked: !state.isVideoDisliked,
      isVideoLiked: false,
    });
    return true;
  };

  updatePlaylistName = (object) => {
    this.setState(object);
  };

  toggleShowDescription = () => {
    this.setState({ descriptionShowMore: !this.state.descriptionShowMore });
  };

  render() {
    let {
      likes,
      dislikes,
      views,
      title,
      description,
      uploader,
      date,
      thumb,
      suscribers,
      uploader_info,
      owner_badges,
      id,
    } = this.props.video_data;
    let {
      isVideoLiked,
      isVideoDisliked,
      isSubscribed,
      descriptionShowMore,
    } = this.state;
    const { user, updateVisitorModal } = this.props;

    return (
      <React.Fragment>
        <div className="videoinfo-container">
          <h1>{title}</h1>
          <div className="videoinfo-datacontainer">
            <span className="videoinfo-views">
              {this.viewsFormatting(views)} vistas • {date}
            </span>
            <div className="videoinfo-buttonwrapper">
              <LikesWrapper
                user={user}
                updateVisitorModal={updateVisitorModal}
                voteVideo={this.voteVideo}
                isVideoLiked={isVideoLiked}
                isVideoDisliked={isVideoDisliked}
                likes={likes}
                dislikes={dislikes}
              />
              <ToolTip
                message={locales.uploaderInfo.tooltips.share}
                component={
                  <ShareButton
                    user={user}
                    updateVisitorModal={updateVisitorModal}
                    modalPlaylist={this.modalPlaylist}
                  />
                }
              />
              <ToolTip
                message={locales.uploaderInfo.tooltips.save}
                component={
                  <SaveButton
                    user={user}
                    updateVisitorModal={updateVisitorModal}
                    modalPlaylist={this.modalPlaylist}
                  />
                }
              />
              <i className="fa fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
        <div
          className={
            !description
              ? "videouser-container videouser-container--null-description"
              : descriptionShowMore
              ? "videouser-container videouser-container--active-description"
              : "videouser-container"
          }
        >
          <div className="image-container">
            <div className="userinfo-container">
              <img src={`${thumb}`} alt="User thumbnail" />
              <div className="userinfo-wrapper">
                <div className="channel-name-container">
                  <ToolTip message={uploader}>
                    <span className="uploader">{uploader}</span>
                  </ToolTip>
                  {owner_badges && (
                    <ToolTip
                      message={ownerBadgeText(owner_badges)}
                      component={<OwnerBadges badges={owner_badges} />}
                    />
                  )}
                </div>
                <span className="date">
                  {this.subscribersFormatting(suscribers)}{" "}
                  {locales.uploaderInfo.subscribers}
                </span>
              </div>
            </div>
            <div
              className={isSubscribed ? "sub-btn unsub" : "sub-btn"}
              style={{ cursor: "pointer" }}
              onClick={
                !user
                  ? updateVisitorModal
                  : isSubscribed
                  ? this.openConfirmModal
                  : this.subscribeToChannel
              }
            >
              {isSubscribed
                ? locales.uploaderInfo.subscribeButton.subscribed
                : locales.uploaderInfo.subscribeButton.unsubscribed}
            </div>
          </div>
          <VideoDescriptions
            description={description}
            active={descriptionShowMore}
            toggle={this.toggleShowDescription}
          />
        </div>
        {this.state.isModalPlaylist && this.props.video_data ? (
          <AddToPlaylistModal
            isParentAThumbnail={false}
            modalPlaylist={this.modalPlaylist}
            uri={this.props.history.location.search.substr(3)}
            current_video_data={this.props.video_data}
          />
        ) : null}
        {this.state.confirm_modal && (
          <ConfirmActionModal
            description={locales.uploaderInfo.unsubscribeModal.description(
              uploader_info.name
            )}
            actionButtonTitle={
              locales.uploaderInfo.unsubscribeModal.confirmButton
            }
            action={this.subscribeToChannel}
            modalSize={"small"}
            closeModal={this.closeConfirmModal}
          />
        )}
        <CommentSection videoId={id} />
      </React.Fragment>
    );
  }
}

const SaveButton = ({ user, updateVisitorModal, modalPlaylist }) => {
  return (
    <span
      onClick={!user ? updateVisitorModal : () => modalPlaylist(false)}
      className="video-actions-container"
    >
      <Save className="video-action-icon" />
      <span>{locales.uploaderInfo.tooltips.save}</span>
    </span>
  );
};

const LikesWrapper = ({
  user,
  updateVisitorModal,
  voteVideo,
  isVideoLiked,
  isVideoDisliked,
  likes,
  dislikes,
}) => {
  let likesWidth = 0;
  let dislikesWidth = 0;
  const intLikes = Number(likes.split(",").join(""));
  const intDislikes = Number(dislikes.split(",").join(""));
  let newLikes = intLikes + 1;
  let newDislikes = intDislikes + 1;

  if (likes !== undefined) {
    const percentage_likes = isVideoLiked ? newLikes : intLikes;
    const percentage_dislikes = isVideoDisliked ? newDislikes : intDislikes;
    const percentage = percentage_likes + percentage_dislikes;
    likesWidth = (100 / percentage) * percentage_likes;
    dislikesWidth = (100 / percentage) * percentage_dislikes;
  }
  return (
    <div className="likes-wrapper">
      <ToolTip
        message={
          isVideoLiked
            ? locales.uploaderInfo.tooltips.like.active
            : locales.uploaderInfo.tooltips.like.unactive
        }
      >
        <span
          onClick={!user ? updateVisitorModal : (e) => voteVideo(e)}
          className="like-btn"
          href="#"
        >
          <ThumbUp
            className={`thumb-icon ${isVideoLiked ? "video-liked-color" : ""}`}
          />
          <span className={`${isVideoLiked ? "video-liked-color" : ""}`}>
            {isVideoLiked ? KiloFormatting(newLikes) : KiloFormatting(likes)}
          </span>
        </span>
      </ToolTip>
      <ToolTip message={locales.uploaderInfo.tooltips.dislike}>
        <span
          onClick={!user ? updateVisitorModal : (e) => voteVideo(e, false)}
          className="like-btn dislike-btn"
          href="#"
        >
          <ThumbDown
            className={`thumb-icon ${
              isVideoDisliked ? "video-liked-color" : ""
            }`}
          />
          <span className={`${isVideoDisliked ? "video-liked-color" : ""}`}>
            {isVideoDisliked
              ? KiloFormatting(newDislikes)
              : KiloFormatting(dislikes)}
          </span>
        </span>
      </ToolTip>
      <ToolTip
        message={`${commaFormatting(likes)} / ${commaFormatting(dislikes)}`}
        childrenIsAbsolute={true}
      >
        <div className="likes-bar-container">
          <div className="likes-bar">
            <div
              className={
                isVideoLiked || isVideoDisliked ? "putcolor" : "nocolor"
              }
              style={{
                width: `${likesWidth}%`,
                height: "100%",
                transition: "0.3s linear all",
              }}
            ></div>
            <div
              style={{
                width: `${dislikesWidth}%`,
                height: "100%",
                transition: "0.3s linear all",
              }}
            ></div>
          </div>
        </div>
      </ToolTip>
    </div>
  );
};

const ShareButton = ({ user, updateVisitorModal, modalPlaylist }) => {
  return (
    <span
      onClick={!user ? updateVisitorModal : () => modalPlaylist(false)}
      className="video-actions-container"
    >
      <Share className="video-action-icon" />
      <span>{locales.uploaderInfo.tooltips.share}</span>
    </span>
  );
};

const mapStateToProps = (state) => {
  return {
    darkTheme: state.darkTheme,
    user: state.user,
    current_video_data: state.current_video_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateVisitorModal: (payload) => dispatch(updateVisitorModal(payload)),
    addToastNotification: (payload) => dispatch(addToastNotification(payload)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UploaderInfo)
);
