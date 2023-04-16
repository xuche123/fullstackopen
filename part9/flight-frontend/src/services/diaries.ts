import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../types"

const baseUrl = "/api/diaries"

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl)
    return response.data
}

const create = async (newObject: NewDiaryEntry) => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}
    
export default {
    getAll,
    create
}
