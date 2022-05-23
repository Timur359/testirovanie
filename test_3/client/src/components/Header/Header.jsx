import React from 'react';

import './Header.css';

import avatar from '../../image/Vector.svg';
import search from '../../image/Search.svg';

const Header = ({ inputSearch, setInputSearch }) => {
  //Получение данных из инпута
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <div className="header">
      <div className="header__search">
        <img className="header__search_icon" src={search} alt="Иконка" />
        <input
          value={inputSearch}
          onChange={(e) => handleChange(e)}
          className="header__search_input"
          placeholder="Поиск"
        />
      </div>
      <img src={avatar} className="header__avatar" alt="Аватар" />
    </div>
  );
};

export default Header;
