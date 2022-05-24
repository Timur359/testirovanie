import React, { useState } from 'react';
import ListItem from '../ListItem/ListItem';

import './List.css';

import icon from '../../image/Icon.svg';

const List = ({ todos, setTodos, handleSortDate, handleSelectCategory }) => {
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
        <img src={icon} className="list__title-box_icon" />
        <p className="list__title-box_text" onClick={handleSortDate}>
          Сортировать по дате
        </p>
      </div>
      {currentTodo.map((todo) => {
        return (
          <ListItem
            todos={todos}
            key={todo.id}
            todo={todo}
            name={todo.name}
            description={todo.description}
            date={todo.date}
            id={todo.id}
            perfomance={todo.perfomance}
            setTodos={setTodos}
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
