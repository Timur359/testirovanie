import React from 'react';

import './Popup.css';
import compl from '../../image/Compl.svg';
import nocompl from '../../image/NoCompl.svg';

const Popup = ({
  isOpen,
  handleClosePopup,
  name,
  description,
  date,
  handleCompleted,
  isCompleted,
}) => {
  return (
    <div className={`popup ${isOpen ? 'popup__open' : ''}`}>
      <button onClick={handleClosePopup}>Закрыть</button>
      <div className="popup__box">
        <div className="popup__box-info">
          <h2 className="popup__title">{name}</h2>
          <span className="popup__date">{date}</span>
        </div>
        <img
          src={isCompleted ? compl : nocompl}
          className="popup__status"
          onClick={handleCompleted}
          alt="Статус"
        />
        <p className="popup__paragraph">{description}</p>
      </div>
    </div>
  );
};

export default Popup;
