import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAuthUserData } from '../../../actions/darkTheme'
import { addDownloadCounter } from '../../../helpers/helpers'

class DownloadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };


    downloadVideo = async (e, url) => {
        e.preventDefault();
        try {
            const response = await addDownloadCounter(); 
            if(response.status === 200)
                window.open(url, '_blank');
        }
        catch(e) {
            
        }
    }

    render() {
        const { closeModal, sources } = this.props;
        const { audioandvideoFormats, videoFormats } = sources
        return (
            <div id="modal-container">
                <div onClick={() => closeModal(false)} id="modal-out"></div>
                <div className={'download-container'}>
                    <h3>Download Videos</h3>
                    <table border="1">
                        <tr><th colSpan="3">MP3</th></tr>
                        <tr><th>Sound</th><th>Quality</th><th>Download</th></tr>
                        <tr>
                            <td>Yes</td>
                            <td>MP3</td>
                            <td><a href="#" onClick={e => this.props.downloadVideo(e, "mp3")}>Download</a></td>
                        </tr>

                        <tr><th colSpan="3">Audio and Video</th></tr>
                        <tr><th>Sound</th><th>Quality</th></tr>
                        {
                            audioandvideoFormats.map((item, index) => {
                                const { qualityLabel, audioBitrate,  url } = item;
                                return(
                                    <tr>
                                        <td>{audioBitrate ? 'Yes' : 'No'}</td>
                                        <td>{qualityLabel}</td>
                                        <td><a href="#" onClick={e => this.downloadVideo(e, url)}>Download</a></td>
                                    </tr>
                                );
                            })
                        }
                        
                        <tr><th colSpan="3">Video Without Sound</th></tr>
                        <tr><th>Sound</th><th>Quality</th></tr>
                        {
                            videoFormats.map((item, index) => {
                                const { qualityLabel, audioBitrate, url } = item;
                                return(
                                    <tr>
                                        <td>{audioBitrate ? 'Yes' : 'No'}</td>
                                        <td>{qualityLabel}</td>
                                        <td><a href="#" onClick={e => this.downloadVideo(e, url)}>Download</a></td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAuthUserData: () => dispatch(updateAuthUserData()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadModal);