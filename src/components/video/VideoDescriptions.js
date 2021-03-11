import React from "react";
import locales from "../../locales/video";
import { getURLAndTimestamps } from "./helpers/helpers";

const VideoDescriptions = ({ description, active, toggle }) => {
  return (
    <>
      <div
        className={
          active
            ? "data-content data-content--active-description"
            : "data-content"
        }
      >
        <DescriptionText text={description} />
      </div>
      {description && (
        <a
          className="button-show-description"
          href="/"
          style={{ color: "white" }}
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          {active
            ? locales.uploaderInfo.description.showLess
            : locales.uploaderInfo.description.showMore}
        </a>
      )}
    </>
  );
};

const DescriptionText = ({ children, text }) => {
  return (
    <>
      {text && (
        <span className="desc" style={{ color: "white" }}>
          {getURLAndTimestamps(text).map((g) => g)}
        </span>
      )}
    </>
  );
};

export default VideoDescriptions;
