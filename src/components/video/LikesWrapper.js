import React from 'react';
import { ThumbDown, ThumbUp } from '../../assets/Icons';
import { commaFormatting, KiloFormatting } from '../../helpers/helpers';
import locales from '../../locales/video';
import ToolTip from '../shared/ToolTip';

const LikesWrapper = ({
    user,
    updateVisitorModal,
    voteVideo,
    isVideoLiked,
    isVideoDisliked,
    likes,
    dislikes,
}) => {
    let likesWidth = 0;
    let dislikesWidth = 0;
    const intLikes = Number(likes.split(',').join(''));
    const intDislikes = Number(dislikes.split(',').join(''));
    let newLikes = intLikes + 1;
    let newDislikes = intDislikes + 1;

    if (likes !== undefined) {
        const percentage_likes = isVideoLiked ? newLikes : intLikes;
        const percentage_dislikes = isVideoDisliked ? newDislikes : intDislikes;
        const percentage = percentage_likes + percentage_dislikes;
        likesWidth = (100 / percentage) * percentage_likes;
        dislikesWidth = (100 / percentage) * percentage_dislikes;
    }
    return (
        <div className="likes-wrapper">
            <ToolTip
                message={
                    isVideoLiked
                        ? locales.uploaderInfo.tooltips.like.active
                        : locales.uploaderInfo.tooltips.like.unactive
                }
            >
                <span
                    onClick={!user ? updateVisitorModal : (e) => voteVideo(e)}
                    className="like-btn"
                    href="#"
                >
                    <ThumbUp
                        className={`thumb-icon ${
                            isVideoLiked ? 'video-liked-color' : ''
                        }`}
                    />
                    <span
                        className={`${isVideoLiked ? 'video-liked-color' : ''}`}
                    >
                        {isVideoLiked
                            ? KiloFormatting(newLikes)
                            : KiloFormatting(likes)}
                    </span>
                </span>
            </ToolTip>
            <ToolTip message={locales.uploaderInfo.tooltips.dislike}>
                <span
                    onClick={
                        !user ? updateVisitorModal : (e) => voteVideo(e, false)
                    }
                    className="like-btn dislike-btn"
                    href="#"
                >
                    <ThumbDown
                        className={`thumb-icon ${
                            isVideoDisliked ? 'video-liked-color' : ''
                        }`}
                    />
                    <span
                        className={`${
                            isVideoDisliked ? 'video-liked-color' : ''
                        }`}
                    >
                        {isVideoDisliked
                            ? KiloFormatting(newDislikes)
                            : KiloFormatting(dislikes)}
                    </span>
                </span>
            </ToolTip>
            <ToolTip
                message={`${commaFormatting(likes)} / ${commaFormatting(
                    dislikes
                )}`}
                childrenIsAbsolute={true}
            >
                <div className="likes-bar-container">
                    <div className="likes-bar">
                        <div
                            className={
                                isVideoLiked || isVideoDisliked
                                    ? 'putcolor'
                                    : 'nocolor'
                            }
                            style={{
                                width: `${likesWidth}%`,
                                height: '100%',
                                transition: '0.3s linear all',
                            }}
                        ></div>
                        <div
                            style={{
                                width: `${dislikesWidth}%`,
                                height: '100%',
                                transition: '0.3s linear all',
                            }}
                        ></div>
                    </div>
                </div>
            </ToolTip>
        </div>
    );
};

export default LikesWrapper;
