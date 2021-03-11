import React, { Component } from "react";
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
import HomeVideoThumbnail from "../shared/HomeVideoThumbnail";
import Overlay from "../shared/Overlay";

class Section extends Component {
  render() {
    let {
      section,
      updateCurrentVideoData,
      updateLoadingState,
      mutateRelatedVideos,
      updateVideoThumb,
      mini_player_info,
      video_data,
      history,
      key,
    } = this.props;
    let data = section;
    const title = data[0];
    return (
      <HomepageSection title={title}>
        <SectionItems
          key={key}
          data={data}
          updateCurrentVideoData={updateCurrentVideoData}
          updateLoadingState={updateLoadingState}
          mutateRelatedVideos={mutateRelatedVideos}
          updateVideoThumb={updateVideoThumb}
          miniPlayerInfo={mini_player_info}
          video_data={video_data}
          history={history}
        />
      </HomepageSection>
    );
  }
}

export const HomepageSection = (props) => {
  let title = props.title ? props.title : "";
  return (
    <div className="section-wrapper">
      {props.title && <h2>{title}</h2>}
      <div className="big-section">{props.children}</div>
    </div>
  );
};

const SectionItems = (props) => {
  const {
    data,
    updateLoadingState,
    updateCurrentVideoData,
    mutateRelatedVideos,
    updateVideoThumb,
    miniPlayerInfo,
    history,
    video_data,
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

  const isMiniPlayerActive = miniPlayerInfo ? miniPlayerInfo.thumbnail : false;

  return (
    <>
      {data.map((video, index) => {
        const { uri, current_length, length } = video;
        const pathname = current_length
          ? current_length === length
            ? `/watch?v=${uri}`
            : `/watch?v=${uri}&t=${current_length}s`
          : `/watch?v=${uri}`;
        if (index > 0) {
          return (
            <HomeVideoThumbnail
              onClick={
                isMiniPlayerActive
                  ? uri === video_data.id
                    ? GoToMiniaturePlayerVideo
                    : PlayOnMiniaturePlayer
                  : GoToVideo
              }
              onClickParams={video}
              video={video}
              pathname={pathname}
              index={index}
              key={uri}
            >
              <Thumbnail video={video}>
                {video_data && isMiniPlayerActive
                  ? uri === video_data.id && <Overlay />
                  : null}
              </Thumbnail>
            </HomeVideoThumbnail>
          );
        }
        return null;
      })}
    </>
  );
};

const Thumbnail = (props) => {
  const { video } = props;
  return (
    <div className="thumb-cnt">
      <img src={video.thumbnail} alt={""} />
      <span>{video.duration}</span>
      {video.current_length !== undefined && (
        <div className="video_current_progress">
          <div
            style={{ width: (100 / video.length) * video.current_length + "%" }}
          />
        </div>
      )}
      {props.children}
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Section);
