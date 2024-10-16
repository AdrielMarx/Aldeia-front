// CRUD de missões

import axios from "axios";

export async function getMissoes(userId) {
  const response = await axios.get(`https://aldeia-back.onrender.com/missoes`, {
    params: { userId }
  })

  return response.data
}

export async function getMissao(id) {
  const response = await axios.get(`https://aldeia-back.onrender.com/missoes/${id}`)

  return response.data
}

export async function deleteMissao(id) {
  const response = await axios.delete(`https://aldeia-back.onrender.com/missoes/${id}`)

  return response.data
}

export async function updateMissao(id, data) {
  const response = await axios.put(`https://aldeia-back.onrender.com/missoes/${id}`, data)

  return response.data
}

export async function addMissao(data, userId) {
  const response = await axios.post("https://aldeia-back.onrender.com/missoes", {
    ...data, 
    userId: userId
  })

  return response.data
}