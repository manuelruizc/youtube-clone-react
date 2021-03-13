import React from 'react';

const ChannelMetadata = ({ channel }) => {
    const { channel_name, channel_thumbnail } = channel;
    return (
        <div className="channel-data-container">
            <img
                className="channel-image"
                alt={channel_name}
                src={channel_thumbnail}
            />
            <span className="channel-name">{channel_name}</span>
        </div>
    );
};

export default ChannelMetadata;
