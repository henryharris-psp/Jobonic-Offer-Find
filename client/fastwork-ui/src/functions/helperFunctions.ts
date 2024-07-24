import { useRouter } from 'next/router';
import { baseURL } from "@/baseURL";
import axios from "axios";
import httpClient from '@/client/httpClient';

export const checkProfile = async (userID: number) => {
    try {
        const response = await httpClient.get(`${baseURL}/api/v1/user`, {
            params: {
                id: userID
            }
        });

        if (response.data.phoneNumber && response.data.address) {
            console.log(response.data.email); // Assuming the response contains the profile ID
            return true;
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return false;
        } else {
            console.error('Error fetching search results:', error);
        }
    }
};

export default { checkProfile };