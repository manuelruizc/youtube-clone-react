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

const TrendingItems = (props) => {
  const {
    updateLoadingState,
    updateCurrentVideoData,
    mutateRelatedVideos,
    updateVideoThumb,
    mini_player_info,
    history,
    video_data,
    videos,
  } = props;
  const GoToVideo = async (video) => {
    await _goToVideo(
      video,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      history
    );
  };

  const PlayOnMiniaturePlayer = async (video) => {
    await _playOnMiniPlayer(
      video,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      updateVideoThumb
    );
  };

  const GoToMiniaturePlayerVideo = async (video) => {
    await _navigateToMiniPlayerVideo(
      video,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      history
    );
  };

  const isMiniPlayerActive = mini_player_info
    ? mini_player_info.thumbnail
    : false;
  return (
    <>
      {videos.length > 0 &&
        videos.map((video, index) => {
          const { uri, current_length, length } = video;
          const pathname = current_length
            ? current_length === length
              ? `/watch?v=${uri}`
              : `/watch?v=${uri}&t=${current_length}s`
            : `/watch?v=${uri}`;
          return (
            <SearchThumbnail
              key={uri}
              onClick={
                isMiniPlayerActive
                  ? uri === video_data.id
                    ? GoToMiniaturePlayerVideo
                    : PlayOnMiniaturePlayer
                  : GoToVideo
              }
              onClickParams={video}
              size={"regular"}
              href={pathname}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Thumbnail
                time={video.time}
                imageURI={video.imageURI}
                current_length={video.current_length}
                length={video.length}
              >
                {video_data && isMiniPlayerActive
                  ? uri === video_data.id && <Overlay />
                  : null}
              </Thumbnail>
              <Metadata trending video={video} />
            </SearchThumbnail>
          );
        })}
    </>
  );
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
    mini_player_info: state.thumbnailVideoActive,
    video_data: state.current_video_data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingItems);
