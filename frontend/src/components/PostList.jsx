import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, onPostSelect, onLike, onDislike }) => (
  <div className={'list'}>
    {posts.map(post => (
      <PostItem 
        key={post.id} 
        post={post} 
        onPostSelect={onPostSelect}
        onLike={onLike}
        onDislike={onDislike}
      />
    ))}
  </div>
);

export default PostList;