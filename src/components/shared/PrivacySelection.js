import React from 'react';

const PrivacySelection = (props) => {
    return (
        <div className="privacy-container">
            {props.playlist.map((play, i) => {
                return (
                    <div
                        key={i}
                        onClick={() => props.selectPrivacy(i)}
                        className="privacy-setting"
                    >
                        {play.title}
                    </div>
                );
            })}
        </div>
    );
};

export default PrivacySelection;
