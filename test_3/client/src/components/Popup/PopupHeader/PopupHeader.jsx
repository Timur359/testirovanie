import React from 'react';
import Popup from '../Popup';

import './PopupHeader.css';
import '../Popup.css';

const PopupHeader = ({
  name,
  setName,
  description,
  setDescription,
  isOpen,
  changePopup,
  createTodo,
}) => {
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  return (
    <Popup isOpen={isOpen} changePopup={changePopup}>
      <form className="popup-header">
        <div className="popup-input__input-box">
          <p className="popup-header__input-name">Наименование задачи</p>
          <input
            type="text"
            className="popup-header__input"
            value={name}
            onChange={(e) => {
              handleChangeName(e);
            }}
            required
          />
        </div>
        <div className="popup-input__input-box">
          <p className="popup-header__input-name">Описание задачи</p>
          <input
            type="text"
            className="popup-header__input"
            value={description}
            onChange={(e) => {
              handleChangeDescription(e);
            }}
            required
          />
        </div>
        <button onClick={createTodo} className="popup-header__button">
          Создать
        </button>
      </form>
    </Popup>
  );
};

export default PopupHeader;
