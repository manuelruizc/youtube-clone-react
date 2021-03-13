import React from 'react';
import Comment from './Comment';

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

export default VideoComments;
