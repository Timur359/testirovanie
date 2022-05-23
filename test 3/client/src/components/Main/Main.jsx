import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import List from '../List/List';
import NavBar from '../NavBar/NavBar';

import './Main.css';

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  const filterTodo = () => {
    setTodos(todos.filter((todo) => todo.perfomance === false));
  };

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
  }, [setTodos]);

  //Поиск

  const searchTodo = todos.filter((todo) =>
    todo.name.toLowerCase().includes(inputSearch.toLowerCase())
  );

  return (
    <div className="main">
      <Header inputSearch={inputSearch} setInputSearch={setInputSearch} />
      <NavBar todos={searchTodo} setTodos={setTodos} filterTodo={filterTodo} />
      <List searchTodo={searchTodo} />
    </div>
  );
};

export default Main;
