import React from 'react';
import { Muted } from '../../assets/Icons';

const MobileVolumeControl = ({ controlVolume }) => {
    return (
        <div
            onClick={controlVolume}
            className="volume-control-container"
            sizeStyle={{
                width: '12px',
                height: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div className={'volume-control-btn'}>
                <Muted />
                <span>Listen to this video</span>
            </div>
        </div>
    );
};

export default MobileVolumeControl;
