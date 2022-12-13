import axios from "axios";

const baseUrl = "http://localhost:3001/kasir";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data[0].now;
};

export default { getAll };
