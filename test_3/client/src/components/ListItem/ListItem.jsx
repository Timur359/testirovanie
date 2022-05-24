import React, { useState } from 'react';
import axios from 'axios';
import Popup from '../Popup/Popup';

import './ListItem.css';
import compl from '../../image/Compl.svg';
import nocompl from '../../image/NoCompl.svg';
import { base_url } from '../Main/Main';

const ListItem = ({
  name,
  description,
  date,
  id,
  perfomance,
  todos,
  setTodos,
  todo,
}) => {
  const [isCompleted, setIsCompleted] = useState(perfomance);
  const [isOpen, setIsOpen] = useState(false);

  const handleCompleted = () => {
    axios
      .put(base_url, {
        id: id,
        perfomance: !perfomance,
      })
      .then((res) =>
        setTodos(todos.map((todo) => (todo.id === res.id ? res : todo)))
      )
      .catch((err) => console.error(err.message));
    setIsCompleted(!isCompleted);
  };

  const handleDeleteToto = async () => {
    try {
      const deleteTodo = await axios.delete(`${base_url}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
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
        <button
          className="list-item__delete"
          onClick={() => handleDeleteToto(id)}
        />
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
