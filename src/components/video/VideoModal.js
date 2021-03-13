import React, { useEffect, useRef, useState } from 'react';
import locales from '../../locales/video';
import ToggleButton from '../shared/ToggleButton';
import './css/videomodal.scss';
import ModalItemTitle from './ModalItemTitle';
import PlaybackSpeedContainer from './PlaybackSpeedContainer';
import VideoModalContainer from './VideoModalContainer';
import VideoModalItem from './VideoModalItem';

const VideoModal = (props) => {
    const { isCogActive, rate, slowMotion } = props;
    const videoModal = useRef(null);
    const [currentModal, setCurrentModal] = useState('main');
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (videoModal.current && !videoModal.current.contains(event.target)) {
            setCurrentModal('main');
            if (
                props.controlModal &&
                !event.target.classList.contains('fa-cog')
            ) {
                setCurrentModal('main');
                props.controlModal(false);
            }
        }
    };

    if (currentModal === 'playback') {
        return (
            <VideoModalContainer
                isCogActive={isCogActive}
                videoModal={videoModal}
            >
                <PlaybackSpeedContainer
                    rate={rate}
                    slowMotion={slowMotion}
                    onClickMainButton={() => setCurrentModal('main')}
                    onClickSecondaryButton={() => setCurrentModal('main')}
                />
            </VideoModalContainer>
        );
    }

    return (
        <VideoModalContainer isCogActive={isCogActive} videoModal={videoModal}>
            <VideoModalItem onClick={props.toggleAutoplay}>
                <ModalItemTitle>
                    {locales.videoPlayer.modal.autoplay}
                </ModalItemTitle>
                <ToggleButton active={props.autoplay} color="red" />
            </VideoModalItem>

            {props.watermark && (
                <VideoModalItem
                    onClick={props.setAnnotations}
                    annotations={props.annotations}
                >
                    <ModalItemTitle>
                        {locales.videoPlayer.modal.annotations}
                    </ModalItemTitle>
                    <ToggleButton active={props.annotations} color="red" />
                </VideoModalItem>
            )}

            <VideoModalItem onClick={() => setCurrentModal('playback')}>
                <ModalItemTitle>
                    {locales.videoPlayer.modal.playbackSpeed}
                </ModalItemTitle>
                <ModalItemTitle>
                    {rate === 1 ? locales.videoPlayer.modal.normal : rate}
                </ModalItemTitle>
            </VideoModalItem>
        </VideoModalContainer>
    );
};

export default VideoModal;
