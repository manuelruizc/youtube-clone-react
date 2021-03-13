const darkTheme =
    localStorage.getItem('darkTheme') === null
        ? false
        : JSON.parse(localStorage.getItem('darkTheme'));
const autoplay =
    localStorage.getItem('autoplay') === null
        ? false
        : JSON.parse(localStorage.getItem('autoplay'));
const theater_mode =
    localStorage.getItem('theater_mode') === null
        ? false
        : JSON.parse(localStorage.getItem('theater_mode'));
// localStorage.setItem('language', '["es", "es"]');
const language = JSON.parse(localStorage.getItem('language'));

const initState = {
    darkTheme,
    relatedVideos: [],
    autoplay,
    user: null,
    sidenav: false,
    sidenavHome: true,
    videoEnded: false,
    homeSearchVideos: [],
    buffering: false,
    thumbnailVideoActive: false,
    current_video_data: null,
    loading_state: 0,
    visitor_modal_active: false,
    download_limit: false,
    playlists: [],
    toast_notifications: [],
    search_results: [],
    language,
    theater_mode,
    video_chapters: [],
};

const rootReducer = (state = initState, action) => {
    if (action.type === 'TOGGLE_DARKTHEME') {
        localStorage.setItem('darkTheme', !state.darkTheme);
        return {
            ...state,
            darkTheme: !state.darkTheme,
        };
    } else if (action.type === 'UPDATE_VISITOR_MODAL') {
        return {
            ...state,
            visitor_modal_active: !state.visitor_modal_active,
        };
    } else if (action.type === 'UPDATE_LOADING_STATE') {
        const download_limit = action.payload ? true : false;
        return {
            ...state,
            loading_state: action.payload,
            download_limit,
        };
    } else if (action.type === 'UPDATE_CURRENT_VIDEO_DATA') {
        return {
            ...state,
            current_video_data: action.payload,
        };
    } else if (action.type === 'GET_RELATEDVIDEOS') {
        return {
            ...state,
            relatedVideos: action.payload,
        };
    } else if (action.type === 'TOGGLE_AUTOPLAY') {
        localStorage.setItem('autoplay', !state.autoplay);
        return {
            ...state,
            autoplay: !state.autoplay,
        };
    } else if (action.type === 'UPDATE_USERDATA') {
        return {
            ...state,
            user: action.payload,
        };
    } else if (action.type === 'TOGGLE_SIDENAV-HOME') {
        return {
            ...state,
            sidenavHome: !state.sidenavHome,
        };
    } else if (action.type === 'TOGGLE_SIDENAV') {
        return {
            ...state,
            sidenav: action.payload === null ? !state.sidenav : false,
        };
    } else if (action.type === 'UPDATE_VIDEOENDED') {
        return {
            ...state,
            videoEnded: action.payload,
        };
    } else if (action.type === 'UPDATE_HOMESEARCH') {
        return {
            ...state,
            homeSearchVideos: action.payload,
        };
    } else if (action.type === 'UPDATE_THUMBACTIVE') {
        return {
            ...state,
            thumbnailVideoActive: action.payload,
        };
    } else if (action.type === 'UPDATE_PLAYLISTS') {
        return {
            ...state,
            playlists: action.payload,
        };
    } else if (action.type === 'ADD_TOAST_NOTIFICATION') {
        let toast_notifications = state.toast_notifications;
        toast_notifications.push(action.payload);
        return {
            ...state,
            toast_notifications: [...toast_notifications],
        };
    } else if (action.type === 'REMOVE_TOAST_NOTIFICATION') {
        let toast_notifications = state.toast_notifications;
        toast_notifications.shift();
        return {
            ...state,
            toast_notifications: [...toast_notifications],
        };
    } else if (action.type === 'UPDATE_SEARCH_RESULTS') {
        return {
            ...state,
            search_results: [...action.payload],
        };
    } else if (action.type === 'UPDATE_THEATER_MODE') {
        localStorage.setItem('theater_mode', !state.theater_mode);
        return {
            ...state,
            theater_mode: !state.theater_mode,
        };
    }

    return state;
};

export default rootReducer;
