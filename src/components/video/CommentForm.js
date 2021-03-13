import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentVideo } from '../../helpers/helpers';
import locales from '../../locales/comments';

const CommentForm = ({ comments, videoId, updateComments }) => {
    const user = useSelector((state) => state.user);
    const uid = user ? (user.uid ? user.uid : '') : user;
    const display_name = user ? (user.displayName ? user.displayName : '') : '';
    const photo_url = user ? (user.photoURL ? user.photoURL : '') : '';
    const [textAreaFocused, setTextAreaFocused] = useState(false);
    const [comment, setComment] = useState('');
    const dataForPublicComment = {
        video_id: videoId,
        uid,
        display_name,
        comment,
        photo_url,
    };

    const getUserNewComment = (comment) => {
        let newCommentsArray = [...comments];
        newCommentsArray.unshift(comment);
        updateComments(newCommentsArray);
    };

    return (
        <div className="comment-form-container">
            <UserCommentImage
                imageSource={
                    user
                        ? photo_url
                        : 'https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj'
                }
            />
            <TextAreaCommentForm>
                <TextArea
                    comment={comment}
                    setComment={setComment}
                    textAreaFocus={setTextAreaFocused}
                />
                {textAreaFocused && (
                    <CommentFormButtons
                        getUserNewComment={getUserNewComment}
                        userData={dataForPublicComment}
                        comment={comment}
                        textAreaFocus={setTextAreaFocused}
                        setComment={setComment}
                    />
                )}
            </TextAreaCommentForm>
        </div>
    );
};

const TextAreaCommentForm = ({ children }) => {
    return <div className="text-area-comment-form">{children}</div>;
};

const TextArea = ({ textAreaFocus, comment, setComment }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const textarea = useRef(null);
    const auto_grow = () => {
        const element = textarea.current;
        element.style.height = '24px';
        element.style.height = element.scrollHeight + 'px';
    };
    const onFocus = (e) => {
        if (user) textAreaFocus(true);
        else {
            textarea.current.blur();
            dispatch({ type: 'UPDATE_VISITOR_MODAL', payload: true });
        }
    };
    const onChange = () => {
        const textValue = textarea.current.value;
        setComment(textValue);
    };
    return (
        <div className="text-area-container">
            <textarea
                id="comment-textarea"
                value={comment}
                onChange={(e) => onChange(e)}
                onFocus={onFocus}
                onInput={auto_grow}
                ref={textarea}
                placeholder={locales.form.placeholder}
            />
            <div className="text-area-active">
                <div />
            </div>
        </div>
    );
};

const CommentFormButtons = ({
    userData,
    textAreaFocus,
    setComment,
    comment,
    getUserNewComment,
}) => {
    const onCancel = () => {
        const textarea = document.getElementById('comment-textarea');
        textarea.style.height = '24px';
        textAreaFocus(false);
        setComment('');
    };
    const publishComment = async () => {
        if (comment.length === 0) return;
        const response = await commentVideo(userData);
        let newComment = response.data.comment;
        if (newComment) {
            newComment.user_liked_comment_status = 0;
            newComment.likes = 0;
            getUserNewComment(newComment);
            onCancel();
        }
    };
    return (
        <div className="comment-form-buttons-container">
            <a
                onClick={(e) => {
                    e.preventDefault();
                    onCancel();
                }}
                href="/"
                className="cancel-btn"
            >
                {locales.form.buttons.cancel}
            </a>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    publishComment();
                }}
                href="/"
                className={
                    comment.length > 0 ? 'confirm-btn' : 'confirm-btn--disabled'
                }
            >
                {locales.form.buttons.confirm}
            </a>
        </div>
    );
};

const UserCommentImage = ({ imageSource }) => {
    return (
        <div className="comment-form-user-image">
            <img alt="Your profile thumbnail" src={imageSource} />
        </div>
    );
};

export default CommentForm;
