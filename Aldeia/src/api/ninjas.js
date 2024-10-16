// CRUD functions

import axios from "axios";

export async function getNinjas(userId) {
  const response = await axios.get("https://aldeia-back.onrender.com/ninjas", {
    params: { userId }
  })

  return response.data
}

export async function addNinja(data, userId) {
  const response = await axios.post("https://aldeia-back.onrender.com/ninjas", {
    ...data,
    userId: userId
  })

  return response.data
}

export async function deleteNinja(id) {
  const response = await axios.delete(`https://aldeia-back.onrender.com/ninjas/${id}`)

  return response.data
} 

export async function getNinja(id) {
  const response = await axios.get(`https://aldeia-back.onrender.com/ninjas/${id}`)

  return response.data
}

export async function updateNinja(id, data) {
  const response = await axios.put(`https://aldeia-back.onrender.com/ninjas/${id}`, data)

  return response.data
}