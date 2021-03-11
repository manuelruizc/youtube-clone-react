import React from 'react';
import { HomepageSection } from './Section'


const Skeletons = () => {
    const array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    return(
        <HomepageSection>
            {array.map((a, index) => {
                return(
                    <div key={index} className="home-link">
                        <div className="thumb-cnt-skeleton" />
                        <div className='skeleton-container'>
                            <div className='thumb-owner-skeleton' />
                            <div className='thumb-title-container-skeleton'>
                                <span className="thumb-title-skeleton" />
                            {/* <div className="tmb-channel-skeleton" /> */}
                                <div className="thumb-views-skeleton" />
                            </div>
                        </div>
                    </div>
                )
            })}
        </HomepageSection>
    );
}

export default Skeletons;