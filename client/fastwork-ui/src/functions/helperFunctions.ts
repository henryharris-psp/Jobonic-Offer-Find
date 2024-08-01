import { useRouter } from 'next/router';
import { baseURL } from "@/baseURL";
import httpClient from '@/client/httpClient';

// returns a boolean which says whether profile exists
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

// function to get user ID from the init endpoint
export const getUserId = async () => {
    try {
        const response = await httpClient.get('https://api-auths.laconic.co.th/v1/user/init-data');
        return response.data.id;
    } catch (error: any) {
        console.error('Error fetching user ID:', error);
        throw error;
    }
};

// function to get profile details from user-controller without taking userId as a parameter
export const getProfile = async () => {
    try {
        const userId = await getUserId();
        const response = await httpClient.get(`http://localhost:8081/api/v1/user/profile?id=${userId}`);
        //console.log(userId);
        console.log(response.data.id);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching profile details:', error);
        throw error;
    }
};

// function to get profile ID from profile object
export const getProfileId = async () => {
    try {
        const profile = await getProfile();
        console.log(profile.id);
        return profile.id;
    } catch (error: any) {
        console.error('Error fetching profile ID:', error);
        throw error;
    }
};
