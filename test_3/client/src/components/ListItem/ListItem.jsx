import React, { useState } from 'react';
import axios from 'axios';

import './ListItem.css';
import compl from '../../image/Compl.svg';
import nocompl from '../../image/NoCompl.svg';
import { base_url } from '../Main/Main';
import PopupInfo from '../Popup/PopupInfo/PopupInfo';

const ListItem = ({
  name,
  description,
  date,
  id,
  perfomance,
  todos,
  setTodos,
  handleCompleted,
}) => {
  const [isCompleted, setIsCompleted] = useState(perfomance);
  const [isOpen, setIsOpen] = useState(false);

  let todayDay = new Date(date);

  const getFullDate =
    todayDay.getDate() +
    '.' +
    (todayDay.getMonth() + 1) +
    '.' +
    todayDay.getFullYear() +
    ' ' +
    todayDay.getHours() +
    ':' +
    todayDay.getMinutes();

  const handleDeleteToto = async () => {
    try {
      const deleteTodo = await axios.delete(`${base_url}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const changePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={isCompleted ? 'list-item__completed' : 'list-item__active'}
      >
        <h2 className="list-item__title" onClick={changePopup}>
          {name}
        </h2>
        <button
          className="list-item__delete"
          onClick={() => handleDeleteToto()}
        />
        <p className="list-item__paragraph">{description}</p>
        <img
          src={perfomance ? compl : nocompl}
          className="list-item__status"
          onClick={() => handleCompleted(id, perfomance)}
          alt="Статус"
        />
        <span className="list-item__date">{getFullDate}</span>
      </div>
      <PopupInfo
        changePopup={changePopup}
        handleCompleted={handleCompleted}
        name={name}
        description={description}
        date={date}
        isCompleted={isCompleted}
        setIsCompleted={setIsCompleted}
        performance={perfomance}
        isOpen={isOpen}
        getFullDate={getFullDate}
      />
    </>
  );
};

export default ListItem;
