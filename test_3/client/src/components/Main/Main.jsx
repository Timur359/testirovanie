import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

import Header from '../Header/Header';
import List from '../List/List';
import NavBar from '../NavBar/NavBar';

import './Main.css';

export const base_url = 'http://localhost:8080/api/todos';

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [selectCategory, setSelectCategory] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [list, setList] = useState([]);
  const [todayTodo, setTodayTodo] = useState(false);
  const [date, setDate] = useState('');
  const [sortDate, setSortDate] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const debouncedInputSearch = useDebounce(inputSearch, 500);

  //Получение данных

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(base_url);
        setTodos(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [sortDate]);

  const createTodo = async () => {
    try {
      const newTodo = await axios.post(base_url, {
        name,
        description,
        date: new Date(),
        performance: false,
      });
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Сортировка списка по дате (от меньшего к большему)

  const handleSortDate = () => {
    setSortDate(!sortDate);
  };

  //Слушатель чекбокса "Только невыполненные"

  const handleSelectCategory = () => {
    setSelectCategory(!selectCategory);
  };

  //Слушатель кнопки на сегодня

  const handleTodayTodo = () => {
    setTodayTodo(!todayTodo);
  };

  //Слушатель выбранной даты

  const handleSelectDate = () => {
    setSelectDate(!selectDate);
  };

  //Реализация фильтрации

  const applyFilters = () => {
    let updateList = todos;

    //Отображение чекбокса "Только невыполненные"

    if (selectCategory) {
      updateList = updateList.filter((todo) => todo.perfomance === false);
    }

    //Работа поиска дел

    if (inputSearch && debouncedInputSearch) {
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

    //Сортировка дат (срабатывает после ререндера. В процессе исправления)
    if (sortDate) {
      updateList = updateList.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      console.log(updateList);
    }
    setList(updateList);
  };

  useEffect(() => {
    applyFilters();
  }, [
    sortDate,
    selectCategory,
    inputSearch,
    todayTodo,
    selectDate,
    date,
    todos,
  ]);

  return (
    <div className="main">
      <Header
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        createTodo={createTodo}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
      />
      <NavBar
        todos={todos}
        setList={setList}
        handleSelectCategory={handleSelectCategory}
        handleTodayTodo={handleTodayTodo}
        setDate={setDate}
        handleSelectDate={handleSelectDate}
      />
      {list.length > 0 ? (
        <List todos={list} setTodos={setList} handleSortDate={handleSortDate} />
      ) : (
        <h1>По данным параметрам ничего не найдено</h1>
      )}
    </div>
  );
};

export default Main;
