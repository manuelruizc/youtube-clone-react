import React from 'react';

const OverflowSection = ({ children }) => {
    return (
        <div className="overflow-section-container">
            <div className="overflow-section">{children}</div>
        </div>
    );
};

export default OverflowSection;
