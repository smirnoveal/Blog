import React from 'react';

const CommentItem = ({ comment }) => (
  <div>
    <p>{comment.text}</p>
    <small>{comment.author}</small>
  </div>
);

export default CommentItem;