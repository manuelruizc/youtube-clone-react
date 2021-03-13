import React from 'react';
import locales from '../../locales/navbar';

const LoginSection = ({ login }) => {
    return (
        <div className="sidenav-subs login">
            <span className="login-message">{locales.nav.signInMessage}</span>
            <button
                style={{ height: '15%' }}
                onClick={login}
                className={'login-btn'}
            >
                <div>
                    <i className={'fa fa-user'}></i>
                </div>
                <span>{locales.titles.signIn}</span>
            </button>
        </div>
    );
};

export default LoginSection;
