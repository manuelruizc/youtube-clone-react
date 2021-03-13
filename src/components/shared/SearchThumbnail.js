import React from 'react';

const SearchThumbnail = (props) => {
    const { style, onClick, onClickParams, href, size } = props;
    const sizeClass =
        size === 'regular'
            ? 'video-result-container'
            : 'video-result-container video-result-container-big';
    return (
        <div className={sizeClass}>
            {props.children}
            <a
                onClick={(e) => {
                    e.preventDefault();
                    onClick(onClickParams);
                }}
                href={href}
                style={style}
            >
                <span style={{ display: 'none' }}>Video link</span>
            </a>
        </div>
    );
};

export default SearchThumbnail;
