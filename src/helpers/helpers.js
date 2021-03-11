import axios from "axios";
import firebase from "firebase";
import moment from "moment";
import { updateVisitorModal } from "../actions/darkTheme";
import { host } from "../credentials/credentials";
import language from "../helpers/languages";
import extraLocales from "../locales/miniatureplayer";

const hl = language[1];

const token = localStorage.getItem("jwt_token");
const options = token
  ? { headers: { Authorization: `Bearer ${token}`, hl } }
  : { hl };

/**
 *
 * Gets videos info as title, url, views, likes, dislikes, etc.
 *
 * @param {number} id
 * @returns {array}
 *
 */
export const _getVideoRequest = async (id) => {
  return axios.get(`scrape/${id}`);
};

export const _getHomePageData = async () => {
  try {
    const url = new URL(`${host}/homepage`);
    const token = localStorage.getItem("jwt_token");
    // const options = token ? { headers: { 'Authorization' : `Bearer ${token}` } } : {};
    const headers = token ? { Authorization: `Bearer ${token}`, hl } : { hl };
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers,
      // // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const response_info = response;
    const data = await response.json();
    return {
      response_info,
      data,
    };
  } catch (e) {
    return {
      error: true,
      errorOnServer: true,
      errorMessage: e,
      response_info: null,
      data: null,
    };
  }
};

/**
 *
 * Gets videos info as title, views, likes, dislikes, etc.
 *
 * @param {number} id
 * @returns {array}
 *
 */
export const _getVideoInfo = async (id) => {
  return axios.get(`video_info/${id}`);
};

/**
 *
 * Gets videos sources.
 *
 * @param {number} id
 * @returns {array}
 *
 */
export const _getVideoSource = async (id) => {
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? { headers: { Authorization: `Bearer ${token}`, hl } }
    : { hl };
  return axios.get(`video_formats/${id}`, options);
};

export const _addVideoToHistorial = async (video_info, uid) => {
  const {
    video_id,
    video_title,
    video_channel,
    thumbnail,
    video_duration,
    current_length,
    length,
  } = video_info;
  return axios.post(`database/watch_history/add_video_to_history/${uid}`, {
    video_id,
    video_title,
    video_channel,
    thumbnail,
    video_duration,
    current_length,
    length,
  });
};

export const searchSuggestion = async (search_query) => {
  return axios.get(`search_suggestion/${search_query}`);
};

export const getDatabasePlaylists = async (uid) => {
  return axios.get(`database/user_playlists/get_playlists/reverse/${uid}`);
};

export const getVideoHistory = async (uid, limit, term = null) => {
  if (term)
    return axios.get(
      `database/watch_history/get_historial_videos/${uid}/${limit}/${term}`
    );
  return axios.get(
    `database/watch_history/get_historial_videos/${uid}/${limit}`
  );
};

export const getVideosFromPlaylist = async (search) => {
  return axios.get(`database/user_playlists/get_playlists_videos/${search}`);
};

export const deletePlaylist = async (playlist_id) => {
  return axios.delete(`database/user_playlists/delete_playlist`, {
    data: {
      playlist_id,
    },
  });
};

export const deleteVideoFromPlaylist = async (uid, playlist_id, video_id) => {
  return axios.post(`database/user_playlists/delete_from_playlist`, {
    uid,
    playlist_id,
    video_id,
  });
};

// RELATED VIDEOS
export const addVideoToPlaylist = async (video_object) => {
  const {
    uid,
    videoid,
    title,
    uploader,
    length_seconds,
    playlistName,
    type,
    thumbnail,
  } = video_object;
  return axios.post(`database/user_playlists/add_to_playlist`, {
    uid,
    videoid,
    title,
    uploader,
    videoDuration:
      typeof length_seconds === "string"
        ? length_seconds
        : convertMinsSecs(length_seconds * 1000, length_seconds),
    playlistName,
    type,
    thumbnail,
  });
};

// SEARCH RESULTS
export const searchVideos = async (search_query) => {
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? { headers: { Authorization: `Bearer ${token}`, hl } }
    : { hl };
  return axios.get(`search/${search_query}`, options);
};

// ADD TO PLAYLIST MODAL
export const getUserPlaylists = async (uid) => {
  return axios.get(`database/user_playlists/get_playlists/${uid}`);
};

export const checkIfVideoExistsInPlaylist = async (uri, uid) => {
  return axios.get(
    `database/user_playlists/is_video_on_playlists/${uri}/${uid}`
  );
};

export const addVideoToExistingPlaylist = async (uid, video_object) => {
  let {
    videoid,
    title,
    uploader,
    videoDuration,
    playlistName,
    thumbnail,
  } = video_object;
  return axios.post(
    `database/user_playlists/add_video_to_existing_playlist/${uid}`,
    { videoid, title, uploader, videoDuration, playlistName, thumbnail }
  );
};

