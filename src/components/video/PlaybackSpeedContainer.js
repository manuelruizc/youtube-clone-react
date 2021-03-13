import React from 'react';
import locales from '../../locales/video';
import ModalItemTitle from './ModalItemTitle';
import VideoModalHeader from './VideoModalHeader';
import VideoModalHeaderButton from './VideoModalHeaderButton';
import VideoModalHeaderSecondaryButton from './VideoModalHeaderSecondaryButton';
import VideoModalItem from './VideoModalItem';

const PlaybackSpeedContainer = ({
    onClickMainButton,
    onClickSecondaryButton,
    rate,
    slowMotion,
}) => {
    const rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    return (
        <>
            <VideoModalHeader>
                <VideoModalHeaderButton onClick={onClickMainButton}>
                    * {locales.videoPlayer.modal.playbackSpeed}
                </VideoModalHeaderButton>
                <VideoModalHeaderSecondaryButton
                    onClick={onClickSecondaryButton}
                >
                    {locales.videoPlayer.modal.custom}
                </VideoModalHeaderSecondaryButton>
            </VideoModalHeader>
            {rates.map((rateItem) => {
                return (
                    <VideoModalItem
                        onClick={() => {
                            slowMotion(rateItem);
                            onClickMainButton();
                        }}
                    >
                        {rateItem === rate ? (
                            <ModalItemTitle>
                                *{' '}
                                {rateItem === 1
                                    ? locales.videoPlayer.modal.normal
                                    : rateItem}
                            </ModalItemTitle>
                        ) : (
                            <ModalItemTitle>
                                {rateItem === 1
                                    ? locales.videoPlayer.modal.normal
                                    : rateItem}
                            </ModalItemTitle>
                        )}
                    </VideoModalItem>
                );
            })}
        </>
    );
};

export default PlaybackSpeedContainer;
