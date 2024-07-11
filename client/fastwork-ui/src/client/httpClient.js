import { SERVER_AUTH, baseURL } from '@utils/baseUrl';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const ENDPOINT_LOGIN = `${SERVER_AUTH}/v1/login`;
const ENDPOINT_REFRESH_TOKEN = `${SERVER_AUTH}/v1/login/refresh-token`;

const httpClient = axios.create({
    baseURL: `${baseURL}`
});

httpClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.url !== ENDPOINT_LOGIN && config.url !== ENDPOINT_REFRESH_TOKEN) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

httpClient.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refresh_token');
        if (error.response?.status === 401 && !originalRequest._retry && error.config?.url !== ENDPOINT_REFRESH_TOKEN) {
            originalRequest._retry = true;
            if (refreshToken) {
                try {
                    const response = await httpClient.post<AccessTokenResponse>(ENDPOINT_REFRESH_TOKEN, { refreshToken }, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    localStorage.setItem('access_token', response.data.access_token);
                    localStorage.setItem('refresh_token', response.data.refresh_token);
                    if (response.data.access_token) {
                        httpClient.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
                    }
                    return httpClient(originalRequest);
                } catch (e) {
                    const error = e;
                    if ((error.response?.status === 400 || error.response?.status === 401 || error.response?.status === 500) && error.config?.url === ENDPOINT_REFRESH_TOKEN) {
                        window.location.href = '/logout';
                    }
                    return Promise.reject(error);
                }
            }
        } else if (error.response?.status === 401 && originalRequest._retry && error.config?.url === ENDPOINT_REFRESH_TOKEN) {
            window.location.href = '/logout';
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default httpClient;