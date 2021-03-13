import React from 'react';
import locales from '../../locales/video';
import DescriptionText from './DescriptionText';

const VideoDescriptions = ({ description, active, toggle }) => {
    return (
        <>
            <div
                className={
                    active
                        ? 'data-content data-content--active-description'
                        : 'data-content'
                }
            >
                <DescriptionText text={description} />
            </div>
            {description && (
                <a
                    className="button-show-description"
                    href="/"
                    style={{ color: 'white' }}
                    onClick={(e) => {
                        e.preventDefault();
                        toggle();
                    }}
                >
                    {active
                        ? locales.uploaderInfo.description.showLess
                        : locales.uploaderInfo.description.showMore}
                </a>
            )}
        </>
    );
};

export default VideoDescriptions;
