import axios from "axios";
const headerConfig = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type" : "Application/json"
}

const URL = "http://localhost:8000/api"

export const get = async (basePath, data)=> {
    return await axios.get(`${URL}/${basePath}`,
    {params: data ? data : {}})
}