import axios from "axios";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: "bearer" + process.env.REACT_APP_API_TOKEN,
  },
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);

  return response.data;
};
