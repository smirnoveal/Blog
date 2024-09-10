import React, { useState } from 'react';
import './PostItem.css';

const PostItem = ({ post, onPostSelect, onLike, onDislike, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedDescription, setEditedDescription] = useState(post.description);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(post.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className="post-item">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input 
            type="text" 
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)} 
            required 
          />
          <textarea 
            value={editedDescription} 
            onChange={(e) => setEditedDescription(e.target.value)} 
            required 
          />
          <button type="submit">Сохранить</button>
          <button type="button" onClick={() => setIsEditing(false)}>Отмена</button>
        </form>
      ) : (
        <>
          <h2 onClick={() => onPostSelect(post.id)}>{post.title}</h2>
          <p>{post.description}</p>
          <div className="edit-buttons">
            <button onClick={() => setIsEditing(true)}>Редактировать</button>
            <button onClick={() => onDelete(post.id)}>Удалить</button>
          </div>
          <button onClick={() => onLike(post.id)}>👍 {post.likes}</button>
          <button onClick={() => onDislike(post.id)}>👎 {post.dislikes}</button>
        </>
      )}
    </div>
  );
};

export default PostItem;