
import { AUTH_UI_URL, baseURL, SERVER_AUTH} from '@/baseURL';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
const ENDPOINT_LOGIN = `${SERVER_AUTH}/v1/login`;
const ENDPOINT_REFRESH_TOKEN = `${SERVER_AUTH}/v1/login/refresh-token`;

type AccessTokenResponse = {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    'not-before-policy': number;
    session_state: string;
    scope: Map<string, object>;
}

interface OriginalRequest extends AxiosRequestConfig {
    _retry: boolean;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const httpClient = axios.create({
    baseURL: apiUrl
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
    async (error: AxiosError) => {
        const originalRequest = error.config as OriginalRequest;
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
                    const error = e as AxiosError;
                    if ((error.response?.status === 400 || error.response?.status === 401 || error.response?.status === 500) && error.config?.url === ENDPOINT_REFRESH_TOKEN) {
                        window.location.href = `${AUTH_UI_URL}/authentication?page=logout`;
                    }
                    return Promise.reject(error);
                }
            }
        } else if (error.response?.status === 401 && originalRequest._retry && error.config?.url === ENDPOINT_REFRESH_TOKEN) {
            window.location.href = `${AUTH_UI_URL}/authentication?page=logout`;
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default httpClient;