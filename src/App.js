import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import EditModal from "./components/EditModal";
import CreateModal from "./components/CreateModal";


const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [createPost, setCreatePost] = useState(false);
  const [createdPost, setCreatedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedPost, setEditedPost] = useState(null);


  //Fetching user's list
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  //Fetching user's posts list
  useEffect(() => {
    if (selectedUser) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`
      )
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  }, [selectedUser]);

   //Cheking if user of post has been selected previously
   useEffect(() => {
    const storedSelectedUserId = localStorage.getItem("selectedUserId");
    const storedSelectedPostId = localStorage.getItem("selectedPostId");
    if (storedSelectedUserId) {
      setSelectedUser(JSON.parse(storedSelectedUserId));
    }
    if (storedSelectedPostId) {
      setSelectedPost(JSON.parse(storedSelectedPostId));
    }
  }, []);

  //Sending create post request
  const handleCreatePost = (post) => {
    console.log("button create", selectedUser.id);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        post,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error("Error creating post:", error));
    setCreatedPost(post);
    setPosts([...posts, post]);
  };

  //Sending post edit request
  const handleSaveEdit = (editedPost) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${editedPost.id}`, {
      method: "PUT",
      body: JSON.stringify(editedPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post updated successfully:", data);
        handleCloseModal();
      })
      .catch((error) => console.error("Error updating post:", error));
    setShowModal(false);
    localStorage.removeItem("body", "title");
    localStorage.setItem("selectedPostId", JSON.stringify(editedPost));
    setSelectedPost(editedPost); 
  };

  //Sending delete post request
  const handleDeletePost = (postId) => {
    console.log(postId);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    });
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setSelectedPost(null);
    localStorage.clear();
  };


  //Handling all clicks
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSelectedPost(null);
    setShowModal(false);
    localStorage.setItem("selectedUserId", JSON.stringify(user));
    localStorage.removeItem("selectedPostId");
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    localStorage.setItem("selectedPostId", JSON.stringify(post));
    setShowModal(false);
  };

  const handleEditClick = (post) => {
    setEditedPost(post);
    setShowModal(true);
  };

  const handleBackToListClick = () => {
    setSelectedPost(false);
    localStorage.removeItem("selectedPostId");
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.removeItem("post");
  };

  const handleCreateClick = () => {
    setCreatePost(true);
  };

  const handleCloseCreate = () => {
    setCreatePost(false);
    setCreatedPost(null);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <UserList users={users} selectedUser={selectedUser} onClick={handleUserClick} />
          </div>
          <div className="col-md-8">
            {!selectedPost && (
              <PostList
                posts={posts}
                selectedPost={selectedPost}
                onClick={handlePostClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeletePost}
                selectedUser={selectedUser}
              />
            )}
            {selectedPost && (
              <PostDetails
                post={selectedPost}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeletePost}
                onBackToListClick={handleBackToListClick}
                selectedUser={selectedUser}
              />
            )}
            {!selectedPost && (
              <button onClick={handleCreateClick}>Create new post!</button>
            )}
            {showModal && (
              <EditModal
                post={editedPost}
                onClose={handleCloseModal}
                onSave={handleSaveEdit}
              />
            )}
            {createPost && (
              <CreateModal
                onCreate={handleCreatePost}
                onClose={handleCloseCreate}
                selectedUser={selectedUser}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
