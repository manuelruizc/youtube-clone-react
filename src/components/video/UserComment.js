import React from 'react';
import { getURLAndTimestamps } from './helpers/helpers';

const UserComment = ({ comment }) => {
    return (
        <span className="comment-user-comment">
            {getURLAndTimestamps(comment).map((g, index) => {
                if (!g.props) return <span key={index}>{g}</span>;
                let key = '';
                const { children, time } = g.props;
                if (children) key = children + index;
                else if (time) key = time + index;
                return <span key={key}>{g}</span>;
            })}
        </span>
    );
};

export default UserComment;
