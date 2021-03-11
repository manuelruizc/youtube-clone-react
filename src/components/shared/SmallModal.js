import React, { Component, createRef } from "react";
import { withRouter } from "react-router-dom";
import language from "../../helpers/languages";

const smallModalTranslateStyleRelatedVideos = {
  ca: { transform: "translate(-95%, 20px)" },
  de: { transform: "translate(-92%, 20px)" },
  en: { transform: "translate(-80%, 20px)" },
  es: { transform: "translate(-98%, 20px)" },
  fr: { transform: "translate(-108%, 20px)" },
  it: { transform: "translate(-85%, 20px)" },
};

const smallModalTranslateStylePlaylist = {
  ca: { transform: "translate(-100%, 28px)" },
  de: { transform: "translate(-100%, 28px)" },
  en: { transform: "translate(-99%, 28px)" },
  es: { transform: "translate(-100%, 28px)" },
  fr: { transform: "translate(-100%, 28px)" },
  it: { transform: "translate(-99%, 28px)" },
};

class SmallModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.component = createRef();
    this.currentThreePointsOptions = null;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
    const { overlaping = true } = this.props;
    if (!overlaping) return;
    const optionButtons = document.getElementsByClassName("btn-container");
    let i = this.props.is_modal_up ? optionButtons.length : 0;
    for (i; i < optionButtons.length; i++) {
      const currentOptionIteration = optionButtons[i];
      if (
        currentOptionIteration.childNodes.length > 1 &&
        i < optionButtons.length - 1
      ) {
        this.currentThreePointsOptions = optionButtons[i].children[1];
        this.currentThreePointsOptions.style.opacity = 1;
        currentOptionIteration.style.opacity = 1;
        optionButtons[i + 1].style.display = "none";
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
    const { overlaping = true } = this.props;
    if (!overlaping) return;
    if (this.currentThreePointsOptions)
      this.currentThreePointsOptions.style.opacity = "";
    const optionButtons = document.getElementsByClassName("btn-container");
    let i = this.props.is_modal_up ? optionButtons.length : 0;
    for (i; i < optionButtons.length; i++) {
      const currentOptionIteration = optionButtons[i];
      currentOptionIteration.style.display = "flex";
    }
  }

  handleClickOutside = (event) => {
    if (
      this.component.current &&
      !this.component.current.contains(event.target)
    ) {
      if (this.props.closeDropdown) this.props.closeDropdown();
    }
  };

  render() {
    const {
      is_modal_up,
      style = {},
      right = false,
      autoWidth = false,
      history,
    } = this.props;
    const { pathname } = history.location;
    let className = "playlist-modal";
    className += is_modal_up ? " playlist-modal--up-position" : "";
    className += right ? " playlist-modal--right-position" : "";
    className += autoWidth ? " playlist-modal--autowidth" : "";
    const containerStyle =
      pathname === "/playlist"
        ? smallModalTranslateStylePlaylist[language[0]]
        : smallModalTranslateStyleRelatedVideos[language[0]];
    return (
      <div
        className={className}
        style={className === "playlist-modal" ? containerStyle : {}}
      >
        <div
          style={style}
          ref={this.component}
          className="playlist-modal-inner"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default withRouter(SmallModal);
