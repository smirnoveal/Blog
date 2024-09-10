import React, { useState } from 'react';
import './AddPostForm.css';

const AddPostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost({ title, description, category });
    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Название" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Текст" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Категория" 
        value={category} 
        onChange={e => setCategory(e.target.value)} 
        required 
      />
      <button type="submit">РАЗМЕСТИТЬ</button>
    </form>
  );
};

export default AddPostForm;