import React from 'react';

const LoadingCard = () => {
    const arrayMapper = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];
    return (
        <>
            <div className='videocard-title--loading' />
            {arrayMapper.map((a, i) => 
                (
                <div key={i}
                    style={{textDecoration: 'none'}}
                    className="videocard--loading">
                    <div className="thumbnail--loading"></div>
                    <div className="video-info--loading"></div>
                </div>
                )
            )}
        </>
    );
}
 
export default LoadingCard;