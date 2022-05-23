import React from 'react';
import Calendar from 'react-calendar';

import './NavBar.css';

const NavBar = ({
  handleSelectCategory,
  handleTodayTodo,
  setDate,
  handleSelectDate,
}) => {
  return (
    <div className="nav-bar">
      <button className="nav-bar__button" onClick={handleTodayTodo}>
        <p className="nav-bar__button_text">На сегодня</p>
      </button>
      <button className="nav-bar__button">
        <p className="nav-bar__button_text">На неделю</p>
      </button>
      <Calendar onClickDay={handleSelectDate} onChange={(e) => setDate(e)} />
      <div className="nav-bar__checkbox">
        <input
          onClick={handleSelectCategory}
          className="nav-bar__checkbox_checkbox"
          type="checkbox"
        />
        <p className="nav-bar__checkbox_text">Только невыполненные</p>
      </div>
    </div>
  );
};

export default NavBar;
