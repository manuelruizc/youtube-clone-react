import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATES } from "../../helpers/helpers";
import language from "../../helpers/languages";
import locales from "../../locales/trending";
import "./trending.scss";
import TrendingItems from "./TrendingItems";

const hl = language[1];

const Trending = (props) => {
  const { history } = props;
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.darkTheme);
  useEffect(() => {
    document.title = locales.title + " - CloneTube";
    const token = localStorage.getItem("jwt_token");
    const options = token
      ? { headers: { Authorization: `Bearer ${token}`, hl } }
      : { hl };
    const { LOADING_COMPLETE, LOADING } = LOADING_STATES;
    dispatch({ type: "UPDATE_LOADING_STATE", payload: LOADING });
    axios
      .get("/trending", options)
      .then((response) => {
        setVideos(response.data);
        dispatch({ type: "UPDATE_LOADING_STATE", payload: LOADING_COMPLETE });
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div
      className={
        darkTheme
          ? "trending-container"
          : "trending-container trending-container--light-theme"
      }
    >
      <TrendingItems history={history} videos={videos} />
    </div>
  );
};

export default Trending;
