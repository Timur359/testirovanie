import React from 'react';
import Popup from '../Popup';

import './PopupInfo.css';
import '../Popup.css';
import compl from '../../../image/Compl.svg';
import nocompl from '../../../image/NoCompl.svg';

const PopupInfo = ({
  name,
  description,
  handleCompleted,
  performance,
  isOpen,
  getFullDate,
  changePopup,
}) => {
  return (
    <Popup isOpen={isOpen} changePopup={changePopup}>
      <div className="popup-info__box-info">
        <h2 className="popup-info__title" maxLength="10">
          {`${name.substring(0, 10)}...`}
        </h2>
        <span className="popup-info__date">{getFullDate}</span>
      </div>
      <img
        src={performance ? compl : nocompl}
        className="popup-info__status"
        onClick={handleCompleted}
        alt="Статус"
      />
      <p className="popup-info__paragraph">{description}</p>
    </Popup>
  );
};

export default PopupInfo;
