import React, { useState } from 'react';
import axios from 'axios';
import Popup from '../Popup/Popup';

import './ListItem.css';
import compl from '../../image/Compl.svg';
import nocompl from '../../image/NoCompl.svg';

const ListItem = ({
  name,
  description,
  date,
  id,
  perfomance,
  todos,
  setTodos,
}) => {
  const [isCompleted, setIsCompleted] = useState(perfomance);
  const [isOpen, setIsOpen] = useState(false);

  const handleCompleted = () => {
    axios
      .put('http://localhost:8080/api/todos', {
        id: id,
        perfomance: !perfomance,
      })
      .then((res) => {
        setTodos(todos.map((todo) => (todo.id === res.id ? res : todo)));
      })
      .catch((err) => console.error(err));
    setIsCompleted(!isCompleted);
  };

  const handleClosePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="list-item">
        <h2 className="list-item__title" onClick={() => setIsOpen(!isOpen)}>
          {name}
        </h2>
        <p className="list-item__paragraph">{description}</p>
        <img
          src={isCompleted ? compl : nocompl}
          className="list-item__status"
          onClick={handleCompleted}
          alt="Статус"
        />
        <span className="list-item__date">{date}</span>
      </div>
      <Popup
        isOpen={isOpen}
        handleClosePopup={handleClosePopup}
        handleCompleted={handleCompleted}
        name={name}
        description={description}
        date={date}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
      />
    </>
  );
};

export default ListItem;
