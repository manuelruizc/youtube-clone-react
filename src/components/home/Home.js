import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    addToastNotification,
    updateHomeSearch,
    updateLoadingState,
} from '../../actions/reduxActions';
import { LOADING_STATES, _getHomePageData } from '../../helpers/helpers';
import './home.scss';
import Section from './Section';
import Skeletons from './Skeletons';

class Home extends Component {
    async componentDidMount() {
        // Making sure the page is scrollable, at the top and the page title is the correct
        document.body.style = 'overflow:visible';
        document.title = 'Clonetube';
        window.scrollTo({ top: 0 });

        const { history, homeSearchVideos, updateLoadingState } = this.props;
        const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
        updateLoadingState(LOADING);

        // If there's already home page videos in the redux state
        // dont push the router history and complete the loading bar state
        if (homeSearchVideos.length > 0 && history) {
            updateLoadingState(LOADING_COMPLETE);
            return true;
        }
        // If there's no homepage videos, make an api call to get them
        this.getHomePageData();
    }

    // Getting the home page videos JSON data to populate the component
    getHomePageData = async () => {
        const {
            updateLoadingState,
            updateHomeSearchData,
            addToastNotification,
        } = this.props;
        const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
        // Starting loading bar state
        updateLoadingState(LOADING);
        // Get home page data
        const response = await _getHomePageData();
        const { response_info, data } = response;
        // Handle error with toast as UI
        if (response.errorOnServer) {
            addToastNotification({
                toast_message: `There's an error communication to the server`,
                id: String(new Date()) + 'added_to_wl',
            });
            return;
        }
        // If response is OK, update the redux store and complete the loading bar process
        // else handle the error with toast as UI
        if (response_info.status === 200) {
            updateHomeSearchData(data);
            updateLoadingState(LOADING_COMPLETE);
        } else {
            addToastNotification({
                toast_message: `There's an error communication to the server`,
                id: String(new Date()) + 'added_to_wl',
            });
        }
    };

    render() {
        const { sidenavHome, homeSearchVideos, darkTheme } = this.props;
        // Dark or light theme class
        const theme = darkTheme
            ? 'search-container'
            : 'search-container--light';

        // containerClass depending if the sidenav is toggled
        const containerClass = sidenavHome
            ? 'home-results'
            : 'home-results home-results--big';
        return (
            <HomeContainer theme={theme}>
                <HomeContent
                    containerClass={containerClass}
                    homeSearchVideos={homeSearchVideos}
                    history={this.props.history}
                />
            </HomeContainer>
        );
    }
}

// Home page section and video thumbnails rendering
const HomeContent = (props) => {
    const { homeSearchVideos, containerClass, history } = props;
    // Home page video thumbnails rendering
    // if the homeSearchVideos(redux) array length is greather than one, render the thumbnails
    // else render skeletons for user (data is loading)
    return (
        <div className={containerClass}>
            {homeSearchVideos.length > 0 ? (
                homeSearchVideos.map((video, index) => {
                    return (
                        <Section
                            key={video[0]}
                            section={video}
                            history={history}
                        />
                    );
                })
            ) : (
                <Skeletons />
            )}
        </div>
    );
};

// Container for the home page data
const HomeContainer = (props) => {
    const { theme } = props;
    return <div className={theme}>{props.children}</div>;
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateHomeSearchData: (payload) => dispatch(updateHomeSearch(payload)),
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
        addToastNotification: (payload) =>
            dispatch(addToastNotification(payload)),
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
