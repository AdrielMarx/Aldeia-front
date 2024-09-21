// CRUD functions

import axios from "axios";

export async function getNinjas() {
  const response = await axios.get("http://localhost:3000/ninjas")

  return response.data
}

export async function addNinja(data) {
  const response = await axios.post("http://localhost:3000/ninjas", data)

  return response.data
}

export async function deleteNinja(id) {
  const response = await axios.delete(`http://localhost:3000/ninjas/${id}`)

  return response.data
} 


export async function getNinja(id) {
  const response = await axios.get(`http://localhost:3000/ninjas/${id}`)

  return response.data
}

export async function updateNinja(id, data) {
  const response = await axios.put(`http://localhost:3000/ninjas/${id}`, data)

  return response.data
}