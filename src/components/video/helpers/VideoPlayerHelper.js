import axios from "axios";

export const openFullscreen = (videoContainer) => {
  const fullscreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  if (fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
      /* Firefox */
      videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
      /* IE/Edge */
      videoContainer.msRequestFullscreen();
    }
  }
};

export const rangeUpdate = (state) => {
  const { video, rangeInp, progress, totalDuration, currentVideoTime } = state;
  rangeInp.value = video.currentTime;
  const { duration, currentTime } = video;
  const percentage = (100 / duration) * currentTime;
  progress.style.width = `${percentage}%`;
};
export const convertMinsSecs = (time) => {
  let ms = time % 1000;
  time = (time - ms) / 1000;
  let secs = time % 60;
  time = (time - secs) / 60;
  let mins = time % 60;

  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;

  return `${mins}:${secs}`;
};

export const getVideoInfo = (id, self) => {
  axios
    .get(`http://localhost:5500/video_info/${id}`)
    .then(function (response) {
      const data = response.data[0];
      self.setState({
        likes: data.likes,
        dislikes: data.dislikes,
        views: data.views,
        title: data.title,
        description: data.description,
        uploader: data.user,
        thumb: data.thumb,
        date: data.date,
      });
      document.title = data.title;
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    })
    .finally(function () {
      // always executed
    });
};

export const getVideoSource = (id, self) => {
  document.body.style = "overflow:hidden";
  window.scrollTo({ top: 0 });
  axios
    .get(`http://localhost:5500/video_formats/${id}`)
    .then(function (response) {
      const { video, rangeInp } = self.state;
      video.src = response.data.formats[1].url;
      self.setState({ uri: response.data.formats[1].url });
      video.onloadedmetadata = () => {
        rangeInp.min = 0;
        rangeInp.max = video.duration;
        video.play();
        document.body.style = "overflow:inherit";
        self.setState({ isVideoLoaded: true });
      };

      video.ontimeupdate = () => {
        self.setState({
          videoDuration: video.currentTime,
        });
      };
    })
    .catch(function (error) {
      // handle error
      console.error(error);
    })
    .finally(function () {
      // always executed
    });
};

export const videoFragmentation = (number, state) => {
  const { video } = state;
  if (number === 0) {
    video.currentTime = 0;
  } else {
    const videoFragmentationDuration = (video.duration / 10) * number;
    video.currentTime = videoFragmentationDuration;
  }
};

export const playAndPauseVideo = (e, self) => {
  e.preventDefault();
  const { video, videoContent } = self.state;
  video.paused ? video.play() : video.pause();
  video.paused
    ? self.setState({ videoIsPlaying: false })
    : self.setState({ videoIsPlaying: true });
  video.paused
    ? videoContent.classList.add("opacity")
    : videoContent.classList.remove("opacity");
};

export const goToNextVideo = (history) => {
  const nextId = document
    .getElementsByClassName("videocard")[0]
    .href.substr(-11);
  history.push(`/watch?v=${nextId}`);
};

export const seekVideoTime = (forward = true, seconds = 10, self) => {
  forward
    ? (self.video.currentTime += seconds)
    : (self.video.currentTime -= seconds);
};

export const muteVideo = (self) => {
  //this.setState({isVideoMuted: !this.state.isVideoMuted});
  const { isVideoMuted, video, volumeRange } = self.state;
  if (isVideoMuted) {
    const volume = localStorage.getItem("volume");
    const valueVolume = localStorage.getItem("valueVolume");
    video.volume = volume;
    self.setState({ isVideoMuted: false, volumeValue: valueVolume });
  } else {
    localStorage.setItem("volume", video.volume);
    localStorage.setItem("valueVolume", String(volumeRange.value));
    video.volume = 0;
    self.setState({ isVideoMuted: true, volumeValue: "0" });
  }
};

export const slowMotion = (self, isSlow = true) => {
  const { video } = self.state;
  const { playbackRate } = video;
  if (isSlow) {
    const newPlayback = playbackRate - 0.25 === 0 ? 0.25 : playbackRate - 0.25;
    video.playbackRate = newPlayback;
  } else {
    const newPlayback = playbackRate + 0.25 === 2 ? 1.75 : playbackRate + 0.25;
    video.playbackRate = newPlayback;
  }
};

export const controlVideoWithKeys = (e, code = null) => {
  let keyCode = code ? code : e.keyCode;
  e.preventDefault();
  const numberCodes = {
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    96: 0,
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
  };
  let animationCodes = {
    38: "volume-up",
    40: "volume-down",
    39: "forward",
    37: "backward",
    32: this.state.videoIsPlaying ? "pause" : "play",
    77: "volume-off",
    70: "compress",
    68: "arrow-up",
    83: "arrow-down",
  };

  code = animationCodes[keyCode];
  this.setState({ animationLogo: code });

  if (keyCode === 38) {
    this._controlWithKeysAnimations();
    this.volumeOutput(5);
  } else if (keyCode === 73) {
    // Tecla I/i
    this.navigate();
  } else if (keyCode === 40) {
    this._controlWithKeysAnimations();
    this.volumeOutput(-5);
  } else if (keyCode === 39) {
    this._controlWithKeysAnimations();
    this.rangeOutput(5);
  } else if (keyCode === 37) {
    this._controlWithKeysAnimations();
    this.rangeOutput(-5);
  } else if (keyCode === 32) {
    this._controlWithKeysAnimations();
    this.playAndPauseVideo(e);
  } else if (keyCode == 77) {
    this._controlWithKeysAnimations();
    this.muteVideo();
  } else if (keyCode == 70) {
    this._controlWithKeysAnimations();
    this.openFullscreen(this.state.videoContainer.current);
  } else if (keyCode == 68) {
    this._controlWithKeysAnimations();
    this.slowMotion(false);
  } else if (keyCode == 83) {
    this._controlWithKeysAnimations();
    this.slowMotion();
  } else if (keyCode <= 57 && keyCode >= 48) {
    this.videoFragmentation(numberCodes[keyCode]);
  }
};
