import React from 'react';
import { getURLAndTimestamps } from './helpers/helpers';

const DescriptionText = ({ text }) => {
    return (
        <>
            {text && (
                <span className="desc" style={{ color: 'white' }}>
                    {getURLAndTimestamps(text).map((g) => g)}
                </span>
            )}
        </>
    );
};

export default DescriptionText;
