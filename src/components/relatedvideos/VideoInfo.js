import React from 'react';
import { ownerBadgeText } from '../../helpers/helpers';
import OwnerBadges from '../shared/OwnerBadges';
import ToolTip from '../shared/ToolTip';

const VideoInfo = (props) => {
    const { info } = props;
    const { title, author, short_view_count_text, ownerBadges, date } = info;
    return (
        <div className="videoinfo--container">
            <span className="videoinfo--container--title">{title}</span>
            <span className="videoinfo--container--author">
                <ToolTip message={author.name}>
                    <span className={'rv-author'}>{author.name}</span>
                </ToolTip>
                {ownerBadges && (
                    <ToolTip message={ownerBadgeText(ownerBadges)}>
                        <OwnerBadges badges={ownerBadges} />
                    </ToolTip>
                )}
            </span>
            <span className="videoinfo--container--views">
                {short_view_count_text} {date && ` • ${date}`}
            </span>
        </div>
    );
};

export default VideoInfo;
