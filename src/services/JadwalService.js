import axios from "axios";

const baseUrl = "http://localhost:3001/jadwal";


const getAll = () => {
  return axios.get(baseUrl);
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

export default {getAll, get, addData, updateData };
