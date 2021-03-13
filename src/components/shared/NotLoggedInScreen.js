import React from 'react';
import { connect } from 'react-redux';
import { History, Library, Subscriptions } from '../../assets/Icons';
import navLocales from '../../locales/navbar';
import './css/notloggedscreen.scss';

const NotLoggedInScreen = ({ darkTheme, icon, title, description }) => {
    const MainIcon = (iconName) => {
        iconName = iconName.toLowerCase();
        const className = 'not-logged-main-icon';
        if (iconName === 'subscriptions') {
            return <Subscriptions className={className} />;
        } else if (iconName === 'history') {
            return <History className={className} />;
        }
        return <Library className={className} />;
    };
    let containerClass = 'not-logged-screen-container';
    if (!darkTheme)
        containerClass += ' not-logged-screen-container--light-theme';
    return (
        <div className={containerClass}>
            {MainIcon(icon)}
            <h5 className="title">{title}</h5>
            <span className="description">{description}</span>
            <button style={{ height: '15%' }} className={'login-btn'}>
                <div>
                    <i className={'fa fa-user'}></i>
                </div>
                <span>{navLocales.titles.signIn}</span>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        darkTheme: state.darkTheme,
    };
};

export default connect(mapStateToProps)(NotLoggedInScreen);
