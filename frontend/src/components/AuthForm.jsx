import React, { useState } from 'react';
import './AuthForm.css';
import axios from "axios";

const AuthForm = ({ onLogin }) => {
    const [isRegistration, setIsRegistration] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isRegistration) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/register/',formData)
            if(response.status === 201) {
                localStorage.setItem('user-token', response.data.token)
                onLogin({ username, password }, false);
            }
        } catch (e) {
            alert('Ошибка регистрации')
            console.log(e)
        }

    } else {
        onLogin({ username, password });
    }
    setUsername('');
    setPassword('');
  };

  return (
      <>
          <form onSubmit={handleSubmit}>
              <h1>{isRegistration ? 'Регистрация' : 'Авторизация'}</h1>
              <input
                  type="text"
                  placeholder="Login"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
              />
              <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
              />
              <button type="submit">{isRegistration ? 'Зарегистрироваться' : 'Войти'}</button>
          </form>
          {!isRegistration
              ? <button className={'linkBtn'} onClick={()=> setIsRegistration(true)}>Регистрация</button>
              : <button className={'linkBtn'} onClick={()=> setIsRegistration(false)}>Авторизация</button>}
      </>
  );
};

export default AuthForm;