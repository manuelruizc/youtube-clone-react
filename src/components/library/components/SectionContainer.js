import React from 'react';
import { Link } from 'react-router-dom';
import { History, Playlist, ThumbUp, WatchLater } from '../../../assets/Icons';
import locales from '../../../locales/library';
import VideosContainer from './VideosContainer';

const SectionContainer = ({
    title,
    videos,
    hasVideoCount,
    videoCount,
    pathname,
    iconName,
}) => {
    const playlist = title === locales.headers.playlists;
    const className =
        videos.length === 0 || !videos
            ? 'section-container empty'
            : 'section-container';
    return (
        <div className={className}>
            <SectionHeader
                iconName={iconName}
                title={title}
                hasVideoCount={hasVideoCount}
                videoCount={videoCount ? videoCount : null}
                pathname={pathname}
                playlist={playlist}
                videos={videos}
            />
            {<VideosContainer videos={videos} playlist={playlist} />}
        </div>
    );
};

const SectionHeader = ({
    title,
    hasVideoCount,
    pathname,
    videoCount,
    playlist,
    iconName,
    videos,
}) => {
    const getIcon = () => {
        const iconClassName = 'header-container-icon';
        if (iconName === 'history') {
            return <History className={iconClassName} />;
        } else if (iconName === 'likedvideos') {
            return <ThumbUp className={iconClassName} />;
        } else if (iconName === 'watchlater') {
            return <WatchLater className={iconClassName} />;
        }
        return <Playlist className={iconClassName} />;
    };

    return (
        <div className="header-container">
            <Link className="header-container-link" to={pathname}>
                {getIcon()}
                <span className="header-title-container">
                    <span className="header-title">{title}</span>
                    {hasVideoCount && (
                        <span className="header-video-count">{videoCount}</span>
                    )}
                </span>
            </Link>
            <Link to={pathname} className="header-seeall">
                <span
                    style={{
                        display:
                            playlist || videos.length === 0 || !videos
                                ? 'none'
                                : 'inline',
                    }}
                >
                    {locales.headers.buttons.seeAll}
                </span>
            </Link>
        </div>
    );
};

export default SectionContainer;
