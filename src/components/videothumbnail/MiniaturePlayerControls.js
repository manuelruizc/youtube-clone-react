import React from 'react';
import BufferedTime from '../video/BufferedTime';

const MiniaturePlayerControls = (props) => {
    const { bufferedTime } = props;

    return (
        <div
            className="slider-container"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
        >
            {props.children}
            <div className="slider-sub">
                <div className="slider-buffered-progress">
                    <BufferedTime bufferedTime={bufferedTime} />
                </div>
                <div className="slider-progress" id="progress"></div>
            </div>
        </div>
    );
};

export default MiniaturePlayerControls;
