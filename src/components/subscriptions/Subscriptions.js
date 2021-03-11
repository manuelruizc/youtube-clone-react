import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addToastNotification,
  updateLoadingState,
} from "../../actions/darkTheme";
import {
  getUserSubscriptions,
  LOADING_STATES,
  subscribeToAChannel,
} from "../../helpers/helpers";
import locales from "../../locales/subscriptions";
import ConfirmActionModal from "../shared/ConfirmActionModal";
import NotLoggedInScreen from "../shared/NotLoggedInScreen";
import "./subscriptions.scss";

const TokenExists = localStorage.getItem("jwt_token");

const Subscriptions = (props) => {
  const getSubs = async (uid) => {
    const response = await getUserSubscriptions(uid);
    const { subscriptions } = response.data;
    setSubscriptions(subscriptions);
    _updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
  };
  const { user, addToastNotification, darkTheme, _updateLoadingState } = props;
  const [subscriptions, setSubscriptions] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);
  useEffect(() => {
    if (user) getSubs(user.uid);
  }, [user]);
  useEffect(() => {
    document.title = locales.title + " - CloneTube";
    _updateLoadingState(LOADING_STATES.LOADING);
    if (!TokenExists) {
      _updateLoadingState(LOADING_STATES.LOADING_COMPLETE);
      _updateLoadingState(LOADING_STATES.NOT_LOADING);
    }
  }, []);

  const modifySubscriptionState = (channel_index, subscriptionState) => {
    const modSubscriptions = subscriptions;
    modSubscriptions[channel_index]["is_subscribed"] = subscriptionState;
    setSubscriptions([...modSubscriptions]);
    addToastNotification({
      toast_message: !subscriptionState
        ? locales.toast.unsubscribed
        : locales.toast.subscribed,
      id: String(new Date()) + "subscribe_to_channel",
    });
  };

  const openConfirmModal = (channel, index) => {
    const {
      channel_name,
      channel_thumbnail,
      channel_id,
      is_subscribed,
    } = channel;
    setConfirmModal({
      channel_name,
      channel_id,
      is_subscribed,
      channel_thumbnail,
      index,
    });
  };

  const closeConfirmModal = () => setConfirmModal(null);

  const changeSubscription = async () => {
    const { uid } = user;
    let {
      channel_id,
      channel_name,
      channel_thumbnail,
      is_subscribed,
      index,
    } = confirmModal;
    is_subscribed = is_subscribed === 1 ? 0 : 1;
    const response = await subscribeToAChannel(
      uid,
      channel_id,
      channel_name,
      channel_thumbnail,
      is_subscribed
    );
    const { error } = response.data;
    if (!error) {
      modifySubscriptionState(index, is_subscribed);
    }
  };

  if (!TokenExists) {
    return (
      <NotLoggedInScreen
        title="Don´t miss new videos"
        description="Sign in to see updates from your favorite YouTube channels"
        icon="subscriptions"
      />
    );
  }

  return (
    <FeedChannelContainer
      className={
        darkTheme
          ? "feed-channel-container"
          : "feed-channel-container feed-channel-container--light-theme"
      }
    >
      <ChannelsContainer>
        {subscriptions.length > 0 &&
          subscriptions.map((channel, index) => {
            return (
              <ChannelItem
                user={user}
                channel={channel}
                modifySubscriptionState={modifySubscriptionState}
                openConfirmModal={openConfirmModal}
                index={index}
                key={channel.channel_id}
              />
            );
          })}
      </ChannelsContainer>
      {confirmModal && (
        <ConfirmActionModal
          description={locales.confirmModal.description(
            confirmModal.channel_name
          )}
          actionButtonTitle={locales.confirmModal.confirmButton}
          action={changeSubscription}
          modalSize={"small"}
          closeModal={closeConfirmModal}
        />
      )}
    </FeedChannelContainer>
  );
};

const FeedChannelContainer = ({ className, children }) => (
  <div className={className}>{children}</div>
);

const ChannelsContainer = (props) => (
  <div className="channels-container">{props.children}</div>
);

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

const ChannelItemContainer = ({ children }) => {
  return <div className="channel-item-container">{children}</div>;
};

const ChannelMetadata = ({ channel }) => {
  const { channel_name, channel_thumbnail } = channel;
  return (
    <div className="channel-data-container">
      <img
        className="channel-image"
        alt={channel_name}
        src={channel_thumbnail}
      />
      <span className="channel-name">{channel_name}</span>
    </div>
  );
};

const SubscribeButton = ({
  isSubscribed,
  openModal,
  changeSubscriptionState,
}) => {
  return (
    <div
      onClick={isSubscribed ? openModal : changeSubscriptionState}
      className={
        isSubscribed ? "subscribe-button subscribed" : "subscribe-button"
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    darkTheme: state.darkTheme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToastNotification: (payload) => dispatch(addToastNotification(payload)),
    _updateLoadingState: (payload) => dispatch(updateLoadingState(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
