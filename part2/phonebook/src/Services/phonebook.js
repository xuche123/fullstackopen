import axios from "axios";

const baseUrl = "/api/people";

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};

const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject);
    const response = await request;
    return response.data;
};

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
}

const updatePerson = async (id, obj) => {
    const request = axios.put(`${baseUrl}/${id}`, obj);
    const response = await request;
    return response.data;
}

export default { getAll, create, deletePerson, updatePerson };