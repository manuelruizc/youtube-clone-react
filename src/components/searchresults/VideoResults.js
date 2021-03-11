import React from "react";
import { connect } from "react-redux";
import {
  mutateRelatedVideos,
  updateCurrentVideoData,
  updateLoadingState,
  updateVideoThumb,
} from "../../actions/darkTheme";
import {
  _goToVideo,
  _navigateToMiniPlayerVideo,
  _playOnMiniPlayer,
} from "../../helpers/navigation";
import Overlay from "../shared/Overlay";
import SearchThumbnail from "../shared/SearchThumbnail";
import Metadata from "../shared/searchthumbnail/Metadata";
import Thumbnail from "../shared/searchthumbnail/Thumbnail";

const VideoResults = (props) => {
  const {
    updateLoadingState,
    updateCurrentVideoData,
    mutateRelatedVideos,
    updateVideoThumb,
  } = props;

  const PlayOnMiniPlayerVideo = async (video) => {
    await _playOnMiniPlayer(
      video,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      updateVideoThumb
    );
  };

  const GoToVideo = async (video) => {
    await _goToVideo(
      video,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      props.history
    );
  };

  const GoToMiniplayerVideo = async (video) => {
    await _navigateToMiniPlayerVideo(
      video,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      props.history
    );
  };

  if (!props.thumbnail || (!props.thumbnail.thumbnail && props.video_data)) {
    return (
      <SearchThumbnail
        onClick={GoToVideo}
        onClickParams={props.video}
        href={props.pathname}
        size={"big"}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Thumbnail
          length={props.video.length}
          current_length={props.video.current_length}
          time={props.video.time}
          imageURI={props.video.imageURI}
        />
        <Metadata video={props.video} />
      </SearchThumbnail>
    );
  } else {
    const id = props.video_data ? props.video_data.id : "";

    return (
      <SearchThumbnail
        onClick={
          id === props.video.uri ? GoToMiniplayerVideo : PlayOnMiniPlayerVideo
        }
        onClickParams={props.video}
        size={"big"}
        href={props.pathname}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Thumbnail
          time={props.video.time}
          imageURI={props.video.imageURI}
          current_length={props.video.current_length}
          length={props.video.length}
        >
          {id === props.video.uri && <Overlay />}
        </Thumbnail>
        <Metadata video={props.video} />
      </SearchThumbnail>
    );
  }
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

const mapStateToProps = (state) => {
  return {
    thumbnail: state.thumbnailVideoActive,
    video_data: state.current_video_data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoResults);
