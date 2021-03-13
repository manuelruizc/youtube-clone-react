import React, { useEffect, useState } from 'react';
import { voteComment } from '../../helpers/helpers';
import VoteButton from './VoteButton';

const CommentsVotesContainer = ({
    likes,
    commentId,
    userCommentLikedStatus,
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [isLikedSinceMounted, setIsLikedSinceMounted] = useState(false);

    const upvoteComment = async () => {
        let is_liked = 0;
        let is_disliked = 0;
        if (isDisliked) {
            setIsDisliked(false);
            is_disliked = 0;
            setIsLiked(true);
            is_liked = 1;
        } else if (isLiked) {
            setIsLiked(false);
            is_liked = 0;
        } else {
            setIsLiked(true);
            is_liked = 1;
        }
        await voteComment({
            uid: 0,
            comment_id: commentId,
            is_liked,
            is_disliked,
        });
    };
    const downvoteComment = async () => {
        let is_liked = 0;
        let is_disliked = 0;
        if (isLiked) {
            setIsLiked(false);
            is_liked = 0;
            setIsDisliked(true);
            is_disliked = 1;
        } else if (isDisliked) {
            setIsDisliked(false);
            is_disliked = 0;
        } else {
            is_disliked = 1;
            setIsDisliked(true);
        }
        await voteComment({
            uid: 0,
            comment_id: commentId,
            is_liked,
            is_disliked,
        });
    };

    useEffect(() => {
        if (userCommentLikedStatus === 'liked') {
            setIsLiked(true);
            setIsDisliked(false);
            setIsLikedSinceMounted(true);
        } else if (userCommentLikedStatus === 'disliked') {
            setIsLiked(false);
            setIsDisliked(true);
        } else {
            setIsDisliked(false);
            setIsLiked(false);
        }
    }, [userCommentLikedStatus]); // check this hook effect

    const numberOfLikes = (num) => {
        if (isLikedSinceMounted) num = num - 1;
        if (isDisliked) return num;
        if (isLiked) return num + 1;
        return num;
    };

    return (
        <div className="comments-likes-container">
            <VoteButton
                voted={isLiked}
                upvote={true}
                number={numberOfLikes(likes)}
                voteFunction={upvoteComment}
            />
            <VoteButton
                voted={isDisliked}
                upvote={false}
                voteFunction={downvoteComment}
            />
        </div>
    );
};

export default CommentsVotesContainer;
