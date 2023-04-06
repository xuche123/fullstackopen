import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const vote = async (newObject) => {
    const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.data
} 

const exportObj = {
    getAll,
    createAnecdote,
    vote
}

export default exportObj