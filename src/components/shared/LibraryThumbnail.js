import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  mutateRelatedVideos,
  updateCurrentVideoData,
  updateLoadingState,
} from "../../actions/darkTheme";
import { _goToVideo } from "../../helpers/navigation";

const LibraryThumbnail = ({
  video,
  updateLoadingState,
  updateCurrentVideoData,
  mutateRelatedVideos,
  history,
}) => {
  const { video_id, video_title, video_channel, video_duration } = video;

  const goToVideo = (e, video_data) => {
    e.preventDefault();
    video_data["uri"] = video.video_id;
    _goToVideo(
      video_data,
      updateLoadingState,
      updateCurrentVideoData,
      mutateRelatedVideos,
      history
    );
  };

  return (
    <a
      onClick={(e) => goToVideo(e, video)}
      key={video_id}
      title={video_title}
      className="library-thumbnail"
      href={"/watch?v=" + video.video_id}
    >
      <div className="thumb-cnt">
        <img src={video.thumbnail} alt={""} />
        <span>{video_duration}</span>
        {video.current_length !== undefined && (
          <div className="video_current_progress">
            <div
              style={{
                width: (100 / video.length) * video.current_length + "%",
              }}
            />
          </div>
        )}
      </div>
      <div className={"thumb-infocontainer"}>
        <div className={"thumb-title-container"}>
          <span className="tmb-title">{video.video_title}</span>
          <span className="tmb-channel">
            {video_channel} <span>• {video.views}</span>
          </span>
          <span className="tmb-views">{video.views}</span>
        </div>
      </div>
    </a>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
    mutateRelatedVideos: (payload) => dispatch(mutateRelatedVideos(payload)),
    updateCurrentVideoData: (payload) =>
      dispatch(updateCurrentVideoData(payload)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(LibraryThumbnail));
