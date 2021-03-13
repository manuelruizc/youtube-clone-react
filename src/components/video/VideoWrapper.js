import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { convertMinsSecs } from '../../helpers/helpers';

const VideoWrapper = (props) => {
    let nextVideos = props.relatedVideos.filter((video, index) => index < 12);

    return (
        <div className="next-thumb-container">
            <div className="next-thumbs next-thumbs--active">
                {nextVideos.map((video) => (
                    <Link
                        to={`/watch?v=${video.id}`}
                        style={{
                            backgroundImage: `url('${
                                video.thumbnails[video.thumbnails.length - 1]
                                    .url
                            }')`,
                        }}
                        class="thumb-c"
                    >
                        <div class="thumb-midlay">
                            <span class="t-vt">{video.title}</span>
                            <span class="t-c">
                                {video.author.name} -{' '}
                                {video.short_view_count_text}
                            </span>
                            <span class="t-d">
                                {convertMinsSecs(
                                    video.length_seconds * 1000,
                                    video.length_seconds
                                )}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        relatedVideos: state.relatedVideos,
    };
};

export default connect(mapStateToProps)(VideoWrapper);
