import React, { useEffect, useState } from "react";
import { getVideoComments } from "../../helpers/helpers";
import VideoComments from "./Comment";
import CommentForm from "./CommentForm";
import locales from "../../locales/comments";

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState([{ total: 0 }]);
  useEffect(() => {
    (async () => {
      const response = await getVideoComments(videoId);
      const { comments, totalComments } = response.data;
      setComments(comments);
      setTotalComments(totalComments);
    })();
  }, [videoId]);
  return (
    <>
      <VideoCommentsData numberOfComments={totalComments} />
      <CommentForm
        updateComments={setComments}
        comments={comments}
        videoId={videoId}
      />
      <VideoComments updateComments={setComments} comments={comments} />
    </>
  );
};

const VideoCommentsData = ({ numberOfComments }) => {
  return (
    <div className="comments-data-container">
      <span className="comments-total">
        {locales.title.totalComments(numberOfComments[0].total)}
      </span>
    </div>
  );
};

export default CommentSection;
