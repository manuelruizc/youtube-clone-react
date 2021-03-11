import firebase from "firebase";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { toggleTheme, updateAuthUserData } from "../../../actions/darkTheme";
import {
  Appareance,
  CloseButton,
  Language,
  Logout,
} from "../../../assets/Icons";
import language from "../../../helpers/languages";
import locales from "../../../locales/dropdown";
import domains from "../../../locales/socials";
import "./dropdown.scss";

const availableLanguages = [
  { languageCode: "ca", languageName: "Catalá" },
  { languageCode: "de", languageName: "Deutsch" },
  { languageCode: "en", languageName: "English" },
  { languageCode: "es", languageName: "Español" },
  { languageCode: "fr", languageName: "Français" },
  { languageCode: "it", languageName: "Italiano" },
];
let currentLanguage = language[1];
const languages = {
  ca: "Catalá",
  de: "Deutsch",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
};

class DarkTheme extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.component = createRef();
  }

  componentDidMount() {
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
      this.props.closeDropdown();
    }
  };

  render() {
    const { props } = this;
    return (
      <div ref={this.component} className="dropdown-menu-dark">
        <div className="dark-theme-title">
          <i
            onClick={(e) => props.changeDropdown(e, "main")}
            className="fa fa-chevron-left"
          ></i>
          <span>{locales.appareance.dark}</span>
        </div>
        <div className="dark-theme-desc">
          <p>
            {locales.appareance.descriptionOne}
            <br />
            <br />
            {locales.appareance.descriptionTwo}
          </p>
        </div>
        <div className="dark-theme-action">
          <span style={{ textTransform: "uppercase" }}>
            {locales.appareance.dark}
          </span>
          <div
            className={`${
              props.darkTheme ? "switch switch--active" : "switch"
            }`}
          >
            <input
              className="checkbox-next"
              type="checkbox"
              onChange={props.toggleDarkTheme}
              checked={props.darkTheme}
            />
            <span
              className={`${props.darkTheme ? "round round--active" : "round"}`}
            ></span>
          </div>
        </div>
      </div>
    );
  }
}

class LanguagesModal extends Component {
  constructor(props) {
    super(props);
    this.component = createRef();
  }

  componentDidMount() {
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
      this.props.closeDropdown();
    }
  };

  render() {
    const { props } = this;
    return (
      <div ref={this.component} className="dropdown-menu-language">
        <div className="dark-theme-title">
          <i
            onClick={(e) => props.changeDropdown(e, "main")}
            className="fa fa-chevron-left"
          ></i>
          <span>{locales.language.subtitle}</span>
        </div>
        {availableLanguages.map((languagesItem) => {
          const { languageCode, languageName } = languagesItem;
          return (
            <span
              onClick={() => {
                localStorage.setItem(
                  "language",
                  JSON.stringify([languageCode, languageCode])
                );
                window.location.reload();
              }}
              className="dropdown-link"
            >
              <span>
                {languageCode === currentLanguage && (
                  <i className="fa fa-check" />
                )}
                {languageName}
              </span>
            </span>
          );
        })}
      </div>
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDropdown: "main",
    };
    this.component = createRef();
  }

  logout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    this.props.closeDropdown();
    window.location.reload();
  };

  changeDropdown = (e, currentDropdown) => {
    e.preventDefault();
    this.setState({ currentDropdown });
  };

  componentDidMount() {
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
      this.props.closeDropdown();
    }
  };

  render() {
    const { user } = this.props;
    const { currentDropdown } = this.state;

    if (currentDropdown === "main") {
      return (
        <div ref={this.component} className="dropdown-menu">
          <div className="mobile-goback-container">
            <div
              onClick={this.props.closeDropdown}
              className="goback-button-container"
            >
              <CloseButton className="close-button-icon" />
            </div>
            <span>{locales.account}</span>
          </div>
          <div className="personal-info">
            <div className="personal-info--container">
              <img src={user.photoURL} alt={user.displayName} />
              <div>
                <span>{user.displayName}</span>
                <span>{user.email}</span>
              </div>
            </div>
            <a
              className="manage-account-link"
              target="_blank"
              href="https://myaccount.google.com/"
            >
              {locales.manageAccount}
            </a>
          </div>
          <div className="account-info">
            <a className="dropdown-link" href={domains.website}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-file" />
                {locales.portfolio}
              </span>
            </a>
            <a className="dropdown-link" href={domains.github}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-github" />
                {locales.github}
              </span>
            </a>
            <a className="dropdown-link" href={domains.linkedin}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-linkedin" />
                {locales.linkedin}
              </span>
            </a>
            <a className="dropdown-link" href={domains.youtube}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-youtube" />
                {locales.youtube}
              </span>
            </a>
            <a
              onClick={(e) => this.logout(e)}
              className="dropdown-link"
              href="/"
            >
              <span>
                <Logout className="dropdown-link-icon" />
                {locales.signOut}
              </span>
            </a>
          </div>
          <div className="account-settings">
            <a
              onClick={(e) => this.changeDropdown(e, "DarkTheme")}
              className="dropdown-link"
              href="/"
            >
              <span>
                <Appareance className="dropdown-link-icon appareance" />
                {locales.appareance.title}:{" "}
                {this.props.darkTheme
                  ? locales.appareance.dark
                  : locales.appareance.light}
              </span>
              <i className="fa fa-chevron-right"></i>
            </a>
            <a
              onClick={(e) => this.changeDropdown(e, "languages")}
              className="dropdown-link"
              href="/"
            >
              <span>
                <Language className="dropdown-link-icon languages" />
                {locales.language.title}: {languages[currentLanguage]}
              </span>
            </a>
            <a className="dropdown-link" href={domains.website}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-file" />
                {locales.portfolio}
              </span>
            </a>
            <a className="dropdown-link" href={domains.github}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-github" />
                {locales.github}
              </span>
            </a>
            <a className="dropdown-link" href={domains.linkedin}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-linkedin" />
                {locales.linkedin}
              </span>
            </a>
            <a className="dropdown-link" href={domains.youtube}>
              <span>
                <i className="sidenav-link-icon-fa fa fa-youtube" />
                {locales.youtube}
              </span>
            </a>
          </div>
          <div className="geo-settings"></div>
        </div>
      );
    } else if (currentDropdown === "DarkTheme") {
      return (
        <DarkTheme
          toggleDarkTheme={this.props.toggleDarkTheme}
          changeDropdown={this.changeDropdown}
          closeDropdown={this.props.closeDropdown}
          darkTheme={this.props.darkTheme}
        />
      );
    } else if (currentDropdown === "languages") {
      return (
        <LanguagesModal
          changeDropdown={this.changeDropdown}
          closeDropdown={this.props.closeDropdown}
        />
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDarkTheme: () => dispatch(toggleTheme()),
    updateUserData: (payload) => dispatch(updateAuthUserData(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    darkTheme: state.darkTheme,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
