import React from "react";

const PostDetails = ({
  post,
  onEditClick,
  onDeleteClick,
  onBackToListClick,
  selectedUser,
}) => {
  return (
    <div className="post-details">
      <button onClick={onBackToListClick}>Back to User's Posts</button>
      <h2>{`${selectedUser.name} wrote:`}</h2>
        <div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <div className="button-group">
            <button onClick={() => onEditClick(post)}>Edit</button>
            <button onClick={() => onDeleteClick(post.id)}>Delete Post</button>
          </div>
        </div>
    </div>
  );
};

export default PostDetails;
