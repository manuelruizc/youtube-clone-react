import axios from "axios";
import firebase from "firebase/app";
import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { updateAuthUserData } from "./actions/darkTheme";
import AppContainer from "./components/AppContainer";
import Home from "./components/home/Home";
import Library from "./components/library/Library";
import LoadingBar from "./components/LoadingBar";
import Navbar from "./components/navbar/Navbar";
import Sidenav from "./components/navbar/Sidenav";
import History from "./components/playlists/History";
import PlaylistHome from "./components/playlists/PlaylistHome";
import "./components/relatedvideos/css/relatedvideos.css";
import SearchResults from "./components/searchresults/SearchResults";
import Subscriptions from "./components/subscriptions/Subscriptions";
import Toast from "./components/toast/Toast";
import Trending from "./components/trending/Trending";
import "./components/video/css/videowrapper.css";
import MiniatureVideo from "./components/videothumbnail/MiniatureVideo";
import VisitorsModal from "./components/VisitorsModal";
import { credentials } from "./credentials/credentials";
import { LOADING_STATES } from "./helpers/helpers";

firebase.initializeApp(credentials);

const NavRoute = () => (
  <Route render={({ history }) => <Navbar history={history} />} />
);

const SidenavRoute = () => (
  <Route render={({ history }) => <Sidenav history={history} />} />
);

class App extends Component {
  componentDidMount() {
    const { updateUserData } = this.props;
    firebase.auth().onAuthStateChanged((user) => {
      if (user === null) {
        localStorage.clear();
      } else {
        const { photoURL, uid, displayName, email } = user;
        const token = localStorage.getItem("jwt_token");
        const options = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};
        axios
          .post(
            `database/login`,
            { uid, photoURL, email, displayName },
            options
          )
          .then(function (response) {
            if (response.data.token) {
              localStorage.setItem("jwt_token", response.data.token);
              if (!token) window.location.reload();
            }
            let user_data = user;
            user_data.tokenRedeemed = response.data.user_info.token_redeemed;
            updateUserData(user_data);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }

  render() {
    const { thumbnail, LOADING_STATE, visitor_modal_active } = this.props;
    const { NOT_LOADING } = LOADING_STATES;
    const thumbInfo = thumbnail;

    return (
      <React.Fragment>
        <Router>
          {LOADING_STATE !== NOT_LOADING && <LoadingBar />}
          <NavRoute />
          <SidenavRoute />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/watch" component={AppContainer} />
            <Route path="/results" component={SearchResults} />
            <Route path="/playlist" component={PlaylistHome} />
            <Route path="/feed/trending" component={Trending} />
            <Route path="/feed/history" component={History} />
            <Route path="/feed/library" component={Library} />
            <Route path="/feed/channels" component={Subscriptions} />
            <Route component={NotFound} />
          </Switch>
          {this.props.current_video_data && (
            <MiniatureVideo
              thumb={this.props.thumbnail}
              videoURL={!thumbInfo ? null : thumbInfo.videoURL}
              currentTime={!thumbInfo ? null : thumbInfo.currentTime}
              currentVolume={!thumbInfo ? null : thumbInfo.currentVolume}
              isThumbnailActive={!thumbInfo ? null : thumbInfo.thumbnail}
              video_data={this.props.current_video_data}
            />
          )}
          {visitor_modal_active && <VisitorsModal />}
          <Toast />
        </Router>
      </React.Fragment>
    );
  }
}

const NotFound = ({ history }) => {
  useEffect(() => {
    history.push("/");
  }, []);
  return <></>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (payload) => dispatch(updateAuthUserData(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    thumbnail: state.thumbnailVideoActive,
    LOADING_STATE: state.loading_state,
    current_video_data: state.current_video_data,
    visitor_modal_active: state.visitor_modal_active,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
