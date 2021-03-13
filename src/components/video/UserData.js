import React from 'react';

const UserData = ({ username, date }) => {
    return (
        <div className="comment-user-data-container">
            <span className="comment-user-data-username">{username}</span>
            <span className="comment-user-data-date">{date}</span>
        </div>
    );
};

export default UserData;
