import React, { Component } from "react";
import { connect } from "react-redux";
import { updateLoadingState } from "../actions/darkTheme";
import { LOADING_STATES } from "../helpers/helpers";

class LoadingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      interval: null,
    };
  }

  componentDidMount() {
    const { LOADING_STATE } = this.props;
    const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
    if (LOADING_STATE === LOADING_COMPLETE) {
      clearInterval(this.state.interval);
      this.loadingComplete();
    } else if (LOADING_STATE === LOADING) {
      clearInterval(this.state.interval);
      this.loading();
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { LOADING_STATE } = newProps;
    const { LOADING, LOADING_COMPLETE } = LOADING_STATES;
    if (LOADING_STATE === LOADING_COMPLETE) {
      clearInterval(this.state.interval);
      this.loadingComplete();
    } else if (LOADING_STATE === LOADING) {
      clearInterval(this.state.interval);
      this.loading();
    }
  }

  loading = () => {
    const full_seconds = 4;
    let current_second = 0;
    const self = this;
    this.setState({
      interval: setInterval(function () {
        current_second++;
        const percentage = current_second * 19;
        self.setState({ percentage });
        if (current_second === full_seconds) {
          self.slowLoading();
        }
      }, 800),
    });
  };

  slowLoading = () => {
    const self = this;
    clearInterval(this.state.interval);
    this.setState({
      interval: setInterval(function () {
        const percentage = self.state.percentage + 4;
        self.setState({ percentage });
        if (percentage === 100) clearInterval(self.state.interval);
      }, 1000),
    });
  };

  loadingComplete = () => {
    const { updateLoadingState } = this.props;
    const { NOT_LOADING } = LOADING_STATES;

    this.setState(
      {
        percentage: 120,
      },
      () => {
        setTimeout(function () {
          updateLoadingState(NOT_LOADING);
        }, 1000);
      }
    );
  };

  render() {
    return (
      <div className="loading-bar--container">
        <div className={"loading-bar"}>
          <div
            className={"loading-indicator"}
            style={{ width: this.state.percentage + "%" }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    LOADING_STATE: state.loading_state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadingBar);
