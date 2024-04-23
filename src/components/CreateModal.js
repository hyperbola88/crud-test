import React, { useState, useEffect } from "react";

const CreateModal = ({ onCreate, onClose, selectedUser }) => {
  const [createdTitle, setCreatedTitle] = useState("");
  const [createdBody, setCreatedBody] = useState("");

  const handleTitleCreate = (e) => {
    setCreatedTitle(e.target.value);
    localStorage.setItem("title", e.target.value);
  };

  const handleBodyCreate = (e) => {
    setCreatedBody(e.target.value);
    localStorage.setItem("body", e.target.value);
  };

  const createRandomId = () => {
    return Math.floor(Math.random() * 1000) + 1;
  };

  const handleCreate = () => {
    onCreate({
      id: createRandomId(),
      userId: selectedUser.id,
      title: createdTitle,
      body: createdBody,
    });
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content" onClick={e => e.stopPropagation}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Create Post</h2>
        <input
          type="text"
          value={createdTitle}
          onChange={handleTitleCreate}
          placeholder="Enter title"
          required
        />
        <textarea
          value={createdBody}
          onChange={handleBodyCreate}
          placeholder="Enter post"
          required
        />
        <div className="button-group">
          <button onClick={handleCreate}>Create post!</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
