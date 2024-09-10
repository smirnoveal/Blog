import React from 'react';
import CommentList from './CommentList';
import './PostDetailModal.css';

const PostDetailModal = ({ post, comments, onClose }) => (
  <>
    <div className="overlay" onClick={onClose}></div>
    <div className="modal">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={onClose}>Close</button>
      <CommentList comments={comments} />
    </div>
  </>
);

export default PostDetailModal;