import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  toggleSidenav,
  toggleSidenavHome,
  updatePlaylists,
} from "../../actions/darkTheme";
import {
  Arrow,
  History,
  Home,
  Library,
  Playlist,
  Subscriptions,
  ThumbUp,
  Trending,
  WatchLater,
} from "../../assets/Icons";
import {
  getDatabasePlaylists,
  getUserSubscriptions,
  login,
} from "../../helpers/helpers";
import locales from "../../locales/navbar";
import domains from "../../locales/socials";
import "./sidenav.scss";
const sliderSidenavPathname = "/watch";

const activeClass = "sidenav-link sidenav-path-active";
const unactiveClass = "sidenav-link";

const TokenExists = localStorage.getItem("jwt_token");

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaylistExtended: false,
      subscriptions: [],
    };
  }

  toggleSidenavigation = (pathname) => {
    if (pathname !== sliderSidenavPathname) {
      this.props.toggleSidenavHome();
    } else {
      window.scroll({
        top: 0,
        left: 0,
      });
      document.getElementsByTagName("body")[0].style.overflow = "initial";
      this.props.toggleSidenav();
    }
  };

  extendPlaylists = () => {
    this.setState({ isPlaylistExtended: !this.state.isPlaylistExtended });
  };

  componentDidMount() {
    const { user } = this.props;
    if (user != null) this.getPlaylists(user.uid);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.user != null) {
      this.getPlaylists(newProps.user.uid);
      this.getUserSubscriptions(newProps.user.uid);
    }
    if (
      newProps.location.pathname === "/watch" &&
      newProps.location.pathname !== this.props.location.pathname
    ) {
      this.props.toggleSidenav(true);
    }
    return true;
  }

  getUserSubscriptions = async (uid) => {
    const response = await getUserSubscriptions(uid);
    const { subscriptions, error } = response.data;
    if (error) return this.setState({ subscriptions: [] });
    this.setState({ subscriptions });
  };

  getPlaylists = async (uid) => {
    const response = await getDatabasePlaylists(uid);
    const { playlists } = response.data;
    const propsPlaylists = this.props.playlists;
    if (
      JSON.stringify(playlists) === JSON.stringify(propsPlaylists) &&
      propsPlaylists.length > 0
    )
      return;
    else this.props.updatePlaylists(playlists);
  };

  goToPlaylist = (playlistId) => {
    const { user } = this.props;
    if (user === null) return false;
    this.props.history.push(`/playlist?list=${playlistId}`);
  };

  getSidenavStatusClass = (sidenavLocation, sidenavHome, sidenav) => {
    if (sidenavLocation !== sliderSidenavPathname && sidenavHome) {
      return "sidenav-home--active";
    } else if (sidenavLocation !== sliderSidenavPathname && !sidenavHome) {
      return "sidenav-home--unactive";
    } else if (sidenavLocation === sliderSidenavPathname && sidenav) {
      return "sidenav--active";
    }
    return "sidenav--unactive";
  };

  render() {
    const {
      sidenav,
      sidenavHome,
      darkTheme,
      history,
      playlists,
      user,
    } = this.props;
    const { isPlaylistExtended } = this.state;
    let sidenavClassName = "sidenav-playlists";
    if (isPlaylistExtended) sidenavClassName += " sidenav-playlists-expanded";
    if (!user) sidenavClassName += " sidenav-playlists-no-user";
    const sidenavLocation = history.location.pathname;
    const sidenavClassStatus = this.getSidenavStatusClass(
      sidenavLocation,
      sidenavHome,
      sidenav
    );
    const sidenavClass = `side-nav ${sidenavClassStatus} ${
      !darkTheme ? "side-nav--light" : ""
    }`;
    const playOne = playlists.length > 0 ? [playlists[0], playlists[1]] : [];
    let playfor = playlists;
    let playTwo = playfor.filter((p, i) => i > 1);
    const { pathname, search } = history.location;
    const showMoreString = `${
      playlists !== undefined
        ? playlists.length - 2 <= 0
          ? locales.titles.showMore
          : locales.titles.showMore
        : locales.titles.showLess
    }`;
    return (
      <>
        {sidenav && sidenavLocation === sliderSidenavPathname && (
          <div
            className={"sidenav-backdrop"}
            onClick={() => this.toggleSidenavigation(sidenavLocation)}
          />
        )}
        <div className={sidenavClass}>
          <div className="sidenav-header">
            <span
              onClick={() => this.toggleSidenavigation(sidenavLocation)}
              className="burger"
            >
              <span></span>
            </span>
            <Link
              to={{ pathname: "/", state: { prevPath: sidenavLocation } }}
              className="logoyt"
            ></Link>
          </div>
          <OverflowSection>
            <div className="sidenav-sections">
              <Link
                to="/"
                className={pathname === "/" ? activeClass : "sidenav-link"}
              >
                <span>
                  <Home className="sidenav-icon" />
                  <span>{locales.sidenav.home}</span>
                </span>
              </Link>
              <Link
                to="/feed/trending"
                className={
                  pathname === "/feed/trending" ? activeClass : "sidenav-link"
                }
              >
                <span>
                  <Trending className="sidenav-icon" />
                  <span>{locales.sidenav.trending}</span>
                </span>
              </Link>
              <Link
                to="/feed/channels"
                className={
                  pathname === "/feed/channels" ? activeClass : "sidenav-link"
                }
              >
                <span>
                  <Subscriptions className="sidenav-icon" />
                  <span>{locales.sidenav.subscriptions}</span>
                </span>
              </Link>
            </div>
            <div className={sidenavClassName}>
              <Link
                to={"/feed/library"}
                className={
                  pathname === "/feed/library" ? activeClass : "sidenav-link"
                }
              >
                <span>
                  <Library className="sidenav-icon" />
                  <span>{locales.sidenav.library}</span>
                </span>
              </Link>
              <Link
                to={"/feed/history"}
                className={
                  pathname === "/feed/history" ? activeClass : "sidenav-link"
                }
              >
                <span>
                  <History className="sidenav-icon" />
                  <span>{locales.sidenav.history}</span>
                </span>
              </Link>
              {this.props.user && (
                <>
                  <Link
                    to={"/playlist?list=LL"}
                    className={
                      pathname === "/playlist" && search === "?list=LL"
                        ? activeClass
                        : "sidenav-link"
                    }
                  >
                    <span>
                      <ThumbUp
                        className="sidenav-icon"
                        iconStyle={{
                          display: "flex",
                          width: "22px",
                          height: "22px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                      <span>{locales.sidenav.likedVideos}</span>
                    </span>
                  </Link>
                </>
              )}
              {playOne.length > 0
                ? playOne.map((playlist) => {
                    const { playlist_id, playlist_name } = playlist;
                    const pathPlaylist = search.substr(6);
                    return (
                      <div
                        onClick={() => this.goToPlaylist(playlist_id)}
                        key={playlist_name}
                        className={
                          playlist_id === pathPlaylist
                            ? activeClass
                            : unactiveClass
                        }
                      >
                        <span>
                          {playlist_name !== "WatchLater" ? (
                            <Playlist className="sidenav-icon" />
                          ) : (
                            <WatchLater className="sidenav-icon" />
                          )}
                          <span>
                            {playlist.playlist_name === "WatchLater"
                              ? locales.sidenav.watchLater
                              : playlist.playlist_name}
                          </span>
                        </span>
                      </div>
                    );
                  })
                : null}
              {playTwo.length > 0
                ? playTwo.map((playlist, index) => {
                    const topIndex = !this.state.isPlaylistExtended
                      ? 0
                      : playTwo.length;
                    const { playlist_id, playlist_name } = playlist;
                    const pathPlaylist = search.substr(6);
                    if (index < topIndex) {
                      return (
                        <div
                          onClick={() => this.goToPlaylist(playlist_id)}
                          key={playlist_name}
                          className={
                            playlist_id === pathPlaylist
                              ? activeClass
                              : unactiveClass
                          }
                        >
                          <span>
                            {playlist_name !== "WatchLater" ? (
                              <Playlist className="sidenav-icon" />
                            ) : (
                              <WatchLater className="sidenav-icon" />
                            )}
                            <span>
                              {playlist.playlist_name === "WatchLater"
                                ? locales.sidenav.watchLater
                                : playlist.playlist_name}
                            </span>
                          </span>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })
                : null}
              {this.props.user && (
                <div onClick={this.extendPlaylists} className="sidenav-link">
                  <span>
                    <Arrow
                      className={
                        this.state.isPlaylistExtended
                          ? "arrow-icon sidenav-icon rotate-icon"
                          : "arrow-icon sidenav-icon"
                      }
                    />
                    <span>
                      {this.state.isPlaylistExtended
                        ? locales.titles.showLess
                        : showMoreString}
                    </span>
                  </span>
                </div>
              )}
            </div>
            {!TokenExists && (
              <div className="sidenav-subs login">
                <span className="login-message">
                  {locales.nav.signInMessage}
                </span>
                <button
                  style={{ height: "15%" }}
                  onClick={login}
                  className={"login-btn"}
                >
                  <div>
                    <i className={"fa fa-user"}></i>
                  </div>
                  <span>{locales.titles.signIn}</span>
                </button>
              </div>
            )}
            {this.state.subscriptions.length > 0 && (
              <div className="sidenav-subs">
                <span className="subscriptions-header">
                  {locales.titles.subscriptions}
                </span>
                {this.state.subscriptions.map((channel, index) => {
                  const { channel_name, channel_thumbnail } = channel;
                  return (
                    <div
                      key={channel_name}
                      className="sidenav-link subscription-link"
                    >
                      <span>
                        <img alt="Channe thumbnail" src={channel_thumbnail} />
                        <span>{channel_name}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="sidenav-subs">
              <span className="subscriptions-header">
                {locales.sidenav.portfolio}
              </span>
              <a
                rel="noopener noreferrer"
                href={domains.linkedin}
                target="_blank"
                className="sidenav-link"
              >
                <span>
                  <i className="sidenav-link-icon-fa fa fa-linkedin" />
                  <span>LinkedIn</span>
                </span>
              </a>
              <a
                rel="noopener noreferrer"
                href={domains.website}
                target="_blank"
                className="sidenav-link"
              >
                <span>
                  <i className="sidenav-link-icon-fa fa fa-file" />
                  <span>Portfolio</span>
                </span>
              </a>
              <a
                rel="noopener noreferrer"
                href={domains.youtube}
                target="_blank"
                className="sidenav-link"
              >
                <span>
                  <i className="sidenav-link-icon-fa fa fa-youtube" />
                  <span>YouTube</span>
                </span>
              </a>
              <a
                href={domains.github}
                target="_blank"
                className="sidenav-link"
                rel="noopener noreferrer"
              >
                <span>
                  <i className="sidenav-link-icon-fa fa fa-github" />
                  <span>GitHub</span>
                </span>
              </a>
            </div>
          </OverflowSection>
          <div className="unactive-items-container">
            <SideNavUnactiveItems history={history} />
          </div>
        </div>
      </>
    );
  }
}

const OverflowSection = ({ children }) => {
  return (
    <div className="overflow-section-container">
      <div className="overflow-section">{children}</div>
    </div>
  );
};

const SideNavUnactiveItems = ({ history }) => {
  const { pathname } = history.location;
  return (
    <>
      <div
        className={`sidenavunactive-item-container${
          pathname === "/" ? " sidenav-path-active" : ""
        }`}
      >
        <Home className="sidenav-icon" />
        <span>{locales.sidenav.home}</span>
      </div>
      <div
        className={`sidenavunactive-item-container${
          pathname === "/feed/trending" ? " sidenav-path-active" : ""
        }`}
      >
        <Trending className="sidenav-icon" />
        <span>{locales.sidenav.trending}</span>
      </div>
      <div
        className={`sidenavunactive-item-container${
          pathname === "/feed/subscriptions" ? " sidenav-path-active" : ""
        }`}
      >
        <Subscriptions className="sidenav-icon" />
        <span>{locales.sidenav.subscriptions}</span>
      </div>
      <div
        className={`sidenavunactive-item-container${
          pathname === "/feed/library" ? " sidenav-path-active" : ""
        }`}
      >
        <Library className="sidenav-icon" />
        <span>{locales.sidenav.library}</span>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidenav: (payload) => dispatch(toggleSidenav(payload)),
    toggleSidenavHome: () => dispatch(toggleSidenavHome()),
    updatePlaylists: (payload) => dispatch(updatePlaylists(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    sidenav: state.sidenav,
    sidenavHome: state.sidenavHome,
    user: state.user,
    darkTheme: state.darkTheme,
    playlists: state.playlists,
    language: state.language,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidenav)
);
