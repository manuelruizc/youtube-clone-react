import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Subscriptions, Trending } from '../../assets/Icons';
import locales from '../../locales/navbar';
import domains from '../../locales/socials';

const activeClass = 'sidenav-link sidenav-path-active';

const SidenavLink = ({ children, icon = false, pathname, to, customIcon }) => {
    if (!icon) {
        let linkIcon;
        if (customIcon === 'home') linkIcon = <Home className="sidenav-icon" />;
        else if (customIcon === 'subscriptions')
            linkIcon = <Subscriptions className="sidenav-icon" />;
        else linkIcon = <Trending className="sidenav-icon" />;
        return (
            <Link
                to={to}
                className={pathname === to ? activeClass : 'sidenav-link'}
            >
                <span>
                    {linkIcon}
                    <span>{locales.sidenav[customIcon]}</span>
                </span>
            </Link>
        );
    }
    const className = `sidenav-link-icon-fa fa ${icon}`;
    return (
        <a
            rel="noopener noreferrer"
            href={domains.linkedin}
            target="_blank"
            className="sidenav-link"
        >
            <span>
                <i className={className} />
                <span>{children}</span>
            </span>
        </a>
    );
};

export default SidenavLink;
