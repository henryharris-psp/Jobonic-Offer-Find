import axios from 'axios'

const testApiUrl = process.env.NEXT_PUBLIC_TEST_API_URL;

const testClient = axios.create({
    baseURL: testApiUrl
});

testClient.interceptors.request.use( config => {
        return config;
    },
        error => {
        Promise.reject(error);
    }
);

export default testClient;