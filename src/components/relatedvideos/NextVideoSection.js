import React from 'react';
import locales from '../../locales/relatedvideos';
import ToggleButton from '../shared/ToggleButton';
import ToolTip from '../shared/ToolTip';

const NextVideoSection = (props) => {
    const { _onCheckboxClick, autoplay } = props;
    return (
        <div className="next-video">
            <h4
                className={'next-video-title'}
                style={{
                    marginBottom: '12px',
                    fontSize: '16px',
                    fontWeight: 400,
                }}
            >
                {locales.next}
            </h4>
            <div className="autoplay-container">
                <span className="autoplay-spantag">{locales.autoplay}</span>
                <ToolTip
                    onTop={false}
                    toolTipStyle={{
                        width: '190px',
                        whiteSpace: 'pre-line',
                        bottom: '-80px',
                        left: '-40px',
                    }}
                    message={
                        'When autoplay is enabled, a suggested video will automatically play next.'
                    }
                >
                    <ToggleButton
                        color="#3ea6ff"
                        onChange={_onCheckboxClick}
                        active={autoplay}
                    />
                </ToolTip>
            </div>
        </div>
    );
};

export default NextVideoSection;
