import { SERVER_AUTH, baseURL } from '@utils/baseUrl';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const ENDPOINT_LOGIN = `${SERVER_AUTH}/v1/login`;
const ENDPOINT_REFRESH_TOKEN = `${SERVER_AUTH}/v1/login/refresh-token`;

const httpClient = axios.create({
    baseURL: `${baseURL}`
});

httpClient.interceptors.request.use((config) => {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJnZ01tQXVuV1RUeWVYTS1nTGdzTUJpZDhxQy02UkdWbno3NDZMTUN1bXQ4In0.eyJleHAiOjE3MjA3MDQ2MTUsImlhdCI6MTcyMDY2ODYxNSwianRpIjoiMTY4ZjdhMjYtMDhiMi00N2M1LTk1ZDctN2Y1MWZlZGY1ZmMwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDgwL3JlYWxtcy90ZXN0LXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInR5cCI6IkJlYXJlciIsImF6cCI6InRlc3QtY2xpZW50Iiwic2lkIjoiMmQ4M2UwZjEtNGM3ZS00ZTViLTg2YWYtNTI0YWQ3ZTJiMTFhIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy10ZXN0LXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6ImFkbWluIGFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW5AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6ImFkbWluIiwiZmFtaWx5X25hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIn0.fdWlV39CQDdbuvgM_zHg8EZM8-4EYooj18bk0yFwgxxQ2SYRoOxId61tqv0fV6JMp0xKW5cqbczxoD-yrJScehQnBrDbVTKBormGGp7TXzg2-4BpLDEucuiLSval1XTZgHW4HjB7gvqzS6xGnTpfVYSOvjwtShAtjY_KSI7nIa-Oo3jR4j2ruGVWQxRq8Dsyvk9ixyzwVQhBj6u4uDuVJg3X3WbzmtbrtmxFSo55XYPs4gRxOkiU6ymL9KQeBc_-u-lWB5P8HQJ1PhGyZO3ASJZZ7smtI0CpwpAsqWCdLW7JRC9wpJ6ExxuKZs9QuyqTgAAso39YzZP6PZ08ZpZTrQ'
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