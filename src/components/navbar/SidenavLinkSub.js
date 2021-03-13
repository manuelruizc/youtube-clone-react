import React from 'react';

const SidenavLinkSub = ({ channel_name, channel_thumbnail }) => (
    <div className="sidenav-link subscription-link">
        <span>
            <img alt="Channel thumbnail" src={channel_thumbnail} />
            <span>{channel_name}</span>
        </span>
    </div>
);

export default SidenavLinkSub;
