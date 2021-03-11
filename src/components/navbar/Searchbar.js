import axios from "axios";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  updateLoadingState,
  updateSearchResults,
} from "../../actions/darkTheme";
import {
  insertSearchTerm,
  LOADING_STATES,
  searchVideos,
} from "../../helpers/helpers";
import locales from "../../locales/navbar";
import ToolTip from "../shared/ToolTip";

const { LOADING, LOADING_COMPLETE } = LOADING_STATES;

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      constantSearchQuery: "",
      suggestions: [],
      input_focused: false,
      input: createRef(),
      currentSuggestionIndex: -1,
    };
    this.component = createRef();
  }

  _searchVideos = async (search_query) => {
    const { updateLoadingState } = this.props;
    const { LOADING } = LOADING_STATES;
    updateLoadingState(LOADING);
    const response = await searchVideos(search_query);
    const { data } = response;
    return data;
  };

  _searchSuggestion = (e, searchQuery) => {
    e.preventDefault();
    this.searchVideoItems(searchQuery);
  };

  _onSubmit = (e) => {
    e.preventDefault();
    this.searchVideoItems();
  };

  searchVideoItems = async (searchSuggested = null) => {
    let searchQuery = searchSuggested
      ? searchSuggested
      : this.state.searchQuery;
    this.setState({ input_focused: false, searchQuery });
    const { user, updateLoadingState, updateSearchResults } = this.props;
    updateLoadingState(LOADING);
    let uid;
    const constantSearchQuery = searchQuery;
    document.title = constantSearchQuery + " - CloneTube";
    searchQuery = searchQuery
      .split(" ")
      .filter((f) => f !== " ")
      .join("+");
    if (searchQuery !== "") {
      const data = await this._searchVideos(searchQuery);
      if (user) {
        uid = user.uid;
        insertSearchTerm(constantSearchQuery, uid);
      }
      updateSearchResults(data);
      window.scrollTo(0, 0);
      updateLoadingState(LOADING_COMPLETE);
      this.component.current.classList.remove("mobile-search--active");
      this.props.history.push(`/results?search_query=${searchQuery}`);
    }
  };

  _onChange = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.value;
    const suggestionsDOM = document.getElementsByClassName("suggestion-item");
    const suggestionsLength = suggestionsDOM.length;
    for (let i = 0; i < suggestionsLength; i++) {
      const suggestion = suggestionsDOM[i];
      suggestion.classList.remove("suggestion-item-highlighted");
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
    axios
      .get(`search_suggestion/${searchQuery}`)
      .then((response) => {
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
    if (pathname === "/results") {
      const search_query = this.props.location.search.substring(14);
      const title_search_query = search_query.split("+").join(" ");
      this.setState({
        searchQuery: title_search_query,
        constantSearchQuery: title_search_query,
      });
    }
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (event) => {
    if (
      this.component.current &&
      !this.component.current.contains(event.target)
    ) {
      this.setState({ input_focused: false });
      this.closeSearchbar();
    }
  };

  closeSearchbar = () => {
    this.state.input.current.blur();
    this.component.current.classList.remove("mobile-search--active");
  };

  onInputKeyPress = (e) => {
    const { keyCode } = e;
    if (keyCode !== 38 && keyCode !== 40) return;
    e.preventDefault();
    let { currentSuggestionIndex, searchQuery } = this.state;
    const { constantSearchQuery } = this.state;
    const suggestions = document.getElementsByClassName("suggestion-item");
    const suggestionsLength = suggestions.length;

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

    if (currentSuggestionIndex === -1) searchQuery = constantSearchQuery;

    for (let i = 0; i < suggestionsLength; i++) {
      const suggestion = suggestions[i];
      if (currentSuggestionIndex === i) {
        suggestion.classList.add("suggestion-item-highlighted");
        searchQuery = suggestion.innerText;
      } else suggestion.classList.remove("suggestion-item-highlighted");
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
        <div onClick={this.closeSearchbar} className={"close-search--btn"}>
          <i className={"fa fa-arrow-left"} style={{ color: "#555" }} />
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
              style={{ flex: "1" }}
            >
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </ToolTip>
          </div>
        </form>
        {input_focused && searchQuery.length > 0 && suggestions.length > 0 && (
          <SearchSuggestionContainer
            searchSuggestion={this._searchSuggestion}
            suggestions={suggestions}
            changeCurrentSuggestionIndex={this.changeCurrentSuggestionIndex}
          />
        )}
      </div>
    );
  }
}

const SearchSuggestionContainer = (props) => {
  const { suggestions, changeCurrentSuggestionIndex } = props;
  const highlightSuggestion = (suggestionIndex) => {
    const suggestionsDOM = document.getElementsByClassName("suggestion-item");
    if (suggestionIndex === -1) changeCurrentSuggestionIndex(-1);
    for (let i = 0; i < suggestionsDOM.length; i++) {
      const currentSuggestion = suggestionsDOM[i];
      if (i === suggestionIndex) {
        changeCurrentSuggestionIndex(i);
        currentSuggestion.classList.add("suggestion-item-highlighted");
      } else currentSuggestion.classList.remove("suggestion-item-highlighted");
    }
  };

  return (
    <div className="search-suggestion-container">
      {suggestions.map((sug, index) => {
        return (
          <span
            key={sug[0]}
            onClick={(e) => props.searchSuggestion(e, sug[0])}
            className={"suggestion-item"}
            onMouseMove={() => highlightSuggestion(index)}
            onMouseLeave={() => highlightSuggestion(-1)}
          >
            <span>{sug[0]}</span>
          </span>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    search_results: state.search_results,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
    updateSearchResults: (payload) => dispatch(updateSearchResults(payload)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Searchbar)
);
