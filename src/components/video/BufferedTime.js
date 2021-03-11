import React from 'react';

const BufferedTime = (props) => {

    let timeRanges = props.bufferedTime;
    let timeArr = [];

    if(timeRanges !== 0) {
        for(let i = 0; i < timeRanges.length; i++) {
            timeArr.push(0);
        }
        const video = document.getElementsByTagName("video")[0];
        return (
            <React.Fragment>
                {timeArr.map((time, index) => {
                    return (
                        <div
                            style={{
                                width: ((timeRanges.end(index) - timeRanges.start(index)) / video.duration) * 100 + "%",
                                height: '100%',
                                backgroundColor: 'rgba(175, 186, 180, 0.6)',
                                position: 'absolute',
                                top:0,
                                left:0,
                                marginLeft: (timeRanges.start(index) / video.duration) * 100 + "%",
                            }}
                            key={time + '-' + index}
                        />
                    );
                })}
            </React.Fragment>
        );
    }
    return (<div></div>)
}

export default BufferedTime;