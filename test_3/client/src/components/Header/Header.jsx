import React, { useState } from 'react';

import './Header.css';

import avatar from '../../image/Vector.svg';
import search from '../../image/Search.svg';
import PopupHeader from '../Popup/PopupHeader/PopupHeader';

const Header = ({
  inputSearch,
  setInputSearch,
  createTodo,
  name,
  setName,
  description,
  setDescription,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const changePopup = () => {
    setIsOpen(!isOpen);
  };
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
      <button onClick={changePopup} className="header__button">
        Создать задачу
      </button>
      <img src={avatar} className="header__avatar" alt="Аватар" />
      <PopupHeader
        isOpen={isOpen}
        changePopup={changePopup}
        createTodo={createTodo}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default Header;
