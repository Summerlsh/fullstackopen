import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl).then(resp => resp.data)
}

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then(resp => resp.data)
}

const updatePerson = (newPerson) => {
  return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
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