export const deleteVideoFromExistingPlaylist = async (uid, video_object) => {
  let { videoid, playlistName } = video_object;
  return axios.post(
    `database/user_playlists/delete_video_from_existing_playlist/${uid}`,
    { videoid, playlistName }
  );
};

// DOWNLOAD MODAL
export const addDownloadCounter = async () => {
  return axios.post(`database/add_download/${this.props.user.uid}`);
};

// SEARCH HISTORY API CALLS
export const insertSearchTerm = async (term, uid) => {
  return axios.post(`database/search_history/insert_term/${term}`, {
    uid,
  });
};

export const getSearchHistory = async () => {
  return axios.get(`database/search_history/history`, options);
};

export const deleteTerm = async (uid, term, term_id) => {
  return axios.delete(`database/search_history/delete_term/${term}`, {
    data: {
      uid,
      term_id,
    },
  });
};

export const clearAllSearchHistory = async (uid) => {
  return axios.delete(`database/search_history/clear_search_history`, {
    data: {
      uid,
    },
  });
};

// SEARCH HISTORY CALLS

// LIKED VIDEOS CALLS
export const getUserLikedVideosPlaylist = async () => {
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  return axios.get(`database/liked_videos/get_user_liked_videos`, options);
};

export const removeLikedVideo = async (uid, playlist_id, video_id) => {
  return axios.put("database/liked_videos/remove_liked_video", {
    uid,
    playlist_id,
    video_id,
  });
};
// LIKED VIDEOS CALLS

// WATCH HISTORY
export const searchUserHistoryByTerm = async (term, uid) => {
  return axios.post(`database/watch_history/search_videos_by_term/${term}`, {
    uid,
  });
};
export const clearAllWatchHistory = async (uid) => {
  return axios.delete(`database/watch_history/clear_watch_history`, {
    data: {
      uid,
    },
  });
};
// WATCH HISTORY

// USER LIBRARY
export const getLibraryUserInfo = async (uid) => {
  return axios.get(`database/user_library/user_info/${uid}`);
};
export const getLibraryData = async (uid) => {
  return axios.get(`database/user_library/last_history_videos/${uid}`);
};
// USER LIBRARY

// USER SUBSCRIPTIONS
export const subscribeToAChannel = async (
  uid,
  channel_id,
  channel_name,
  channel_thumbnail,
  is_subscribed
) => {
  return axios.post("database/user_subscriptions/subscribe", {
    uid,
    channel_id,
    channel_name,
    is_subscribed,
    channel_thumbnail,
  });
};
export const getUserSubscriptions = async (uid) => {
  return axios.get(`database/user_subscriptions/get_subscriptions/${uid}`);
};
export const isUserSubscribed = async (uid, cid) => {
  return axios.get(
    `database/user_subscriptions/is_user_subscribed/${uid}/${cid}`
  );
};
// USER SUBSCRIPTIONS

export const reportBug = async (info, error, href) => {
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? { headers: { Authorization: `Bearer ${token}`, hl } }
    : { hl };
  return axios.post(
    "database/bug_reporting/report_bug",
    { info, error, href },
    options
  );
};

// USER COMMENTS
export const getVideoComments = async (video_id) => {
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  return axios.get(
    "database/user_comments/get_video_comments/" + video_id,
    options
  );
};
export const voteComment = async (uid, comment_id, is_liked, is_disliked) => {
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          uid,
          comment_id,
          is_liked,
          is_disliked,
        },
      }
    : {
        data: {
          uid,
          comment_id,
          is_liked,
          is_disliked,
        },
      };
  return axios.post("database/user_comments/vote_comment", options);
};

export const deleteComment = (comment_id) => {
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
  return axios.delete(
    "database/user_comments/delete_comment/" + comment_id,
    options
  );
};

export const commentVideo = (userData) => {
  const data = userData;
  const token = localStorage.getItem("jwt_token");
  const options = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      }
    : {};
  return axios.post("database/user_comments/comment_video", options);
};

/**
 * Convert Minutes to a formatted string time (mm:ss).
 *
 * @param {number} time
 * @param {number} duration
 * @returns {string}
 *
 */
export const convertMinsSecs = (time, duration) => {
  if (duration >= 3600) {
    let ms = time % 1000;
    time = (time - ms) / 1000;
    let secs = time % 60;
    time = (time - secs) / 60;
    let mins = time % 60;
    let hrs = (time - mins) / 60;

    return `${hrs < 10 ? hrs : hrs}:${mins < 10 ? `0${mins}` : mins}:${
      secs < 10 ? `0${secs}` : secs
    }`;
  }

  let ms = time % 1000;
  time = (time - ms) / 1000;
  let secs = time % 60;
  time = (time - secs) / 60;
  let mins = time % 60;

  secs = secs < 10 ? `0${secs}` : secs;

  return `${mins}:${secs}`;
};

