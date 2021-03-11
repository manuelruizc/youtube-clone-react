import React, { Component } from "react";
import { connect } from "react-redux";
import {
  mutateRelatedVideos,
  toggleAutoplay,
  updateVideoEnded,
} from "../../actions/darkTheme";
import { _getVideoSource } from "../../helpers/helpers";
import locales from "../../locales/relatedvideos";
import ToolTip from "../shared/ToolTip";
import "./css/relatedvideos.scss";
import LoadingCard from "./LoadingCard";
import VideoCard from "./VideoCard";

class RelatedVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video_data: null,
      related_videos: [],
      videoId: null,
      isSearching: true,
      nextVideo: true,
      isFetchingMoreVideos: false,
      timesFetching: 0,
      is_modal_playlist: false,
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      JSON.stringify(this.props.related_videos) !==
      JSON.stringify(newProps.related_videos)
    ) {
      if (newProps.related_video === undefined) return false;
      this.setState({ videoId: newProps.related_videos[0].id });
      return true;
    }
    if (newProps.query === this.props.query) return false;
    const id = newProps.query;
    // document.getElementsByTagName("video")[0].src = "";
    if (id !== null) this.setState({ timesFetching: 0 });
    return true;
  }

  _getRelatedVideos = async (id, fetchingMore = false) => {
    const { timesFetching } = this.state;
    if (timesFetching === 5 || !fetchingMore) return false;
    this.setState({
      videoId: id,
      isSearching: fetchingMore ? false : true,
      isFetchingMoreVideos: fetchingMore ? true : false,
    });

    const response = await _getVideoSource(id);
    if (!response.data.related_videos) return;
    if (
      this.props.related_videos.length === 0 &&
      response.data.related_videos.length === 0
    )
      return;
    const payload = fetchingMore
      ? [...this.props.related_videos, ...response.data.related_videos]
      : response.data.related_videos;

    this.props.mutateRelatedVideos(payload);

    const related_videos = fetchingMore
      ? [...this.state.related_videos, ...response.data.related_videos]
      : response.data.related_videos;
    const newState = {
      related_videos: fetchingMore
        ? [...this.state.related_videos, ...response.data.related_videos]
        : response.data.related_videos,
      videoId:
        response.data.related_videos.length === 0
          ? related_videos[related_videos.length - 1].id
          : response.data.related_videos[0].id,
      isSearching: false,
      isFetchingMoreVideos: false,
      timesFetching: timesFetching + 1,
    };
    this.setState(newState);
  };

  componentDidMount() {
    const self = this;

    const video = document.getElementsByTagName("video")[0];
    video.onended = () => {
      this._onVideoEnded();
    };

    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const id = self.state.videoId;
        self._getRelatedVideos(id, true);
      }
    };

    if (this.props.history.location.state) {
      const newState = {
        related_videos: this.props.related_videos,
        videoId: this.props.related_videos
          ? this.props.related_videos.length === 0
            ? []
            : this.props.related_videos[0].id
          : [],
        isSearching: false,
        isFetchingMoreVideos: false,
        timesFetching: this.state.timesFetching + 1,
      };
      this.setState(newState);
    } else {
      // if(id !== null) this._getRelatedVideos(id)
    }
  }

  _onCheckboxClick = () => {
    this.props.toggleAutoplay();
  };

  _onVideoEnded = () => {
    const { related_videos } = this.props;
    const next_video_id = related_videos[0].id;
    if (this.props.autoplay) {
      this.props.history.push(`/watch?v=${next_video_id}`);
      return true;
    } else {
      this.props.updateVideoEnded(true);
    }
  };

  updateVideoData = (video_data) => {
    this.setState({ video_data });
  };

  render() {
    const { isFetchingMoreVideos } = this.state;
    let { related_videos, autoplay } = this.props;
    related_videos = related_videos === undefined ? [] : related_videos;

    return (
      <>
        {related_videos.length > 0 && (
          <NextVideoSection
            _onCheckboxClick={this._onCheckboxClick}
            autoplay={autoplay}
          />
        )}
        {related_videos.length === 0 ? (
          <LoadingCard />
        ) : (
          related_videos.map((video, i) => {
            return (
              <VideoCard
                history={this.props.history}
                updateVideoData={this.updateVideoData}
                openPlaylistModal={this.modalPlaylist}
                key={video.id + i}
                video={video}
              />
            );
          })
        )}
        {isFetchingMoreVideos ? (
          <img
            style={{
              width: "100px",
              height: "100px",
              marginTop: "10px",
              marginBottom: "5px",
              marginLeft: "25%",
            }}
            src="https://www.agenti.com.co/web/assets/img/preloader.gif"
            alt="Loading..."
          />
        ) : (
          false
        )}
      </>
    );
  }
}

const NextVideoSection = (props) => {
  const { _onCheckboxClick, autoplay } = props;
  return (
    <div className="next-video">
      <h4
        className={"next-video-title"}
        style={{ marginBottom: "12px", fontSize: "16px", fontWeight: 400 }}
      >
        {locales.next}
      </h4>
      <div className="autoplay-container">
        <span className="autoplay-spantag">{locales.autoplay}</span>
        <ToolTip
          onTop={false}
          toolTipStyle={{
            width: "190px",
            whiteSpace: "pre-line",
            bottom: "-80px",
            left: "-40px",
          }}
          message={
            "When autoplay is enabled, a suggested video will automatically play next."
          }
        >
          <div className={`${autoplay ? "switch switch--active" : "switch"}`}>
            <input
              className="checkbox-next"
              type="checkbox"
              onChange={_onCheckboxClick}
              checked={autoplay}
            />
            <span
              className={`${autoplay ? "round round--active" : "round"}`}
            ></span>
          </div>
        </ToolTip>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    mutateRelatedVideos: (payload) => dispatch(mutateRelatedVideos(payload)),
    toggleAutoplay: () => dispatch(toggleAutoplay()),
    updateVideoEnded: (payload) => dispatch(updateVideoEnded(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    related_videos: state.relatedVideos,
    autoplay: state.autoplay,
    videoEnded: state.videoEnded,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedVideos);
