import axios from "axios";

const getAll = async (endpoint) => {
    const response = await axios.get(`http://localhost:3001/${endpoint}`);
    return response.data;
}

const get = async (endpoint, id) => {
    const response = await axios.get(`http://localhost:3001/${endpoint}/${id}`);
    return response.data;
}

const addData = async (endpoint, data) => {
    const response = await axios.post(`http://localhost:3001/${endpoint}`, data);
    return response.data;
}

const updateData = async (endpoint, id, data) => {
    const response = await axios.put(`http://localhost:3001/${endpoint}/${id}`, data);
    return response.data;
}

const removeData =  async (endpoint, id) => {
    const response = await axios.delete(`http://localhost:3001/${endpoint}/${id}`);
    return response.data;
}

export default {getAll, get, addData, updateData, removeData};
