import React, { useState } from 'react';

const Popup = ({ children, isOpen, changePopup }) => {
  return (
    <div
      onClick={changePopup}
      className={`popup ${isOpen ? 'popup__open' : ''}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={isOpen ? 'popup__box isOpen' : 'popup__box'}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
