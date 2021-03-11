import React from "react";
import { ownerBadgeText } from "../../../helpers/helpers";
import OwnerBadges from "../OwnerBadges";
import ToolTip from "../ToolTip";

const Author = ({ video }) => {
  const { channel_thumbnail, channel, owner_badges } = video;
  return (
    <div className="vr-author-container">
      <img
        alt={`${channel} profile thumbnail`}
        className="vr-author-image"
        src={channel_thumbnail}
      />
      <ToolTip message={channel}>
        <span className="vr-author">{channel}</span>
      </ToolTip>
      {owner_badges && (
        <ToolTip
          message={ownerBadgeText(owner_badges)}
          component={<OwnerBadges badges={owner_badges} />}
        />
      )}
    </div>
  );
};

export default Author;
