import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [num, setNum] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [groupName, setGroupName] = useState('');
  const [date, setDate] = useState('');

  const deleteUser = (e) => {
    e.preventDefault();
    return axios
      .delete(`http://localhost:8080/api/user/${num}`, { num })
      .then(() => {
        const newUsersList = users.filter((c) => c.id !== num);
        setUsers(newUsersList);
        setNum('');
      });
  };

  const postUser = (e) => {
    e.preventDefault();
    return axios
      .post(`http://localhost:8080/api/user`, {
        name,
        surname,
        groupName,
        date,
      })
      .then((res) => {
        console.log(res);
        const newUsersList = [...users, res];
        console.log(newUsersList);
        setUsers(newUsersList);
        setName('');
        setSurname('');
        setGroupName('');
        setDate('');
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/user')
      .then((res) => setUsers(res.data));
  }, [deleteUser, postUser]);

  const handleChangeNum = (e) => {
    setNum(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeSurname = (e) => {
    setSurname(e.target.value);
  };

  const handleChangeGroupName = (e) => {
    setGroupName(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <form>
        Введите id пользователя для удаления
        <input
          type="text"
          value={num}
          onChange={(e) => handleChangeNum(e)}
          required
        />
        <button onClick={deleteUser}>Удалить</button>
      </form>
      <form className="app__post">
        Имя
        <input
          type="text"
          value={name}
          onChange={(e) => handleChangeName(e)}
          required
        />
        Фамилия
        <input
          value={surname}
          onChange={(e) => handleChangeSurname(e)}
          required
        />
        Группа
        <input
          value={groupName}
          onChange={(e) => handleChangeGroupName(e)}
          required
        />
        Дата рождения
        <input value={date} onChange={(e) => handleChangeDate(e)} required />
        <button onClick={postUser}>Добавить</button>
      </form>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>
              {user.id} {user.name} {user.surname} {user.groupname} {user.date}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
