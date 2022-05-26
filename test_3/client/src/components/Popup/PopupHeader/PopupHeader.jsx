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
  nameError,
  nameDirty,
  descriptionError,
  descriptionDirty,
  formValid,
  blurHandler,
  descriptionHandler,
  nameHandler,
}) => {
  /*const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };*/
  return (
    <Popup isOpen={isOpen} changePopup={changePopup}>
      <form className="popup-header">
        <div className="popup-header__input-box">
          <p className="popup-header__input-name">Наименование задачи</p>
          <input
            type="text"
            name="name"
            className={`popup-header__input ${
              nameError ? 'popup-header__input_error' : ''
            }`}
            value={name}
            onChange={(e) => {
              nameHandler(e);
            }}
            onBlur={(e) => blurHandler(e)}
            required
          />
          <div className="popup-header__error">
            {nameError && nameDirty && (
              <span className="popup-header__span">{nameError}</span>
            )}
          </div>
        </div>
        <div className="popup-header__input-box">
          <p className="popup-header__input-name">Описание задачи</p>
          <textarea
            type="text"
            name="description"
            className={`popup-header__input-textarea ${
              descriptionError ? 'popup-header__input_error' : ''
            }`}
            value={description}
            onChange={(e) => {
              descriptionHandler(e);
            }}
            onBlur={(e) => blurHandler(e)}
            required
          />
          <div className="popup-header__error">
            {descriptionError && descriptionDirty && (
              <span className="popup-header__span">{descriptionError}</span>
            )}
          </div>
        </div>
        <button
          onClick={(e) => createTodo(e)}
          className={
            formValid ? 'popup-header__button' : 'popup-header__button_disabled'
          }
          disabled={!formValid}
        >
          Создать
        </button>
      </form>
    </Popup>
  );
};

export default PopupHeader;
