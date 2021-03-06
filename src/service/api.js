import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: window.location.origin.includes('docflix') ? window.location.origin : 'https://docflixapi.azurewebsites.net',
});

api.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
