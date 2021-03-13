import React, { useState } from 'react';
import './css/tooltip.scss';

const ToolTip = (props) => {
    const {
        component,
        message,
        childrenIsAbsolute,
        onTop = true,
        style = {},
        toolTipStyle = {},
        show = true,
        videoControl = false,
    } = props;
    const [tooltipVisible, setTooltipVisibe] = useState(false);
    const positionClass = onTop ? 'tooltip-top' : 'tooltip-down';
    let classNameTooltip = `tooltip ${positionClass}`;
    if (videoControl) classNameTooltip += ' videocontrol-tooltip';
    return (
        <div
            onMouseOver={() => setTooltipVisibe(true)}
            onMouseOut={() => setTooltipVisibe(false)}
            className={
                childrenIsAbsolute
                    ? 'tooltip-container-absolute'
                    : 'tooltip-container'
            }
            style={style}
        >
            {tooltipVisible && show && (
                <span style={toolTipStyle} className={classNameTooltip}>
                    {message}
                </span>
            )}
            {props.children === undefined
                ? React.cloneElement(component)
                : props.children}
        </div>
    );
};

export default ToolTip;
