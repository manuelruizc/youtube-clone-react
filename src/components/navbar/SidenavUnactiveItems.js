import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Library, Subscriptions, Trending } from '../../assets/Icons';
import locales from '../../locales/navbar';

const SideNavUnactiveItems = ({ history }) => {
    const { pathname } = history.location;
    return (
        <>
            <Link
                to="/"
                className={`sidenavunactive-item-container${
                    pathname === '/' ? ' sidenav-path-active' : ''
                }`}
            >
                <Home className="sidenav-icon" />
                <span>{locales.sidenav.home}</span>
            </Link>
            <Link
                to="/feed/trending"
                className={`sidenavunactive-item-container${
                    pathname === '/feed/trending' ? ' sidenav-path-active' : ''
                }`}
            >
                <Trending className="sidenav-icon" />
                <span>{locales.sidenav.trending}</span>
            </Link>
            <Link
                to="/feed/subscriptions"
                className={`sidenavunactive-item-container${
                    pathname === '/feed/subscriptions'
                        ? ' sidenav-path-active'
                        : ''
                }`}
            >
                <Subscriptions className="sidenav-icon" />
                <span>{locales.sidenav.subscriptions}</span>
            </Link>
            <Link
                to="/feed/library"
                className={`sidenavunactive-item-container${
                    pathname === '/feed/library' ? ' sidenav-path-active' : ''
                }`}
            >
                <Library className="sidenav-icon" />
                <span>{locales.sidenav.library}</span>
            </Link>
        </>
    );
};

export default SideNavUnactiveItems;
