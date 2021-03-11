import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addToastNotification,
  updateHomeSearch,
  updateLoadingState,
} from "../../actions/darkTheme";
import { LOADING_STATES, _getHomePageData } from "../../helpers/helpers";
import "./home.scss";
import Section from "./Section";
import Skeletons from "./Skeletons";

class Home extends Component {
  async componentDidMount() {
    document.body.style = "overflow:visible";
    document.title = "Clonetube";
    window.scrollTo({ top: 0 });

    const { history, homeSearchVideos, updateLoadingState } = this.props;
    const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
    updateLoadingState(LOADING);

    if (homeSearchVideos.length > 0 && history) {
      const { location } = history;
      if (!location.state) {
        updateLoadingState(LOADING_COMPLETE);
        return true;
      } else if (location.state.prevPath !== "/") {
        updateLoadingState(LOADING_COMPLETE);
        return true;
      }
    }

    this.getHomePageData();
  }

  getHomePageData = async () => {
    const {
      updateLoadingState,
      updateHomeSearchData,
      addToastNotification,
    } = this.props;
    const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
    updateLoadingState(LOADING);
    const response = await _getHomePageData();
    const { response_info, data } = response;
    if (response.errorOnServer) {
      addToastNotification({
        toast_message: `There's an error communication to the server`,
        id: String(new Date()) + "added_to_wl",
      });
      return;
    }
    if (response_info.status === 200) {
      updateHomeSearchData(data);
      updateLoadingState(LOADING_COMPLETE);
    } else {
      addToastNotification({
        toast_message: `There's an error communication to the server`,
        id: String(new Date()) + "added_to_wl",
      });
    }
  };

  render() {
    const { sidenavHome, homeSearchVideos, darkTheme } = this.props;
    const theme = darkTheme ? "search-container" : "search-container--light";

    const containerClass = sidenavHome
      ? "home-results"
      : "home-results home-results--big";
    return (
      <HomeContainer theme={theme}>
        {/* <Sidenav snLocation={"Home"} /> */}
        <HomeContent
          containerClass={containerClass}
          homeSearchVideos={homeSearchVideos}
          history={this.props.history}
        />
      </HomeContainer>
    );
  }
}

const HomeContent = (props) => {
  const { homeSearchVideos, containerClass, history } = props;
  return (
    <div className={containerClass}>
      {homeSearchVideos.length > 0 ? (
        homeSearchVideos.map((video, index) => {
          return <Section key={video[0]} section={video} history={history} />;
        })
      ) : (
        <Skeletons />
      )}
    </div>
  );
};
const HomeContainer = (props) => {
  const { theme } = props;
  return <div className={theme}>{props.children}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateHomeSearchData: (payload) => dispatch(updateHomeSearch(payload)),
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
    addToastNotification: (payload) => dispatch(addToastNotification(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkTheme: state.darkTheme,
    sidenavHome: state.sidenavHome,
    homeSearchVideos: state.homeSearchVideos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
