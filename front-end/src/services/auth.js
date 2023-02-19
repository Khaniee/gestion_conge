import axios from "axios"

const BASE_URL = "http://localhost:8000";

export const whoami = async () => {
    const res = await axios.get(`${BASE_URL}/whoami`, {
        headers: getAuthHeader()
    });
    return res.data;
}

export const login = async (login, password) => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, {
            'login': login,
            'password': password,
        })
        if (res.data.access_token) {
            localStorage.setItem("user", JSON.stringify(res.data))
        }
        return res.data;
    } catch (error) {
        console.log(error);
        if (error.response) {
            return error.response.data;
        } else {
            return {
                detail: "CONNECTION AU SERVEUR INTERROMPU"
            };
        }
    }
}

export const logout = () => {
    localStorage.removeItem("user")
}

export const isAuthentified = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user && user.access_token) {
        return { Authorization: `Bearer ${user.access_token}` }
    }
    return {};
}