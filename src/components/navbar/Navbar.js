import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
    toggleSidenav,
    toggleSidenavHome,
    toggleTheme,
    updateAuthUserData,
} from '../../actions/reduxActions';
import { Bell, Grid, Upload } from '../../assets/Icons';
import { login } from '../../helpers/helpers';
import locales from '../../locales/navbar';
import BottomNavbar from './BottomNavbar';
import Main from './dropdown/Main';
import './navbar.scss';
import Searchbar from './Searchbar';
const sliderSidenavPathname = '/watch';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownMenu: false,
        };
    }

    // Active search form when using mobile
    activeMobileSearch = () => {
        document
            .getElementsByClassName('searchbar--container')[0]
            .classList.add('mobile-search--active');
        document.getElementById('search-input').focus();
    };

    // Dropdown menu setState
    dropdownMenu = (close = false) => {
        if (close) this.setState({ dropdownMenu: false });
        else this.setState({ dropdownMenu: !this.state.dropdownMenu });
    };

    toggleSidenavigation = (pathname) => {
        // if the pathname is not /watch, toggle the sidenav with home styles
        if (pathname !== sliderSidenavPathname) {
            this.props.toggleSidenavHome();
        } else {
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
            this.props.toggleSidenav();
        }
    };

    render() {
        const { darkTheme, user, theater_mode } = this.props;
        const { dropdownMenu } = this.state;
        // Get dark or light theme
        let theme = darkTheme ? 'nav' : 'nav--light';
        const pathname = this.props.history.location.pathname;
        // Get theater mode, if pathname === /watch, nav color black
        // else white or black depending on theme
        theme = theater_mode && pathname === '/watch' ? 'nav' : theme;

        return (
            <NavContainer theme={theme}>
                <LogoContainer
                    pathname={pathname}
                    toggleSidenavigation={this.toggleSidenavigation}
                />
                <Searchbar history={this.props.history} />
                {user === null ? (
                    <SignInButtons
                        login={login}
                        activeMobileSearch={this.activeMobileSearch}
                    />
                ) : (
                    <LoggedInButtons
                        activeMobileSearch={this.activeMobileSearch}
                        user={user}
                        dropdownMenu={dropdownMenu}
                        dropdownMenuFunction={this.dropdownMenu}
                    />
                )}
                <BottomNavbar />
            </NavContainer>
        );
    }
}

const NavContainer = (props) => {
    const { theme } = props;
    return <nav className={theme}>{props.children}</nav>;
};

const LogoContainer = (props) => {
    const { toggleSidenavigation, pathname } = props;
    return (
        <div className="logomenu--container">
            <span
                onClick={() => {
                    toggleSidenavigation(pathname);
                }}
                className="burger"
            >
                <span></span>
            </span>
            <Link
                to={{ pathname: '/', state: { prevPath: pathname } }}
                className="logoyt"
            ></Link>
        </div>
    );
};

const SignInButtons = (props) => {
    const { login } = props;
    return (
        <div className="userinfo--container sign-in">
            <Upload className="sign-in-icon" />
            <Grid className="sign-in-icon" />
            <i
                onClick={() => props.activeMobileSearch()}
                className="fa fa-search mobile-search"
            ></i>
            <button onClick={login} className={'login-btn'}>
                <div>
                    <i className={'fa fa-user'}></i>
                </div>
                <span>{locales.nav.signIn}</span>
            </button>
        </div>
    );
};

const LoggedInButtons = (props) => {
    const { dropdownMenu, dropdownMenuFunction, user } = props;
    return (
        <div className="userinfo--container">
            <Upload className="sign-in-icon" />
            <Grid className="sign-in-icon" />
            <Bell className="sign-in-icon" />
            <i
                onClick={() => props.activeMobileSearch()}
                className="fa fa-search mobile-search"
            ></i>
            <div onClick={() => dropdownMenuFunction()} className="pfl-img">
                <img className="pfl-img" src={user.photoURL} alt="¨Perfil" />
            </div>
            {dropdownMenu && <Main closeDropdown={dropdownMenuFunction} />}
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleDarkTheme: () => dispatch(toggleTheme()),
        updateUserData: (payload) => dispatch(updateAuthUserData(payload)),
        toggleSidenav: () => dispatch(toggleSidenav()),
        toggleSidenavHome: () => dispatch(toggleSidenavHome()),
    };
};

const mapStateToProps = (state) => {
    return {
        darkTheme: state.darkTheme,
        user: state.user,
        language: state.language,
        theater_mode: state.theater_mode,
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
