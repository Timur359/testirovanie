import React from 'react';
import Popup from '../Popup';

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
      <form>
        {' '}
        <input
          value={name}
          onChange={(e) => {
            handleChangeName(e);
          }}
          type="text"
        />
        <input
          value={description}
          onChange={(e) => {
            handleChangeDescription(e);
          }}
          type="text"
        />
        <button onClick={createTodo}>создать</button>
      </form>
    </Popup>
  );
};

export default PopupHeader;
