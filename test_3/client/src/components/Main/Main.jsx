import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import List from '../List/List';
import NavBar from '../NavBar/NavBar';

import './Main.css';

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [selectCategory, setSelectCategory] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [list, setList] = useState([]);
  const [todayTodo, setTodayTodo] = useState(false);
  const [date, setDate] = useState('');

  //Получение данных

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          'http://localhost:8080/api/todos'
        );
        setTodos(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSelectCategory = () => {
    setSelectCategory(!selectCategory);
  };

  const handleTodayTodo = () => {
    setTodayTodo(!todayTodo);
  };

  const handleSelectDate = () => {
    setSelectDate(!selectDate);
  };

  //Реализация фильтрации

  const applyFilters = () => {
    let updateList = todos;

    //Отображение чекбокса "Только невыполненные"

    if (selectCategory) {
      updateList = updateList.filter((todo) => todo.perfomance === false);
      console.log(selectCategory);
    }

    //Работа поиска дел

    if (inputSearch) {
      updateList = updateList.filter((todo) =>
        todo.name.toLowerCase().includes(inputSearch.toLowerCase())
      );
    }

    //Работа кнопки "На сегодня"
    if (todayTodo) {
      updateList = updateList.filter((todo) => {
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
      });
    }

    //Отображение дел на определенную дату
    if (date) {
      updateList = updateList.filter((todo) => {
        let d1 = date.getDate();
        let y1 = date.getFullYear();
        let m1 = date.getMonth() + 1;
        let all1 = d1 + '' + y1 + '' + m1;
        let date2 = new Date(todo.date);
        let d2 = date2.getDate();
        let y2 = date2.getFullYear();
        let m2 = date2.getMonth() + 1;
        let all2 = d2 + '' + y2 + '' + m2;
        return all1 === all2;
      });
    }
    setList(updateList);
  };

  useEffect(() => {
    applyFilters();
  }, [selectCategory, inputSearch, todayTodo, selectDate, date, todos]);

  return (
    <div className="main">
      <Header inputSearch={inputSearch} setInputSearch={setInputSearch} />
      <NavBar
        todos={todos}
        setList={setList}
        handleSelectCategory={handleSelectCategory}
        handleTodayTodo={handleTodayTodo}
        setDate={setDate}
        handleSelectDate={handleSelectDate}
      />
      {list.length > 0 ? (
        <List todos={list} setTodos={setTodos} />
      ) : (
        <h1>По данным параметрам ничего не найдено</h1>
      )}
    </div>
  );
};

export default Main;
