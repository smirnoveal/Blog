import React, { useState } from 'react';
import './AuthForm.css';

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Логин" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default RegisterForm;