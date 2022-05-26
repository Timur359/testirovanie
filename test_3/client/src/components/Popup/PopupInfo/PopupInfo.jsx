import React from 'react';

import '../Popup.css';
import compl from '../../../image/Compl.svg';
import nocompl from '../../../image/NoCompl.svg';
import Popup from '../Popup';

const PopupInfo = ({
  name,
  description,
  date,
  handleCompleted,
  performance,
  isOpen,
  setIsOpen,
  getFullDate,
}) => {
  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="popup__box-info">
        <h2 className="popup__title" maxLength="10">
          {`${name.substring(0, 10)}...`}
        </h2>
        <span className="popup__date">{getFullDate}</span>
      </div>
      <img
        src={performance ? compl : nocompl}
        className="popup__status"
        onClick={handleCompleted}
        alt="Статус"
      />
      <p className="popup__paragraph">{description}</p>
    </Popup>
  );
};

export default PopupInfo;
