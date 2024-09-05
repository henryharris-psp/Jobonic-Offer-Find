import axios from "axios";

const baseApiUrl = process.env.NEXT_PUBLIC_MATCH_SERVER;

const matchClient = axios.create({
    baseURL: baseApiUrl
})

//TODO: implement interceptor to check 401 response and perform logout action

export default matchClient;