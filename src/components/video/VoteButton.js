import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThumbDown, ThumbUp } from '../../assets/Icons';

const VoteButton = ({ upvote, number, voteFunction, voted }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const vote = () => {
        if (user) {
            voteFunction();
            return;
        }
        dispatch({ type: 'UPDATE_VISITOR_MODAL', payload: true });
    };
    return (
        <div className="comment-vote-button-container">
            {upvote ? (
                <div onClick={vote}>
                    <ThumbUp
                        className={
                            voted
                                ? 'comment-vote-icon comment-vote-icon--voted'
                                : 'comment-vote-icon'
                        }
                    />
                </div>
            ) : (
                <div onClick={vote}>
                    <ThumbDown
                        className={
                            voted
                                ? 'comment-vote-icon comment-vote-icon-dislike  comment-vote-icon--voted'
                                : 'comment-vote-icon comment-vote-icon-dislike'
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

export default VoteButton;
