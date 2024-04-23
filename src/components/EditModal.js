import React, { useState, useEffect } from "react";

const EditModal = ({ post, onClose, onSave }) => {
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setEditedBody(e.target.value); 
  };

  const handleSave = () => {
    onSave({ ...post, title: editedTitle, body: editedBody });
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
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Post</h2>
        <input
          type="text"
          value={editedTitle}
          onChange={handleTitleChange}
          placeholder="Enter title"
        />
        <textarea
          value={editedBody}
          onChange={handleBodyChange}
          placeholder="Enter body"
        />
        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
