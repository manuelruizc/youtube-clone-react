import React from 'react';
import { subscribeToAChannel } from '../../helpers/helpers';
import ChannelItemContainer from './ChannelItemContainer';
import ChannelMetadata from './ChannelMetadata';
import SubscribeButton from './SubscribeButton';

const ChannelItem = ({
    channel,
    index,
    modifySubscriptionState,
    user,
    openConfirmModal,
}) => {
    const {
        channel_name,
        channel_thumbnail,
        channel_id,
        is_subscribed,
    } = channel;
    const isSubscribed = is_subscribed === 1;
    const changeSubscriptionState = async () => {
        const isSubscribed = is_subscribed === 1 ? 0 : 1;
        const { uid } = user;
        const response = await subscribeToAChannel(
            uid,
            channel_id,
            channel_name,
            channel_thumbnail,
            isSubscribed
        );
        const { error } = response.data;
        if (!error) {
            modifySubscriptionState(index, isSubscribed);
        }
    };

    const openModal = () => {
        openConfirmModal(channel, index);
    };
    return (
        <ChannelItemContainer>
            <ChannelMetadata channel={channel} />
            <SubscribeButton
                isSubscribed={isSubscribed}
                openModal={openModal}
                changeSubscriptionState={changeSubscriptionState}
            />
        </ChannelItemContainer>
    );
};

export default ChannelItem;
