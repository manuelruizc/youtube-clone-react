import React, { Component, createRef } from 'react';
import PlaylistModal from './PlaylistModal';

class OptionsButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalActive: false,
            modal_position_up: false,
        };
        this.button = createRef();
    }

    closeModal = () => {
        this.setState({
            isModalActive: false,
            modal_position_up: false,
        });
    };

    openModal = () => {
        const button = this.button.current;
        const space = window.innerHeight - button.getBoundingClientRect().top;
        let modal_position_up = space < 213 ? true : false;
        this.setState({
            isModalActive: !this.state.isModalActive,
            modal_position_up,
        });
    };

    render() {
        const { isModalActive } = this.state;
        const {
            playlistName = '',
            addToastNotification,
            changeModalStatus,
            playlistData,
            getLikedVideos,
        } = this.props;
        return (
            <div className={'btn-container'}>
                {isModalActive && (
                    <PlaylistModal
                        search={this.props.search}
                        getVideos={this.props.getVideos}
                        user={this.props.user}
                        video={this.props.video}
                        modal_element={this.state.modal_element}
                        closeModal={this.closeModal}
                        is_modal_up={this.state.modal_position_up}
                        playlistName={playlistName}
                        changeModalStatus={changeModalStatus}
                        addToastNotification={addToastNotification}
                        playlistData={playlistData}
                        getLikedVideos={getLikedVideos}
                    />
                )}
                <span
                    style={{ paddingTop: 25 }}
                    ref={this.button}
                    onClick={this.openModal}
                    className="btn-options"
                >
                    <span className="three-points-toggle" />
                </span>
            </div>
        );
    }
}

export default OptionsButton;
