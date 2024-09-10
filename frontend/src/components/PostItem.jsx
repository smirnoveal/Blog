import React from 'react';
import './PostItem.css';

const PostItem = ({ post, onPostSelect, onLike, onDislike }) => (
  <div className="post-item">
    <h2 onClick={() => onPostSelect(post.id)}>{post.title}</h2>
    <p>{post.description}</p>
    <button onClick={() => onLike(post.id)}>👍 {post.likes}</button>
    <button onClick={() => onDislike(post.id)}>👎 {post.dislikes}</button>
  </div>
);

export default PostItem;