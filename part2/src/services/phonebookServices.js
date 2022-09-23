import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getAll = async () => {
  const request = await axios.get(baseUrl);
  const response = await request.data;
  return response;
};

export const createPerson = async (newPerson) => {
  const request = await axios.post(baseUrl, newPerson);
  const response = await request.data;
  return response;
};

export const updatePerson = async (id, updatedPerson) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedPerson);
  const response = await request.data;
  return response;
};

export const deletePerson = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
  // await request.data;
  // return response;
};
