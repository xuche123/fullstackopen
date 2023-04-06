import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (content) => {
    const anecdote = {content, votes:0}
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const vote = async (id, newObject) => {
    const request = await axios.put(`${baseUrl}/${id}`, newObject)
    return request.data
} 

const exportObj = {
    getAll,
    createAnecdote,
    vote
}

export default exportObj