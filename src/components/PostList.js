import React from "react";

const PostList = ({ posts, selectedPost, onClick}) => {
  return (
    <div className="post-list">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => onClick(post)} className={selectedPost && selectedPost.id === post.id ? "selected" : ""}>
            <span>{post.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;