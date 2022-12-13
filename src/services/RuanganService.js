import axios from "axios";

const baseUrl = "http://localhost:3001/ruangan";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

const addData = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
}

const updateData = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data);
  return response.data;
}

const removeData =  async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
}

export default {getAll, get, addData, updateData, removeData};