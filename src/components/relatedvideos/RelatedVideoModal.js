import React, { Component } from 'react';
import { Playlist, WatchLater } from '../../assets/Icons';
import { addVideoToPlaylist } from '../../helpers/helpers';
import locales from '../../locales/relatedvideos';
import SmallModal from '../shared/SmallModal';

class RelatedVideoModal extends Component {
    addToPlaylist = async () => {
        const { user, closeDropdown, addToastNotification } = this.props;

        if (user === null) return false;
        const { uid } = user;
        const {
            title,
            author,
            id,
            length_seconds,
            thumbnails,
        } = this.props.video;
        const thumbnail = thumbnails[thumbnails.length - 1].url;
        const playlistName = 'WatchLater';
        const video_object = {
            uid,
            videoid: id,
            title,
            uploader: author.name,
            length_seconds,
            playlistName,
            type: 1,
            thumbnail,
        };
        const response = await addVideoToPlaylist(video_object);
        if (response.status === 200) {
            addToastNotification({
                toast_message: 'Saved to Watch later',
                id: String(new Date()) + 'added_to_wl',
            });
            closeDropdown();
        }
    };

    openPlaylistModal = async () => {
        this.props.openPlaylistModal(false);
        this.props.closeDropdown();
    };

    render() {
        const {
            is_modal_up,
            closeDropdown,
            user,
            updateVisitorModal,
        } = this.props;
        return (
            <SmallModal closeDropdown={closeDropdown} is_modal_up={is_modal_up}>
                <div className="modal-innercontainer">
                    <div
                        onClick={
                            !user ? updateVisitorModal : this.addToPlaylist
                        }
                        className="modal-rv-item"
                    >
                        <WatchLater className="icon-small-modal" />
                        <span>{locales.modal.saveToWatchLater}</span>
                    </div>
                    <div
                        onClick={
                            !user ? updateVisitorModal : this.openPlaylistModal
                        }
                        className="modal-rv-item"
                    >
                        <Playlist className="icon-small-modal" />
                        <span>{locales.modal.saveToPlaylist}</span>
                    </div>
                </div>
            </SmallModal>
        );
    }
}

export default RelatedVideoModal;
