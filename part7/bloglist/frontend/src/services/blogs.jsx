import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const deleteBlog = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const getBlog = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const comment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return request.data
}

export default { getAll, create, update, deleteBlog, getBlog, comment }
