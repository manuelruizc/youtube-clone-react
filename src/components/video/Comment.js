import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete, ThumbDown, ThumbUp } from "../../assets/Icons";
import {
  agoFormatting,
  deleteComment,
  voteComment,
} from "../../helpers/helpers";
import locales from "../../locales/comments";
import ButtonContainer from "../shared/ButtonContainer";
import SmallModal from "../shared/SmallModal";
import { getURLAndTimestamps } from "./helpers/helpers";

const VideoComments = ({ comments, updateComments }) => {
  return (
    <div className="video-comments-container">
      {comments.map((comment, index) => (
        <Comment
          comments={comments}
          updateComments={updateComments}
          key={comment.id}
          index={index}
          comment={comment}
        />
      ))}
    </div>
  );
};

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
          date={agoFormatting(created_at, true) + " ago"}
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

const CommentOptionsButton = ({
  updateComments,
  index,
  commentId,
  comments,
}) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useDispatch();
  const deleteUserComment = async () => {
    const response = await deleteComment(commentId);
    const { error } = response.data;
    if (!error) {
      let newComments = [...comments];
      newComments.splice(index, 1);
      updateComments([...newComments]);
      const payload = {
        toast_message: "Comment deleted",
        id: String(new Date()) + "deleted comment",
      };
      dispatch({ type: "ADD_TOAST_NOTIFICATION", payload });
    }
  };
  return (
    <ButtonContainer className="btn-cnt">
      {isModalActive && (
        <SmallModal
          right
          style={{ width: "100px !important", height: "36px !important" }}
          closeDropdown={() => setIsModalActive(false)}
          autoWidth
        >
          <div onClick={deleteUserComment} className="modal-rv-item">
            <Delete className="icon-small-modal" />
            <span>{locales.modal.options.delete}</span>
          </div>
        </SmallModal>
      )}
      <a
        onClick={(e) => {
          e.preventDefault();
          setIsModalActive(true);
        }}
        className="btn-options"
        href="/"
      >
        <span className="three-points-toggle" />
      </a>
    </ButtonContainer>
  );
};

const UserCommentImage = ({ imageSource }) => {
  return (
    <div className="comment-user-image">
      <img alt="User profile thumbnail" src={imageSource} />
    </div>
  );
};

const UserData = ({ username, date }) => {
  return (
    <div className="comment-user-data-container">
      <span className="comment-user-data-username">{username}</span>
      <span className="comment-user-data-date">{date}</span>
    </div>
  );
};

const UserComment = ({ comment }) => {
  return (
    <span className="comment-user-comment">
      {getURLAndTimestamps(comment).map((g, index) => {
        if (!g.props) return <span key={index}>{g}</span>;
        let key = "";
        const { children, time } = g.props;
        if (children) key = children + index;
        else if (time) key = time + index;
        return <span key={key}>{g}</span>;
      })}
    </span>
  );
};

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
    await voteComment({ uid: 0, comment_id: commentId, is_liked, is_disliked });
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
    await voteComment({ uid: 0, comment_id: commentId, is_liked, is_disliked });
  };

  useEffect(() => {
    if (userCommentLikedStatus === "liked") {
      setIsLiked(true);
      setIsDisliked(false);
      setIsLikedSinceMounted(true);
    } else if (userCommentLikedStatus === "disliked") {
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

const VoteButton = ({ upvote, number, voteFunction, voted }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const vote = () => {
    if (user) {
      voteFunction();
      return;
    }
    dispatch({ type: "UPDATE_VISITOR_MODAL", payload: true });
  };
  return (
    <div className="comment-vote-button-container">
      {upvote ? (
        <div onClick={vote}>
          <ThumbUp
            className={
              voted
                ? "comment-vote-icon comment-vote-icon--voted"
                : "comment-vote-icon"
            }
          />
        </div>
      ) : (
        <div onClick={vote}>
          <ThumbDown
            className={
              voted
                ? "comment-vote-icon comment-vote-icon-dislike  comment-vote-icon--voted"
                : "comment-vote-icon comment-vote-icon-dislike"
            }
          />
        </div>
      )}
      {upvote && number > 0 && (
        <span className="comment-votes-number">{number}</span>
      )}
    </div>
  );
};

export default VideoComments;
