import React from 'react';
import Overlay from './Overlay';
import ToolTip from './ToolTip';

const HistoryVideoThumbnail = ({
    video,
    search,
    getVideos,
    user,
    pathname,
    OptionsButton,
    onClick,
    onClickParams,
    isMiniplayerActive,
    currentVideo
}) => {
    return (
        <div style={{paddingLeft: '20px'}} key={video.id} className="playlist-video playlist-history">
            <a
                onClick={(e) => {
                    e.preventDefault();
                    onClick(onClickParams);
                }}
                href={pathname}
                className="video-basic-data"
            >
                <div style={{backgroundImage: `url("${video.thumbnail}")`}} className="video-thumb">
                    <span>{video.video_duration}</span>
                    {(video.current_length !== undefined) && 
                    (<div className="video_current_progress" >
                        <div style={{width: ((100/video.length)*video.current_length)+'%'}} />
                    </div>)
                    }
                    {
                        isMiniplayerActive && currentVideo ?
                            currentVideo.isError ? null :
                            video.id === currentVideo.id && (<Overlay />) :
                            null
                    }
                </div>
                <div className="video-title-channel-container">
                    <span className='video-title'>{video.video_title}</span>
                    <ToolTip message={video.video_channel}>
                        <span className="video-channel">{video.video_channel}</span>
                    </ToolTip>
                </div>
            </a>
            {
                OptionsButton && 
                (<OptionsButton
                    search={search}
                    getVideos={getVideos}
                    user={user}
                    video={video}
                />)
            }
        </div>
    );
}
 
export default HistoryVideoThumbnail;