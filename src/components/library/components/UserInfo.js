import React from 'react';
import locales from '../../../locales/library';

const UserInfo = ({ user }) => {
    if (!user) return <></>;
    const { photo_url, display_name, videos_liked, user_subscriptions } = user;
    return (
        <div className="user-info-container">
            <img
                alt="User thumbnail"
                src={photo_url}
                className="user-info-img"
            />
            <span className="user-info-name">{display_name}</span>
            <div className="user-info-stats">
                <div className="user-info-subs">
                    <span>{locales.user.data.subscriptions}</span>
                    <span>{user_subscriptions}</span>
                </div>
                <div className="user-info-uploads">
                    <span>{locales.user.data.uploads}</span>
                    <span>0</span>
                </div>
                <div className="user-info-likes">
                    <span>{locales.user.data.likes}</span>
                    <span>{videos_liked}</span>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
