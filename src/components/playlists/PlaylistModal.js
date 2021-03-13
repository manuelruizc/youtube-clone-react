import React, { Component } from 'react';
import { Delete, Playlist, WatchLater } from '../../assets/Icons';
import {
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
    removeLikedVideo,
} from '../../helpers/helpers';
import locales from '../../locales/playlist';
import SmallModal from '../shared/SmallModal';

class PlaylistModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addToPlaylist = async () => {
        const { user, closeModal, addToastNotification } = this.props;

        if (user === null) return false;
        const { uid } = user;
        const {
            video_title,
            video_channel,
            id,
            thumbnail,
            video_duration,
        } = this.props.video;
        const playlistName = 'WatchLater';
        const video_object = {
            uid,
            videoid: id,
            title: video_title,
            uploader: video_channel,
            length_seconds: video_duration,
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
            closeModal();
        }
    };

    deleteFromPlaylist = async () => {
        const {
            video,
            addToastNotification,
            closeModal,
            user,
            getVideos,
            getLikedVideos,
            search,
            playlistData,
        } = this.props;
        const { uid } = user;
        const { video_id } = video;
        const playlist_id = search;
        const { playlist_name } = playlistData;
        if (playlist_name === 'LL') {
            const response = await removeLikedVideo(uid, playlist_id, video_id);
            if (response.status === 200) {
                getLikedVideos(uid);
                addToastNotification({
                    toast_message: `Removed from Liked videos`,
                    id: String(new Date()) + 'added_to_wl',
                });
            }
        } else {
            const response = await deleteVideoFromPlaylist(
                uid,
                playlist_id,
                video_id
            );
            if (response.status === 200) {
                getVideos(search);
                addToastNotification({
                    toast_message: `Removed from ${playlist_name}`,
                    id: String(new Date()) + 'added_to_wl',
                });
            }
        }
        closeModal();
    };

    render() {
        const {
            is_modal_up,
            closeModal,
            modal_element,
            playlistName = '',
            changeModalStatus,
            user,
            playlistData,
        } = this.props;
        return (
            <SmallModal
                modal_element={modal_element}
                closeDropdown={closeModal}
                is_modal_up={is_modal_up}
            >
                <div className="modal-innercontainer">
                    {user && (
                        <>
                            <div
                                onClick={this.addToPlaylist}
                                className="modal-rv-item"
                            >
                                <WatchLater className="icon-small-modal" />
                                <span>{locales.smallModal.watchLater}</span>
                            </div>
                            <div
                                onClick={() => {
                                    closeModal();
                                    changeModalStatus(true);
                                }}
                                className="modal-rv-item"
                            >
                                <Playlist className="icon-small-modal playlist" />
                                <span>{locales.smallModal.playlist}</span>
                            </div>

                            {user.uid === playlistData.uid && (
                                <>
                                    <div className="divider">
                                        <div className="inner-divider" />
                                    </div>
                                    <div
                                        onClick={this.deleteFromPlaylist}
                                        className="modal-rv-item"
                                    >
                                        <Delete className="icon-small-modal" />
                                        <span>
                                            {locales.smallModal.remove(
                                                playlistName
                                            )}
                                        </span>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </SmallModal>
        );
    }
}

export default PlaylistModal;
