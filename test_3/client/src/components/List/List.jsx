import React, { useState } from 'react';
import axios from 'axios';
import ListItem from '../ListItem/ListItem';

import './List.css';

import icon from '../../image/Icon.svg';
import { base_url } from '../Main/Main';

const List = ({ todos, setTodos, handleSortDate }) => {
  //Реализация пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(6);
  const lasTodoIndex = currentPage * todosPerPage;
  const currentTodo = todos.slice(0, lasTodoIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  return (
    <div className="list">
      <div className="list__title-box">
        <p className="list__title-box_text">8 мая</p>
        <img src={icon} className="list__title-box_icon" alt="Сортировка" />
        <p className="list__title-box_text" onClick={handleSortDate}>
          Сортировать по дате
        </p>
      </div>
      {currentTodo.map((todo) => {
        const handleCompleted = async () => {
          try {
            const completedTodo = await axios.put(base_url, {
              id: todo.id,
              perfomance: !todo.perfomance,
            });
            const newTodos = [...todos];
            newTodos.map((todo) => {
              if (todo.id === completedTodo.data.id) {
                todo.perfomance = !todo.perfomance;
              }
            });
            setTodos(newTodos);
          } catch (err) {
            console.error(err.message);
          }
        };
        return (
          <ListItem
            todos={todos}
            key={Math.random()}
            todo={todo}
            name={todo.name}
            description={todo.description}
            date={todo.date}
            id={todo.id}
            perfomance={todo.perfomance}
            setTodos={setTodos}
            handleCompleted={handleCompleted}
          />
        );
      })}
      {currentTodo.length === todos.length ? (
        ''
      ) : (
        <button onClick={nextPage}>Показать ещё</button>
      )}
    </div>
  );
};

export default List;
