import React from 'react';
import { ownerBadgeText } from '../../helpers/helpers';
import OwnerBadges from './OwnerBadges';
import ToolTip from './ToolTip';

const HomeVideoThumbnail = (props) => {
    const { video, pathname, index, onClick, onClickParams } = props;
    const { date, owner_badges } = video;
    return (
        <a
            onClick={(e) => {
                e.preventDefault();
                onClick(onClickParams);
            }}
            key={video.uri + index}
            title={video.title}
            className="home-link"
            href={pathname}
        >
            {props.children}
            <div className={'thumb-infocontainer'}>
                <div className={'thumb-owner'}>
                    <img
                        alt="Channe thumbnail"
                        src={video.channel_thumbnail}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className={'thumb-title-container'}>
                    <span className="tmb-title">{video.title}</span>
                    <span className="tmb-channel">
                        <ToolTip message={video.channel}>
                            <span className="tmb-channel-text">
                                {video.channel}
                            </span>
                        </ToolTip>
                        {owner_badges && (
                            <ToolTip
                                message={ownerBadgeText(owner_badges)}
                                component={
                                    <OwnerBadges badges={owner_badges} />
                                }
                            />
                        )}
                        <span className="mobile-views">• {video.views}</span>
                    </span>
                    <span className="tmb-views">
                        {video.views} • {date && date}
                    </span>
                </div>
            </div>
        </a>
    );
};

export default HomeVideoThumbnail;
