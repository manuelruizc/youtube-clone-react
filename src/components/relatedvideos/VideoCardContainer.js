import React from 'react';

const VideoCardContainer = (props) => {
    return (
        <div className={'videocard-container'} style={{ position: 'relative' }}>
            {props.children}
        </div>
    );
};

export default VideoCardContainer;
