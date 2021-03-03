import axios from "axios";

const baseUrl = "/api/persons"

const getAll = () => {
  return axios.get(baseUrl).then(resp => resp.data)
}

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(resp => resp.data)
}

const updatePerson = (id, newPerson) => {
  return axios.put(`${baseUrl}/${id}`, newPerson)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const personService = {
  getAll,
  addPerson,
  updatePerson,
  deletePerson
}

export default personService
