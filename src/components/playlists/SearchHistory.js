import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateLoadingState } from "../../actions/reduxActions";
import { CloseButton } from "../../assets/Icons";
import {
  agoFormatting,
  deleteTerm,
  getSearchHistory,
  LOADING_STATES,
} from "../../helpers/helpers";
import locales from "../../locales/historial";
import ToolTip from "../shared/ToolTip";
import "./searchhistory.scss";

class SearchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: [],
      terms_first_call: [],
      isModalActive: false,
      gotSearchTerms: false,
    };
  }

  componentDidMount() {
    this.getSearchHistory();
  }

  getSearchHistory = async () => {
    const response = await getSearchHistory();
    const { terms } = response.data;
    this.props.updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
    this.setState({ terms_first_call: terms, terms, gotSearchTerms: true });
  };

  deleteTerm = async (e, term, term_id) => {
    const { user } = this.props;
    const { uid } = user;
    const response = await deleteTerm(uid, term, term_id);
    const { error } = response;
    if (!error) {
      let { terms } = this.state;
      for (let i = 0; i < terms.length; i++) {
        let currentTerm = terms[i];
        const currentTermId = currentTerm.id;
        if (currentTermId === term_id) {
          terms[i] = false;
          break;
        }
      }
      this.setState({ terms });
    }
  };

  goToSearch = (e, term) => {
    const { target } = e;
    const clickableClasses = [
      "search_item-container",
      "search_data-container",
      "search_term",
      "search_date",
    ];
    if (!clickableClasses.includes(target.className)) return;
    const search_query = term.split(" ").join("+");
    this.props.history.push({
      pathname: `/results`,
      search: `?search_query=${search_query}`,
    });
  };

  render() {
    const { terms } = this.state;

    if (terms.length === 0) {
      return (
        <span className="playlist-empty-text">{locales.search.noVideos}</span>
      );
    }

    return (
      <div>
        {terms.map((term) => {
          if (!term) {
            return (
              <div
                key={term}
                className="search_item-container deleted_item-container"
              >
                <span className="search_term_deleted">
                  {locales.itemRemoved}
                </span>
              </div>
            );
          }
          const { search_term, updated_at, id } = term;
          let date_difference_formated = agoFormatting(updated_at);
          return (
            <div
              key={term + updated_at}
              onClick={(e) => this.goToSearch(e, search_term)}
              className="search_item-container"
            >
              <div className="search_data-container">
                <span className="search_term">{search_term}</span>
                <span className="search_date">
                  {date_difference_formated} ago
                </span>
              </div>
              <div onClick={(e) => this.deleteTerm(e, search_term, id)}>
                <ToolTip message={"Eliminar del Historial de búsqueda"}>
                  <CloseButton className="close-btn" />
                </ToolTip>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    darkTheme: state.darkTheme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchHistory)
);
