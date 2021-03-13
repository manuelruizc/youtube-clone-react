export const toggleTheme = () => {
    return {
        type: 'TOGGLE_DARKTHEME',
    };
};

export const mutateRelatedVideos = (payload) => {
    return {
        type: 'GET_RELATEDVIDEOS',
        payload,
    };
};

export const toggleAutoplay = () => {
    return {
        type: 'TOGGLE_AUTOPLAY',
    };
};

export const updateAuthUserData = (payload) => {
    return {
        type: 'UPDATE_USERDATA',
        payload,
    };
};

export const toggleSidenav = (payload = null) => {
    return {
        type: 'TOGGLE_SIDENAV',
        payload,
    };
};

export const toggleSidenavHome = () => {
    return {
        type: 'TOGGLE_SIDENAV-HOME',
    };
};

export const updateVideoEnded = (payload) => {
    return {
        type: 'UPDATE_VIDEOENDED',
        payload,
    };
};

export const updateHomeSearch = (payload) => {
    return {
        type: 'UPDATE_HOMESEARCH',
        payload,
    };
};

export const updateVideoThumb = (payload) => {
    return {
        type: 'UPDATE_THUMBACTIVE',
        payload,
    };
};

export const updateCurrentVideoData = (payload) => {
    return {
        type: 'UPDATE_CURRENT_VIDEO_DATA',
        payload,
    };
};

export const updateLoadingState = (payload) => {
    return {
        type: 'UPDATE_LOADING_STATE',
        payload,
    };
};

export const updateVisitorModal = (payload) => {
    return {
        type: 'UPDATE_VISITOR_MODAL',
        payload,
    };
};

export const updatePlaylists = (payload) => {
    return {
        type: 'UPDATE_PLAYLISTS',
        payload,
    };
};

export const addToastNotification = (payload) => {
    return {
        type: 'ADD_TOAST_NOTIFICATION',
        payload,
    };
};
export const removeLastToastNotification = () => {
    return {
        type: 'REMOVE_TOAST_NOTIFICATION',
    };
};
export const updateSearchResults = (payload) => {
    return {
        type: 'UPDATE_SEARCH_RESULTS',
        payload,
    };
};
export const toggleTheaterMode = () => {
    return {
        type: 'UPDATE_THEATER_MODE',
    };
};
export const updateVideoChapters = () => {
    return {
        type: 'UPDATE_VIDEO_CHAPTERS',
    };
};
