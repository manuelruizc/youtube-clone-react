import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
    toggleSidenav,
    toggleSidenavHome,
    updatePlaylists,
} from '../../actions/reduxActions';
import {
    Arrow,
    History,
    Library,
    Playlist,
    ThumbUp,
    WatchLater,
} from '../../assets/Icons';
import {
    getDatabasePlaylists,
    getUserSubscriptions,
} from '../../helpers/helpers';
import locales from '../../locales/navbar';
import LoginSection from './LoginSection';
import OverflowSection from './OverflowSection';
import './sidenav.scss';
import SidenavLink from './SidenavLink';
import SidenavLinkSub from './SidenavLinkSub';
import SidenavSectionContainer from './SidenavSectionContainer';
import SidenavSectionTitle from './SidenavSectionTitle';
import SidenavUnactiveItems from './SidenavUnactiveItems';
import Socials from './Socials';
const sliderSidenavPathname = '/watch';

const activeClass = 'sidenav-link sidenav-path-active';
const unactiveClass = 'sidenav-link';

const TokenExists = localStorage.getItem('jwt_token');

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaylistExtended: false,
            subscriptions: [],
        };
    }

    // Toggle hide/show side navigation
    toggleSidenavigation = (pathname) => {
        // If the current pathname is not /watch
        if (pathname !== sliderSidenavPathname) {
            this.props.toggleSidenavHome();
        } else {
            window.scroll({
                top: 0,
                left: 0,
            });
            document.getElementsByTagName('body')[0].style.overflow = 'initial';
            this.props.toggleSidenav();
        }
    };

    // Show more playlists on sidenav
    extendPlaylists = () => {
        this.setState({ isPlaylistExtended: !this.state.isPlaylistExtended });
    };

    componentDidMount() {
        const { user } = this.props;
        if (user != null) this.getPlaylists(user.uid);
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        // Get user subscriptions if users logs in
        if (newProps.user != null) {
            this.getPlaylists(newProps.user.uid);
            this.getUserSubscriptions(newProps.user.uid);
        }
        // If user is entering to /watch pathname from a different pathname
        // hide side navigation
        if (
            newProps.location.pathname === '/watch' &&
            newProps.location.pathname !== this.props.location.pathname
        ) {
            this.props.toggleSidenav(true);
        }
        return true;
    }

    // Get users subscriptions API call
    getUserSubscriptions = async (uid) => {
        const response = await getUserSubscriptions(uid);
        const { subscriptions, error } = response.data;
        if (error) return this.setState({ subscriptions: [] });
        this.setState({ subscriptions });
    };

    // Get users user playlists API call
    getPlaylists = async (uid) => {
        const response = await getDatabasePlaylists(uid);
        const { playlists } = response.data;
        const propsPlaylists = this.props.playlists;
        this.props.updatePlaylists(playlists);
    };

    // Push navigation state to /playlist pathname
    goToPlaylist = (playlistId) => {
        const { user } = this.props;
        if (user === null) return false;
        this.props.history.push(`/playlist?list=${playlistId}`);
    };

    // Get current sidenav (depending on the path and toggle state) className
    getSidenavStatusClass = (sidenavLocation, sidenavHome, sidenav) => {
        if (sidenavLocation !== sliderSidenavPathname && sidenavHome) {
            return 'sidenav-home--active';
        } else if (sidenavLocation !== sliderSidenavPathname && !sidenavHome) {
            return 'sidenav-home--unactive';
        } else if (sidenavLocation === sliderSidenavPathname && sidenav) {
            return 'sidenav--active';
        }
        return 'sidenav--unactive';
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
        let sidenavClassName = 'sidenav-playlists';
        if (isPlaylistExtended)
            sidenavClassName += ' sidenav-playlists-expanded';
        if (!user) sidenavClassName += ' sidenav-playlists-no-user';
        const sidenavLocation = history.location.pathname;
        const sidenavClassStatus = this.getSidenavStatusClass(
            sidenavLocation,
            sidenavHome,
            sidenav
        );
        const sidenavClass = `side-nav ${sidenavClassStatus} ${
            !darkTheme ? 'side-nav--light' : ''
        }`;
        const playOne =
            playlists.length > 0 ? [playlists[0], playlists[1]] : [];
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
                        className={'sidenav-backdrop'}
                        onClick={() =>
                            this.toggleSidenavigation(sidenavLocation)
                        }
                    />
                )}
                <div className={sidenavClass}>
                    <div className="sidenav-header">
                        <span
                            onClick={() =>
                                this.toggleSidenavigation(sidenavLocation)
                            }
                            className="burger"
                        >
                            <span></span>
                        </span>
                        <Link
                            to={{
                                pathname: '/',
                                state: { prevPath: sidenavLocation },
                            }}
                            className="logoyt"
                        ></Link>
                    </div>
                    <OverflowSection>
                        <div className="sidenav-sections">
                            <SidenavLink
                                to="/"
                                pathname={pathname}
                                customIcon="home"
                            />
                            <SidenavLink
                                to="/feed/trending"
                                pathname={pathname}
                                customIcon="trending"
                            />
                            <SidenavLink
                                to="/feed/subscriptions"
                                pathname={pathname}
                                customIcon="subscriptions"
                            />
                        </div>
                        <div className={sidenavClassName}>
                            <Link
                                to={'/feed/library'}
                                className={
                                    pathname === '/feed/library'
                                        ? activeClass
                                        : 'sidenav-link'
                                }
                            >
                                <span>
                                    <Library className="sidenav-icon" />
                                    <span>{locales.sidenav.library}</span>
                                </span>
                            </Link>
                            <Link
                                to={'/feed/history'}
                                className={
                                    pathname === '/feed/history'
                                        ? activeClass
                                        : 'sidenav-link'
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
                                        to={'/playlist?list=LL'}
                                        className={
                                            pathname === '/playlist' &&
                                            search === '?list=LL'
                                                ? activeClass
                                                : 'sidenav-link'
                                        }
                                    >
                                        <span>
                                            <ThumbUp
                                                className="sidenav-icon"
                                                iconStyle={{
                                                    display: 'flex',
                                                    width: '22px',
                                                    height: '22px',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            />
                                            <span>
                                                {locales.sidenav.likedVideos}
                                            </span>
                                        </span>
                                    </Link>
                                </>
                            )}
                            {playOne.length > 0
                                ? playOne.map((playlist) => {
                                      const {
                                          playlist_id,
                                          playlist_name,
                                      } = playlist;
                                      const pathPlaylist = search.substr(6);
                                      return (
                                          <div
                                              onClick={() =>
                                                  this.goToPlaylist(playlist_id)
                                              }
                                              key={playlist_name}
                                              className={
                                                  playlist_id === pathPlaylist
                                                      ? activeClass
                                                      : unactiveClass
                                              }
                                          >
                                              <span>
                                                  {playlist_name !==
                                                  'WatchLater' ? (
                                                      <Playlist className="sidenav-icon" />
                                                  ) : (
                                                      <WatchLater className="sidenav-icon" />
                                                  )}
                                                  <span>
                                                      {playlist.playlist_name ===
                                                      'WatchLater'
                                                          ? locales.sidenav
                                                                .watchLater
                                                          : playlist.playlist_name}
                                                  </span>
                                              </span>
                                          </div>
                                      );
                                  })
                                : null}
                            {playTwo.length > 0
                                ? playTwo.map((playlist, index) => {
                                      const topIndex = !this.state
                                          .isPlaylistExtended
                                          ? 0
                                          : playTwo.length;
                                      const {
                                          playlist_id,
                                          playlist_name,
                                      } = playlist;
                                      const pathPlaylist = search.substr(6);
                                      if (index < topIndex) {
                                          return (
                                              <div
                                                  onClick={() =>
                                                      this.goToPlaylist(
                                                          playlist_id
                                                      )
                                                  }
                                                  key={playlist_name}
                                                  className={
                                                      playlist_id ===
                                                      pathPlaylist
                                                          ? activeClass
                                                          : unactiveClass
                                                  }
                                              >
                                                  <span>
                                                      {playlist_name !==
                                                      'WatchLater' ? (
                                                          <Playlist className="sidenav-icon" />
                                                      ) : (
                                                          <WatchLater className="sidenav-icon" />
                                                      )}
                                                      <span>
                                                          {playlist.playlist_name ===
                                                          'WatchLater'
                                                              ? locales.sidenav
                                                                    .watchLater
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
                                <div
                                    onClick={this.extendPlaylists}
                                    className="sidenav-link"
                                >
                                    <span>
                                        <Arrow
                                            className={
                                                this.state.isPlaylistExtended
                                                    ? 'arrow-icon sidenav-icon rotate-icon'
                                                    : 'arrow-icon sidenav-icon'
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
                        {!TokenExists && <LoginSection />}
                        {this.state.subscriptions.length > 0 && (
                            <SidenavSectionContainer>
                                <SidenavSectionTitle>
                                    {locales.sidenav.subscriptions}
                                </SidenavSectionTitle>
                                {this.state.subscriptions.map((channel) => {
                                    const {
                                        channel_name,
                                        channel_thumbnail,
                                    } = channel;
                                    return (
                                        <SidenavLinkSub
                                            channel_thumbnail={
                                                channel_thumbnail
                                            }
                                            key={channel_name}
                                            channel_name={channel_name}
                                        >
                                            <span>
                                                <img
                                                    alt="Channe thumbnail"
                                                    src={channel_thumbnail}
                                                />
                                                <span>{channel_name}</span>
                                            </span>
                                        </SidenavLinkSub>
                                    );
                                })}
                            </SidenavSectionContainer>
                        )}
                        <Socials />
                    </OverflowSection>
                    <div className="unactive-items-container">
                        <SidenavUnactiveItems history={history} />
                    </div>
                </div>
            </>
        );
    }
}

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
