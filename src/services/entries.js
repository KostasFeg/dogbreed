import axios from 'axios';
const baseUrl = '/api/entries';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = (page, limit, query, curName) => {
  const request = axios.get(
    `/api/entries?page=${page}&limit=${limit}&query=${query}&curUser=${curName}`
  );
  return request.then((response) => response.data);
};

const create = async (newEntry) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newEntry, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const deleted = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, setToken, update, deleted };
