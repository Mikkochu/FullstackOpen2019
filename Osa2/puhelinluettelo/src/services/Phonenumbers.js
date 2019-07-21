import axios from "axios";
const url = "http://localhost:3001/api/persons";

const getData = () => {
  const request = axios.get(url);
  return request.then(response => response.data);
};

const createPhonebook = personObj => {
  const request = axios.post(url, personObj);
  return request.then(response => response.data);
};

const removePerson = id => {
  return axios.delete(`${url}/${id}`);
};

const updatePhonebook = (id, personObj) => {
  const request = axios.put(`${url}/${id}`, personObj);
  return request.then(response => response.data);
};

export default {
  getData,
  createPhonebook,
  updatePhonebook,
  removePerson
};
