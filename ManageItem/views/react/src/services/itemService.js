import axios from "axios";

const API_URL = "/";
const getItems = () => {
  return axios.get(API_URL);
};

const addItem = (item) => {
  return axios.post(API_URL, item);
};

const updateItem = (id, item) => {
  return axios.put(`${API_URL}/${id}`, item);
};

const deleteItem = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default{
  getItems,
  addItem,
  updateItem,
  deleteItem
};
