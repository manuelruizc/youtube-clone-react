import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLoadingState } from "../../actions/darkTheme";
import { getLibraryUserInfo, LOADING_STATES } from "../../helpers/helpers";
import locales from "../../locales/library";
import NotLoggedInScreen from "../shared/NotLoggedInScreen";
import SectionContainer from "./components/SectionContainer";
import UserInfo from "./components/UserInfo";
import "./library.scss";

const TokenExists = localStorage.getItem("jwt_token");

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      last_history_videos: [],
      liked_videos: [],
      watch_later_videos: [],
      playlists: [],
      isDataLoaded: false,
      user_info: null,
      gotInfo: false,
    };
  }

  getLibraryData = async (uid) => {
    const self = this;
    axios
      .get(`database/user_library/last_history_videos/${uid}`)
      .then((response) => {
        const { data } = response;
        const {
          error,
          last_history_videos,
          liked_videos,
          watch_later_videos,
          playlists,
        } = data;
        if (error) return;

        self.setState({
          last_history_videos,
          liked_videos,
          watch_later_videos,
          playlists,
          gotInfo: true,
        });
        self.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
      })
      .catch((error) => console.error(error));
  };

  getUserInfo = async (uid) => {
    const response = await getLibraryUserInfo(uid);
    const { user_info } = response.data;
    this.setState({ user_info: user_info[0] });
  };
  async componentDidMount() {
    this.props.updateLoadingState(LOADING_STATES.LOADING);
    document.body.style.overflow = "auto";
    document.title = locales.title + " - CloneTube";
    if (!TokenExists)
      this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
    if (!this.props.user) return;
    const { uid } = this.props.user;
    this.getLibraryData(uid);
    this.getUserInfo(uid);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (!this.props.user && newProps.user) {
      const { uid } = newProps.user;
      this.getLibraryData(uid);
      this.getUserInfo(uid);
      return true;
    }
    return false;
  }

  render() {
    if (!TokenExists) {
      return (
        <NotLoggedInScreen
          title="Enjoy your favorite videos"
          description="Sign in to access videos that you’ve liked or saved"
          icon="library"
        />
      );
    }
    const { darkTheme } = this.props;
    if (!this.state.gotInfo) {
      return (
        <div
          className={`library-main-container ${!darkTheme && "light-theme"}`}
        />
      );
    }

    const {
      last_history_videos,
      liked_videos,
      watch_later_videos,
      playlists,
      user_info,
    } = this.state;
    const history_videos = last_history_videos;
    const liked_videos_count =
      liked_videos.length > 0 ? liked_videos[0].total_video_count : 0;
    const watch_later_count =
      watch_later_videos.length > 0
        ? watch_later_videos[0].total_video_count
        : 0;
    return (
      <div className={`library-main-container ${!darkTheme && "light-theme"}`}>
        <div className="library-data-container">
          <SectionContainer
            iconName="history"
            title={locales.headers.history}
            videos={history_videos.slice(0, 8)}
            hasVideoCount={false}
            pathname="/feed/history"
          />
          <SectionContainer
            iconName="watchlater"
            title={locales.headers.watchLater}
            videos={watch_later_videos}
            hasVideoCount={watch_later_count === 0 ? false : true}
            videoCount={watch_later_count}
            pathname="/feed/history"
          />
          <SectionContainer
            iconName="playlists"
            title={locales.headers.playlists}
            videos={playlists}
            pathname="/feed/history"
          />
          <SectionContainer
            iconName="likedvideos"
            title={locales.headers.likedVideos}
            videos={liked_videos}
            hasVideoCount={liked_videos_count === 0 ? false : true}
            videoCount={liked_videos_count}
            pathname="/playlist?list=LL"
          />
        </div>
        <div className="library-user-container">
          <UserInfo user={user_info} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    darkTheme: state.darkTheme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
