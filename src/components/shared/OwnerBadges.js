import React from 'react';
import {
    Verified,
    Artist
} from '../../assets/Icons';
import { connect } from 'react-redux';
import './css/ownerbadges.scss';

const OwnerBadges = ({badges, darkTheme}) => {
    const { style } = badges[0].metadataBadgeRenderer;
    const text = style === 'BADGE_STYLE_TYPE_VERIFIED_ARTIST' ? 'music' : 'verified';
    if(text === 'music')
        return(<Artist className={`owner-badge-icon ${!darkTheme && 'light-theme-owner-badge-icon'}`} />);
    return(<Verified className={`owner-badge-icon verified-icon ${!darkTheme && 'light-theme-owner-badge-icon'}`} />);
}

const mapStateToProps = (state) => {
    return {
        darkTheme: state.darkTheme
    }
};

export default connect(mapStateToProps)(OwnerBadges);