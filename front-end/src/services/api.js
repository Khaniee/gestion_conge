import axios from "axios";
import { HttpStatusCode } from "axios";

const BASE_URL = "http://localhost:8000";

const refreshToken = async () => {
    try {
        const { data } = await axios.post(`${BASE_URL}/refresh-token`, {
            refreshToken: localStorage.getItem("refreshToken"),
        });
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        return data.access_token;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json',
    },
});

api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    try {
        await api.get(`/whoami`);
        return config;
    } catch (error) {
        if (error.response.status === HttpStatusCode.Unauthorized) {
            const accessToken = await refreshToken();
            config.headers.Authorization = `Bearer ${accessToken})}`
            return config;
        }

        return Promise.reject(error);
    }
})