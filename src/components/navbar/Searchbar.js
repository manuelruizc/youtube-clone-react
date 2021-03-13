import axios from 'axios';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    updateLoadingState,
    updateSearchResults,
} from '../../actions/reduxActions';
import {
    insertSearchTerm,
    LOADING_STATES,
    searchVideos,
} from '../../helpers/helpers';
import locales from '../../locales/navbar';
import ToolTip from '../shared/ToolTip';
import SearchSuggestionContainer from './SearchSuggestionContainer';

const { LOADING, LOADING_COMPLETE } = LOADING_STATES;

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            constantSearchQuery: '',
            suggestions: [],
            input_focused: false,
            input: createRef(),
            currentSuggestionIndex: -1,
        };
        this.component = createRef();
    }

    // Make API request to search videos
    _searchVideos = async (search_query) => {
        const { updateLoadingState } = this.props;
        const { LOADING } = LOADING_STATES;
        updateLoadingState(LOADING);
        const response = await searchVideos(search_query);
        const { data } = response;
        return data;
    };

    // Searching an autocomplete suggestion
    _searchSuggestion = (e, searchQuery) => {
        e.preventDefault();
        this.searchVideoItems(searchQuery);
    };

    _onSubmit = (e) => {
        e.preventDefault();
        this.searchVideoItems();
    };

    // Search videos
    searchVideoItems = async (searchSuggested = null) => {
        // if the term is from the autocomplete box use searchSuggested
        // else search the input text value
        let searchQuery = searchSuggested
            ? searchSuggested
            : this.state.searchQuery;
        this.setState({ input_focused: false, searchQuery });
        const { user, updateLoadingState, updateSearchResults } = this.props;
        updateLoadingState(LOADING);
        let uid;
        const constantSearchQuery = searchQuery;
        // Change document title to the search term
        document.title = constantSearchQuery + ' - CloneTube';
        // Formatting the search term to how YouTube format the search term
        // in the url "searching for this" => "searching+for+this";
        searchQuery = searchQuery
            .split(' ')
            .filter((f) => f !== ' ')
            .join('+');
        // if search term is not empty
        if (searchQuery !== '') {
            const data = await this._searchVideos(searchQuery);
            if (user) {
                uid = user.uid;
                insertSearchTerm(constantSearchQuery, uid);
            }
            updateSearchResults(data);
            window.scrollTo(0, 0);
            updateLoadingState(LOADING_COMPLETE);
            this.component.current.classList.remove('mobile-search--active');
            this.props.history.push(`/results?search_query=${searchQuery}`);
        }
    };

    _onChange = async (e) => {
        e.preventDefault();
        const searchQuery = e.target.value;
        const suggestionsDOM = document.getElementsByClassName(
            'suggestion-item'
        );
        const suggestionsLength = suggestionsDOM.length;
        for (let i = 0; i < suggestionsLength; i++) {
            const suggestion = suggestionsDOM[i];
            suggestion.classList.remove('suggestion-item-highlighted');
        }
        this.setState({
            searchQuery,
            constantSearchQuery: searchQuery,
            input_focused: !this.state.input_focused
                ? true
                : this.state.input_focused,
            currentSuggestionIndex: -1,
        });
        if (searchQuery.length === 0) return;
        let suggestions = [];
        // API call for autocomplete suggestions
        axios
            .get(`search_suggestion/${searchQuery}`)
            .then((response) => {
                // feed search suggestions autocomplete
                const response_suggestions = response.data.search[1];
                suggestions = [...response_suggestions];
                this.setState({ suggestions });
            })
            .catch((e) => console.error(e));
    };

    _onFocus = (e) => {
        e.preventDefault();
        this.setState({ input_focused: true });
    };

    _onBlur = (e) => {
        e.preventDefault();
        this.setState({ input_focused: false, currentSuggestionIndex: -1 });
    };

    componentDidMount() {
        const { pathname } = this.props.location;
        // If user access a search query directly from the URL or refresh the page
        if (pathname === '/results') {
            const search_query = this.props.location.search.substring(14);
            const title_search_query = search_query.split('+').join(' ');
            this.setState({
                searchQuery: title_search_query,
                constantSearchQuery: title_search_query,
            });
        }
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    // When clicking outside the search form, close the suggestions box
    handleClickOutside = (event) => {
        if (
            this.component.current &&
            !this.component.current.contains(event.target)
        ) {
            this.setState({ input_focused: false });
            this.closeSearchbar();
        }
    };

    // close search suggestions on mobile or desktop
    closeSearchbar = () => {
        this.state.input.current.blur();
        this.component.current.classList.remove('mobile-search--active');
    };

    // Search suggestions key controls
    onInputKeyPress = (e) => {
        const { keyCode } = e;
        if (keyCode !== 38 && keyCode !== 40) return;
        e.preventDefault();
        let { currentSuggestionIndex, searchQuery } = this.state;
        const { constantSearchQuery } = this.state;
        const suggestions = document.getElementsByClassName('suggestion-item');
        const suggestionsLength = suggestions.length;

        // Getting the index of the current key selected search suggestion
        if (keyCode === 38) {
            // up
            if (currentSuggestionIndex < 0)
                currentSuggestionIndex = suggestionsLength;
            if (
                currentSuggestionIndex <= suggestionsLength - 1 ||
                currentSuggestionIndex >= 0
            )
                currentSuggestionIndex--;
        }
        if (keyCode === 40) {
            // down
            if (
                currentSuggestionIndex < 0 ||
                currentSuggestionIndex < suggestionsLength - 1
            )
                currentSuggestionIndex++;
            else currentSuggestionIndex = -1;
        }

        // If suggestion is -1 (outside of the array of search suggestions)
        // restore the search term as the original typed by the user
        if (currentSuggestionIndex === -1) searchQuery = constantSearchQuery;

        // Adding or removing classes to search suggestions depending on the current
        // selected search suggestion
        for (let i = 0; i < suggestionsLength; i++) {
            const suggestion = suggestions[i];
            if (currentSuggestionIndex === i) {
                suggestion.classList.add('suggestion-item-highlighted');
                searchQuery = suggestion.innerText;
            } else suggestion.classList.remove('suggestion-item-highlighted');
        }

        this.setState({
            currentSuggestionIndex,
            searchQuery,
        });
    };

    changeCurrentSuggestionIndex = (currentSuggestionIndex) => {
        this.setState({ currentSuggestionIndex });
    };

    render() {
        const { input_focused, searchQuery, suggestions, input } = this.state;
        return (
            <div ref={this.component} className="searchbar--container">
                <div
                    onClick={this.closeSearchbar}
                    className={'close-search--btn'}
                >
                    <i
                        className={'fa fa-arrow-left'}
                        style={{ color: '#555' }}
                    />
                </div>
                <form onSubmit={(e) => this._onSubmit(e)}>
                    <input
                        autoComplete="off"
                        ref={input}
                        value={searchQuery}
                        onChange={(e) => this._onChange(e)}
                        onKeyDown={(e) => this.onInputKeyPress(e)}
                        onFocus={(e) => this._onFocus(e)}
                        placeholder={locales.nav.inputPlaceholder}
                        type="text"
                        id="search-input"
                    />
                    <div className="button-submit-container">
                        <ToolTip
                            message={locales.nav.tooltips.inputButton}
                            onTop={false}
                            style={{ flex: '1' }}
                        >
                            <button type="submit">
                                <i className="fa fa-search"></i>
                            </button>
                        </ToolTip>
                    </div>
                </form>
                {input_focused &&
                    searchQuery.length > 0 &&
                    suggestions.length > 0 && (
                        <SearchSuggestionContainer
                            searchSuggestion={this._searchSuggestion}
                            suggestions={suggestions}
                            changeCurrentSuggestionIndex={
                                this.changeCurrentSuggestionIndex
                            }
                        />
                    )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        search_results: state.search_results,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
        updateSearchResults: (payload) =>
            dispatch(updateSearchResults(payload)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Searchbar)
);
