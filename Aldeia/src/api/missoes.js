// CRUD de missões

import axios from "axios";

export async function getMissoes() {
  const response = await axios.get("http://localhost:3000/missoes")

  return response.data
}

export async function getMissao(id) {
  const response = await axios.get(`http://localhost:3000/missoes/${id}`)

  return response.data
}

export async function deleteMissao(id) {
  const response = await axios.delete(`http://localhost:3000/missoes/${id}`)

  return response.data
}

export async function updateMissao(id, data) {
  const response = await axios.put(`http://localhost:3000/missoes/${id}`, data)

  return response.data
}

export async function addMissao(data) {
  const response = await axios.post("http://localhost:3000/missoees", data)

  return response.data
}