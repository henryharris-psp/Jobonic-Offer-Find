import { useRouter } from 'next/router';
import { baseURL } from "@/baseURL";
import axios from "axios";
import httpClient from '@/client/httpClient';

// returns a boolean which says whether profile exists
const checkProfile = async (userID: number) => {
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

// function to get user ID from the init endpoint
const getUserId = async () => {
    try {
        const response = await httpClient.get('https://api-auths.laconic.co.th/v1/user/init-data');
        return response.data.id;
    } catch (error: any) {
        console.error('Error fetching user ID:', error);
        throw error;
    }
};

// function to get profile details from user-controller without taking userId as a parameter
const getProfile = async () => {
    try {
        const userId = await getUserId();
        const response = await httpClient.get(`${baseURL}/api/v1/user/profile`, {
            params: {
                id: userId
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching profile details:', error);
        throw error;
    }
};

// function to get profile ID from profile object
const getProfileId = async () => {
    try {
        const profile = await getProfile();
        return profile.id;
    } catch (error: any) {
        console.error('Error fetching profile ID:', error);
        throw error;
    }
};

export default { checkProfile, getProfile, getUserId, getProfileId };
