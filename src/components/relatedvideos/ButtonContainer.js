import React from 'react';

const ButtonContainer = (props) => {
    return (
        <div
            className={'btn-container'}
            style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {props.children}
        </div>
    );
};

export default ButtonContainer;
