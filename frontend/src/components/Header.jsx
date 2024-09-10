import React from 'react';

const Header = ({ onLogout, isLoggedIn }) => (
  <header>
    <h1>Мой Блог</h1>
    {isLoggedIn && <button className={'red'} onClick={onLogout}>Выход</button>}
  </header>
);

export default Header;