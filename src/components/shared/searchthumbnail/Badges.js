import React from 'react';

const Badges = ({ badges }) => {
    return (
        <div className="vr-badges-container">
            {badges.map((badge, index) => {
                const { label } = badge.metadataBadgeRenderer;
                return (
                    <span key={label + index} className="vr-badge">
                        {label}
                    </span>
                );
            })}
        </div>
    );
};

export default Badges;
