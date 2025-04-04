import React, { useState } from "react";
import { likePost, unlikePost } from "../../lib/like";

const Like = ({ id }) => {
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (await likePost(userId, id)) {
      setLiked(true);
    }
  };

  const handleUnlike = async () => {
    if (await unlikePost(userId, id)) {
      setLiked(false);
    }
  };

  return (
    <button className="text-sm text-gray-200" onClick={liked ? handleUnlike : handleLike}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill={liked ? "red" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-heart"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
};

export default Like;