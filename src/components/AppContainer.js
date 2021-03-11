import React from "react";
import { connect } from "react-redux";
import "../App.scss";
import RelatedVideos from "./relatedvideos/RelatedVideos";
import Video from "./video/Video";
const AppContainer = (props) => {
  const { darkTheme, theater_mode } = props;
  let rootClass = darkTheme ? "root" : "root root--light";
  rootClass = theater_mode ? rootClass + " root-theater" : rootClass;
  let rightContainer = "right-container";
  rightContainer = theater_mode
    ? rightContainer + " right-container-theater"
    : rightContainer;

  return (
    <React.Fragment>
      <div className={rootClass}>
        <div className="left-container">
          <Video
            history={props.history}
            query={props.location.search.substr(3, 11)}
          />
        </div>
        <div className={rightContainer}>
          <RelatedVideos
            history={props.history}
            query={props.location.search.substr(3, 11)}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    darkTheme: state.darkTheme,
    theater_mode: state.theater_mode,
  };
};

export default connect(mapStateToProps)(AppContainer);
