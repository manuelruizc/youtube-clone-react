import React from 'react';

const UserCommentImage = ({ imageSource }) => {
    return (
        <div className="comment-user-image">
            <img alt="User profile thumbnail" src={imageSource} />
        </div>
    );
};

export default UserCommentImage;
