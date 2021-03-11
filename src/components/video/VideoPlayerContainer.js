import React from "react";

const VideoPlayerContainer = ({
  children,
  videoContainer,
  className,
  onMouseOut,
  onMouseMove,
  id,
}) => {
  return (
    <div
      id={id}
      ref={videoContainer}
      className={className}
      onMouseOut={onMouseOut}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  );
};

export default VideoPlayerContainer;
