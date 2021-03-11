import React from 'react';

const LoadingSkeleton = () => {
    return(
        <React.Fragment>
            <div className="videoinfo-skeleton">
                <div className="title-skeleton"></div>
                <div className="subcontent-skeleton">
                    <div className="subtitle-skeleton"></div>
                    <div className="circles-skeleton">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="videouser-skeleton">
                
            </div>
        </React.Fragment>
    );
}

export default LoadingSkeleton;