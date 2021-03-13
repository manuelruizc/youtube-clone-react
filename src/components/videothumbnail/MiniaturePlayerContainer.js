import React from 'react';

const MiniaturePlayerContainer = (props) => {
    const { darkTheme, isThumbnailActive } = props;
    return (
        <div
            className={`miniature-player ${
                !darkTheme && 'miniature-player--light'
            }`}
            style={{ display: isThumbnailActive ? 'block' : 'none' }}
        >
            {props.children}
        </div>
    );
};

export default MiniaturePlayerContainer;
