import React from "react";
import { convertMinsSecs } from "../../helpers/helpers";

const VideoThumbnail = ({ info }) => {
  const { thumbnails, current_length, length_seconds } = info;
  const thumbnail = thumbnails[thumbnails.length - 1].url;
  return (
    <div className="thumbnail">
      <img
        alt={info}
        className="thumbnail--img"
        src={thumbnail}
        title={info.title}
      />
      <span className="thumbnail--time">
        {convertMinsSecs(length_seconds * 1000, length_seconds)}
      </span>
      {current_length !== undefined && (
        <div className="video_current_progress">
          <div
            style={{ width: (100 / length_seconds) * current_length + "%" }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoThumbnail;
