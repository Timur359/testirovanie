import React, { useState } from 'react';
import Calendar from 'react-calendar';

import './NavBar.css';

const NavBar = ({
  todos,
  filterTodo,
  selectCategory,
  selectedCategory,
  setTodos,
}) => {
  //Попытки реализации функций дат и календаря

  const getTodayTodo = () => {
    setTodos(
      todos.filter((todo) => {
        let d1 = new Date().getDate();
        let y1 = new Date().getFullYear();
        let m1 = new Date().getMonth() + 1;
        let all = d1 + '' + y1 + '' + m1;
        let date2 = new Date(todo.date);
        let d2 = date2.getDate();
        let y2 = date2.getFullYear();
        let m2 = date2.getMonth() + 1;
        let all2 = d2 + '' + y2 + '' + m2;
        return all === all2;
      })
    );
  };

  const getChangeTodo = (e) => {
    setTodos(
      todos.filter((todo) => {
        let d1 = e.getDate();
        let y1 = e.getFullYear();
        let m1 = e.getMonth() + 1;
        let all1 = d1 + '' + y1 + '' + m1;
        let date2 = new Date(todo.date);
        let d2 = date2.getDate();
        let y2 = date2.getFullYear();
        let m2 = date2.getMonth() + 1;
        let all2 = d2 + '' + y2 + '' + m2;
        return all1 === all2;
      })
    );
  };

  return (
    <div className="nav-bar">
      <button className="nav-bar__button" onClick={getTodayTodo}>
        <p className="nav-bar__button_text">На сегодня</p>
      </button>
      <button className="nav-bar__button">
        <p className="nav-bar__button_text">На неделю</p>
      </button>
      <Calendar onClickDay={(e) => getChangeTodo(e)} />
      <div className="nav-bar__checkbox">
        <input
          onChange={selectCategory}
          value={selectedCategory}
          onClick={filterTodo}
          className="nav-bar__checkbox_checkbox"
          type="checkbox"
        />
        <p className="nav-bar__checkbox_text">Только невыполненные</p>
      </div>
    </div>
  );
};

export default NavBar;