export const LOADING_STATES = {
  NOT_LOADING: 0,
  LOADING: 1,
  LOADING_COMPLETE: 2,
};

export const UserNotLoggedIn = () => {
  updateVisitorModal();
};

const secondsAndMinutesFormatting = (date_difference) => {
  let date_difference_formated = "";
  const time_amount = moment.duration(date_difference);
  if (date_difference < 60000) {
    date_difference_formated = `${time_amount.seconds()} ${
      time_amount.seconds() > 1 ? "seconds" : "second"
    }`;
  } else if (date_difference < 3600000 && date_difference >= 60000) {
    date_difference_formated = `${time_amount.minutes()} ${
      time_amount.minutes() > 1 ? "minutes" : "minute"
    }`;
  } else if (date_difference < 86400000 && date_difference >= 3600000) {
    date_difference_formated = `${time_amount.hours()} ${
      time_amount.hours() > 1 ? "hours" : "hour"
    }`;
  } else if (date_difference >= 86400000 && date_difference < 2629800000) {
    date_difference_formated = `${time_amount.days()} ${
      time_amount.days() > 1 ? "days" : "day"
    }`;
  } else if (date_difference < 31556952000 && date_difference >= 2629800000) {
    date_difference_formated = `${time_amount.months()} ${
      time_amount.months() > 1 ? "months" : "month"
    }`;
  } else {
    date_difference_formated = `${time_amount.year()} ${
      time_amount.years() > 1 ? "years" : "year"
    }`;
  }
  return date_difference_formated;
};

const daysAndMonthsFormatting = (date_difference) => {
  let date_difference_formated = "";
  const time_amount = moment.duration(date_difference);
  if (date_difference < 86400000) {
    date_difference_formated = "today";
  } else if (date_difference >= 86400000 && date_difference < 2629800000) {
    date_difference_formated = `${time_amount.days()} ${
      time_amount.days() > 1 ? "days" : "day"
    } ago`;
  } else if (date_difference < 31556952000 && date_difference >= 2629800000) {
    date_difference_formated = `${time_amount.months()} ${
      time_amount.months() > 1 ? "months" : "month"
    } ago`;
  } else {
    date_difference_formated = `${time_amount.years()} ${
      time_amount.years() > 1 ? "years" : "year"
    } ago`;
  }
  return date_difference_formated;
};

export const agoFormatting = (updatedAt, secondsAndMinutes = true) => {
  const getDate = new Date(updatedAt);
  let updatedAtMoment = moment(getDate).utcOffset(0);
  let currentDate = moment(new Date()).utcOffset(0);
  const _updated = moment(updatedAtMoment._d);
  const _current = moment(currentDate._i);
  // let moment_date = moment(updatedAt).utcOffset(0);
  // moment_date = secondsAndMinutes ? moment_date : moment_date.startOf("day");
  const date_difference = _current.diff(_updated);
  let date_difference_formated = secondsAndMinutes
    ? secondsAndMinutesFormatting(date_difference)
    : daysAndMonthsFormatting(date_difference);

  return date_difference_formated;
};

export const KiloFormatting = (number) => {
  if (number !== undefined) {
    if (number < 1000) {
      return number;
    } else if (number >= 1000 && number < 10000) {
      number = String(number);
      return `${number.substr(0, 1)}.${number.substr(1, 1)}K`;
    } else if (number >= 10000 && number < 1000000) {
      number = String(number);
      return number.length < 6
        ? `${number.substr(0, 2)}K`
        : `${number.substr(0, 3)}K`;
    } else if (number >= 1000000 && number < 10000000) {
      number = String(number);
      return `${number.substr(0, 1)}.${number.substr(1, 1)}M`;
    } else if (number > 10000000) {
      number = String(number);
      return `${number.substr(0, 2)}M`;
    } else {
      number = String(number);
      return `${number}`;
    }
  }
  return number;
};

export const commaFormatting = (number) => {
  if (number !== undefined) {
    if (number < 1000) {
      return number;
    } else if (number >= 10000 && number < 1000000) {
      number = String(number);
      return number.length < 6
        ? `${number.substr(0, 2)},${number.substr(2, 3)}`
        : `${number.substr(0, 3)},${number.substr(3, 3)}`;
    } else if (number >= 1000000 && number < 1000000000) {
      number = String(number);
      return `${number.substr(0, 1)}.${number.substr(1, 1)}M`;
    } else {
      number = String(number);
      return `${number}`;
    }
  }
  return number;
};

export const ownerBadgeText = (owner_badges) => {
  return owner_badges[0].metadataBadgeRenderer.style ===
    "BADGE_STYLE_TYPE_VERIFIED_ARTIST"
    ? extraLocales.tooltip.music
    : extraLocales.tooltip.verified;
};

export const login = () => {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {});
};
