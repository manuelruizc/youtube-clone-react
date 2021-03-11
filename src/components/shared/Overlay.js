import React from 'react';
import './css/overlay.scss';
import locales from '../../locales/miniatureplayer';

const Overlay = () => {
    return(
        <div className='overlay'>
            <span
                style={
                    {
                        fontWeight: '500',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        color: 'white',
                        position: 'relative',
                        backgroundColor: 'transparent',
                        textAlign: 'center'
                    }
                }
            >{locales.overlay.text}</span>
        </div>
    );
}

export default Overlay;