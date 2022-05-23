import axios from 'axios';

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/user`);
      dispatch(setUser(response.data));
    } catch (e) {
      alert(e.response);
    }
  };
};
