import React, { useState, useEffect } from "react";
import Like from "../like/Like";
import "./comments.css";

const Comment = ({ comment, post, token, user }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  // Get all data
  useEffect(() => {
    if (token) {
      fetch(`/likes?commentId=${comment._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          setLikeCount(data.likes.length);
          // filter by signed-in user
          const filteredLikes = data.likes.filter((like) => {
            return like.userId === user._id;
          });
          if (filteredLikes.length > 0) {
            setLiked(true);
          }
        });
    }
  }, [likeCount]);

  const handleLikeClick = (event) => {
    event.preventDefault();
    if (token) {
      const likeData = {
        userId: user._id,
        commentId: comment._id,
      };
      // handle change of route
      let method = "POST";
      if (liked) {
        method = "DELETE";
      }
      fetch("/likes", {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(likeData),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log("like successfully added");
            return response.json();
          } else {
            console.log("like not successfully added");
          }
        })
        .then((data) => {
          setLikeCount(data.likes.length);
          const filteredLikes = data.likes.filter((like) => {
            return like.userId === user._id;
          });
          if (filteredLikes.length > 0) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        });
    } else {
      console.log("No token!");
    }
  };

  const postedAt = new Date(comment.createdAt);
  const formattedDate = `${postedAt.toDateString()} 
  ${String(postedAt.getHours().toPrecision().padStart(2, "0"))}:${String(
    postedAt.getMinutes().toPrecision().padStart(2, "0")
  )}`;

  return (
    <div className="comment">
      <img className="avatar" src={post.user?.photo} />
      <div>
        <div className="details">
          <p className="username">{comment.user.username}</p>
          <p>{comment.content}</p>
        </div>
        <div className="info">
          <p>{formattedDate}</p>
          <p onClick={handleLikeClick} className="like">
            {liked ? "Unlike" : "Like"}
          </p>
          <Like likeCount={likeCount} />
        </div>
      </div>
    </div>
  );
};
export default Comment;
