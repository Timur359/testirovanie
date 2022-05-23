import React, { useState } from 'react';
import ListItem from '../ListItem/ListItem';

import './List.css';

const List = ({ todos, setTodos, searchTodo }) => {
  //Реализация пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [flightsPerPage] = useState(2);
  const lastFlightIndex = currentPage * flightsPerPage;
  const currentFlight = searchTodo.slice(0, lastFlightIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  return (
    <div className="list">
      <p>Инфо</p>
      {currentFlight.map((todo) => {
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
      <button onClick={nextPage}>Показать ещё</button>
    </div>
  );
};

export default List;
