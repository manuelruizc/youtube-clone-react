import React from 'react';
import OwnerBadges from '../OwnerBadges';
import ToolTip from '../ToolTip';
import Author from './Author';
import Badges from './Badges';
import { ownerBadgeText } from '../../../helpers/helpers'

const Metadata = (props) => {
    const { video, trending } = props;
    const { title, badges, owner_badges, channel } = video;

    if(trending) {
        let video_metadata = props.video.date === props.video.views ? 
        ` ${props.video.views}` : ` ${props.video.views} • ${props.video.date}`;
        return(
            <div className="video-result-info-container">
                <span className="vr-title">{title}</span>
                <span className="vr-channel">
                    <ToolTip message={channel}>
                        <span>{channel}</span>
                    </ToolTip>&nbsp;
                    {owner_badges && (
                    <ToolTip
                        message={ownerBadgeText(owner_badges)}
                        component={<OwnerBadges badges={owner_badges} />}
                    />)}
                    {video_metadata}</span>
                <span className="vr-description" dangerouslySetInnerHTML={{__html: video.description}}></span>
            </div>
        );
    }

    let video_metadata = props.video.date === props.video.views ? 
    ` ${props.video.views}` : ` ${props.video.views} • ${props.video.date}`;
    return(
        <div className="video-result-info-container">
            <span className="vr-title">{title}</span>
            <span className="vr-channel">{video_metadata}</span>
            <Author video={video} />
            <span className="vr-description" dangerouslySetInnerHTML={{__html: video.description}}></span>
            {badges && (<Badges badges={badges} />)}
        </div>
    );
}

export default Metadata;