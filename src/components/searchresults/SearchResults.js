import React, { Component } from 'react';
import './search.scss';
import VideoResults from './VideoResults';
import { connect } from 'react-redux';
import { updateLoadingState, updateSearchResults } from '../../actions/darkTheme';
import { searchVideos, LOADING_STATES } from '../../helpers/helpers'

const { LOADING, LOADING_COMPLETE } = LOADING_STATES;

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
         }
    }

    /**
    *
    * Requests a search of 20 videos.
    *
    * @param {string} search_query
    *
    */
    // _searchVideos = async (search_query) => {
    //     const { updateLoadingState } = this.props;
    //     const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
    //     updateLoadingState(LOADING);
    //     const response = await searchVideos(search_query);
    //     this.setState({
    //         search_results: response.data
    //     }, () => window.scrollTo(0, 0));
    //     updateLoadingState(LOADING_COMPLETE);
    // }

    async componentDidMount() {
        const { updateLoadingState, updateSearchResults, search_results } = this.props;
        if(search_results.length > 0) return;
        updateLoadingState(LOADING)
        document.body.style = 'overflow:auto';
        const search_query = this.props.location.search.substring(14);
        const title_search_query = search_query.split('+').join(' ');
        document.title = title_search_query + " - CloneTube";
        const response = await searchVideos(search_query);
        updateSearchResults(response.data);
        updateLoadingState(LOADING_COMPLETE)
    }

    // componentWillReceiveProps(newProps) {
    //     if(newProps.location.search === this.props.location.search) return false;
    //     const search_query = newProps.location.search.substring(14);
    //     document.body.style = 'overflow:auto';
    //     const title_search_query = search_query.split('+').join(' ');
    //     document.title = title_search_query + " - YouTube";
    //     this._searchVideos(search_query);
    // }

    render() {
        const { darkTheme, history } = this.props;
        const searchcontainerClass = darkTheme ? "search-container" : "search-container search-container--light";
        return (
            <div className={searchcontainerClass}>
                <div className="search_results">
                    {this.props.search_results.length > 0 ?
                    this.props.search_results.map((video, i) => {
                        const { uri, current_length, length } = video;
                        const pathname =  current_length ? current_length === length ? `/watch?v=${uri}` : `/watch?v=${uri}&t=${current_length}s` : `/watch?v=${uri}`;
                        return (
                            <VideoResults
                                history={history}
                                key={i}
                                video={video}
                                pathname={pathname}
                            />
                        )
                    }) : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        darkTheme: state.darkTheme,
        search_results: state.search_results,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSearchResults: (payload) => dispatch(updateSearchResults(payload)),
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);