import React from 'react';

const Thumbnail = (props) => {
    const { imageURI, time, current_length, length } = props;
    return(
        <div className="video-result-thumbnail">
            <img className=""
            alt={imageURI}
            src={imageURI}
            />
            <span className="video-result-thumbnail-time">{time}</span>
            {(current_length !== undefined) && 
            (<div className="video_current_progress" >
                <div style={{width: ((100/length)*current_length)+'%'}} />
            </div>)}
            {props.children}
        </div>
    );
}

export default Thumbnail;