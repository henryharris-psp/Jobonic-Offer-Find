import httpClient from '@/client/httpClient';
import { Category, Contract } from '@/types/general';
import { Service, ServiceApiResponse, ServicePayload } from '@/types/service';
import axios from 'axios';

// function to get user ID from the init endpoint
export const getUserId = async () => {
    try {
        const laconicAuthServerUrl = process.env.NEXT_PUBLIC_LACONIC_AUTH_SERVER_URL;
        const response = await httpClient.get(`${laconicAuthServerUrl}/user/init-data`);
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
        const response = await httpClient.post(`user/get-user-info/`, {}, {
            params: {
                name: 'user',
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
export const getProfileId = async () => {
    try {
        const profile = await getProfile();
        return profile.id;
    } catch (error: any) {
        console.error('Error fetching profile ID:', error);
        throw error;
    }
};

// returns a boolean which says whether profile exists
export const checkProfile = async (profileId: number) => {
    try {
        const response = await httpClient.get('user', {
            params: {
                id: profileId
            }
        });

        if (response.data.phoneNumber && response.data.address) {
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

// function to get category name from category-controller taking categoryId as a parameter
export const getCategoryName = async (categoryId: string) => {
    try {
        const response = await httpClient.get('category', {
            params: {
                id: categoryId
            }
        });
        return response.data.name;
    } catch (error: any) {
        console.error('Error fetching profile details:', error);
        throw error;
    }
};

//new
    export const getAuthUserDetails = async (token?: string) => {
        const laconicAuthServerUrl =process.env.NEXT_PUBLIC_LACONIC_AUTH_SERVER_URL;
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const apiCall = token 
            ? axios.get(`${laconicAuthServerUrl}/user/init-data`, { headers })
            : httpClient.get(`${laconicAuthServerUrl}/user/init-data`);
        try{
            const res = await apiCall;
            return res.data;
        } catch {
            return null;
        }
    }

    export const getProfileByUserId = async (userId: string | number, token?: string) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiUrl}/user/get-user-info/`;
        const headers = {
            Authorization: `Bearer ${token}`
        }

        const apiCall = token 
            ? axios.post(url, {}, {
                headers,
                params: {
                    name: 'user',
                    id: userId
                }
            })
            : httpClient.post(url, {}, { 
                params: {
                    name: 'user',
                    id: userId
                }
            });
        try{
            const res = await apiCall;
            return res.data;
        } catch {
            return null;
        }
    }

    //Laconic user + profile
    export const getUser = async (token?: string) => {
        const user = await getAuthUserDetails(token);
        if(!user) return null;
        const profile = await getProfileByUserId(user.id, token);
        return {
            ...user,
            profile
        }
    }

    export const getProfileByProfileId = async (profileId: string | number, token?: string) => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const url = `${apiUrl}/user/get-user-info/`;
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const apiCall = token 
            ? axios.post(url, {}, {
                headers,
                params: {
                    name: 'profile',
                    id: profileId
                }
            })
            : httpClient.post(url, {}, {
                params: {
                    name: 'profile',
                    id: profileId
                }
            });
        try{
            const res = await apiCall;
            return res.data;
        } catch {
            return null;
        }
    }

    export const fetchServices = async (
        type: 'offer' | 'request',
        signal: AbortSignal,
        payload: ServicePayload
    ): Promise<ServiceApiResponse | undefined> => {
        try {
            const authUser = await getUser();
            const res = await httpClient.post<ServiceApiResponse>(`service/offer/all`, payload, { signal });

            //TODO: temporary filter
            //don't show service posted by login user
            const services = res.data.content.filter( e => e.profileDTO.id !== authUser?.profile?.id ).map((service: Service) => ({
                ...service,
                type: type
            }))

            //TODO: temporary filter
            // to seperate service requests and service offers
            let gg = [];

            if(type === 'offer'){
                gg = services.filter( e => e.serviceRequestDTO === null );
            } else {
                gg = services.filter( e => e.serviceRequestDTO !== null );
            }
            return {
                ...res.data,
                content: gg
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch services aborted');
            } else {
                console.error('Fetch services error:', error);
            }
        }
    };

    export const fetchCategories = async (
        signal: AbortSignal,
    ): Promise<Category[] | undefined>  => {
        try {
            const res = await httpClient.get('/category/all', { signal });
            return res.data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch categories aborted');
            } else {
                console.error('Fetch categories error:', error);
            }
        }
    };

    export const fetchContract = async (
        contractId: string | number,
        signal?: AbortSignal
    ): Promise<Contract | undefined> => {
        try {
            //get_contract
            const res = await httpClient.get(`contract/${contractId}`, { signal });
            return res.data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch contract aborted');
            } else {
                console.error('Fetch contract error:', error);
            }
        }
    }

    export const fetchPayment = async (
        transactionId: string | number,
        signal?: AbortSignal
    ): Promise<Contract | undefined> => {
        try {
            //get_payment
            const res = await httpClient.get(`payment/${transactionId}`, { signal });
            return res.data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch contract aborted');
            } else {
                console.error('Fetch contract error:', error);
            }
        }
    }

