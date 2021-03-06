import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Home, Library, Subscriptions, Trending } from "../../assets/Icons";
import locales from "../../locales/navbar";

// Paths where the bottom navbar should be active
const paths = [
  "/",
  "/feed/trending",
  "/feed/channels",
  "/feed/library",
  "/playlist",
];

// Bottom Navbar for mobile devices
class BottomNavbar extends Component {
  render() {
    const { pathname } = this.props.location;
    // If the current pathname is included in paths
    const pathExists = paths.includes(pathname);
    // If current path is not included, do not render anything
    if (!pathExists) return <></>;
    return (
      <div className={"bottom-navbar"}>
        <Link
          to={"/"}
          className={`bottom-icon ${pathname === "/" && "icon-active"}`}
        >
          <Home className="bottom-navbar-icon" />
          <span>{locales.bottomNav.home}</span>
        </Link>
        <Link
          to={"/feed/trending"}
          className={`bottom-icon ${
            pathname === "/feed/trending" && "icon-active"
          }`}
        >
          <Trending className="bottom-navbar-icon" />
          <span>{locales.bottomNav.trending}</span>
        </Link>
        <Link
          to={"/feed/channels"}
          className={`bottom-icon ${
            pathname === "/feed/channels" && "icon-active"
          }`}
        >
          <Subscriptions className="bottom-navbar-icon" />
          <span>{locales.bottomNav.subscriptions}</span>
        </Link>
        <Link
          to={"/feed/library"}
          className={`bottom-icon ${
            pathname === "/feed/library" && "icon-active"
          }`}
        >
          <Library className="bottom-navbar-icon" />
          <span>{locales.bottomNav.library}</span>
        </Link>
      </div>
    );
  }
}

export default withRouter(BottomNavbar);
