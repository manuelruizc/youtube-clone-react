import React from 'react';
import { useSelector } from 'react-redux';
import { agoFormatting } from '../../helpers/helpers';
import CommentOptionsButton from './CommentOptionsButton';
import CommentsVotesContainer from './CommentsVotesContainer';
import UserComment from './UserComment';
import UserCommentImage from './UserCommentImage';
import UserData from './UserData';

const Comment = ({ comment, updateComments, index, comments }) => {
    const user = useSelector((state) => state.user);
    const uid = user ? user.uid : null;
    const {
        commenter_user_uid,
        created_at,
        id,
        image_source,
        likes,
        user_comment,
        display_name,
        user_liked_comment_status,
    } = comment;
    return (
        <div className="comment-container">
            <UserCommentImage imageSource={image_source} />
            <div className="comment-data-group-container">
                <UserData
                    username={display_name}
                    date={agoFormatting(created_at, true) + ' ago'}
                />
                <UserComment comment={user_comment} />
                <CommentsVotesContainer
                    userCommentLikedStatus={user_liked_comment_status}
                    commentId={id}
                    likes={likes}
                />
            </div>
            {uid === commenter_user_uid && (
                <CommentOptionsButton
                    comments={comments}
                    index={index}
                    updateComments={updateComments}
                    uid={uid}
                    commentId={id}
                />
            )}
        </div>
    );
};

export default Comment;
