import React from 'react';
import locales from '../../locales/navbar';
import SidenavLink from './SidenavLink';
import SidenavSectionContainer from './SidenavSectionContainer';
import SidenavSectionTitle from './SidenavSectionTitle';

const Socials = () => {
    return (
        <SidenavSectionContainer>
            <SidenavSectionTitle>
                {locales.sidenav.portfolio}
            </SidenavSectionTitle>
            <SidenavLink icon="fa-linkedin">LinkedIn</SidenavLink>
            <SidenavLink icon="fa-file">Portfolio</SidenavLink>
            <SidenavLink icon="fa-youtube">YouTube</SidenavLink>
            <SidenavLink icon="fa-github">GitHub</SidenavLink>
        </SidenavSectionContainer>
    );
};

export default Socials;
