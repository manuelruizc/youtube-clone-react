import React from 'react';
import locales from '../../locales/subscriptions';

const SubscribeButton = ({
    isSubscribed,
    openModal,
    changeSubscriptionState,
}) => {
    return (
        <div
            onClick={isSubscribed ? openModal : changeSubscriptionState}
            className={
                isSubscribed
                    ? 'subscribe-button subscribed'
                    : 'subscribe-button'
            }
        >
            <span>
                {isSubscribed
                    ? locales.subscribeButton.subscribed
                    : locales.subscribeButton.unsubscribed}
            </span>
        </div>
    );
};

export default SubscribeButton;
