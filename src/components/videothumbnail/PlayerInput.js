import React from 'react';

const PlayerInput = (props) => {
    const { duration, currentTime, video } = props;
    const sliderThumbPosition = String(currentTime);
    const rangeOutput = (value = null) => {
        const rangeInp = document.getElementById('range');
        if (!isNaN(value) === false) video.currentTime = rangeInp.value;
        else video.currentTime = video.currentTime + value;
    };

    return (
        <input
            id="range"
            type="range"
            step="1"
            min="0"
            max={String(duration)}
            value={sliderThumbPosition}
            onChange={rangeOutput}
            onInput={rangeOutput}
        />
    );
};

export default PlayerInput;
