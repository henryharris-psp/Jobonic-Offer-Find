import httpClient from '@/client/httpClient';
import { Category, Contract, Attachment, Milestone, MilestoneStatus } from '@/types/general';
import { ServiceApiResponse, ServicePayload } from '@/types/service';
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
        const url = `${apiUrl}/user/get-user-info/?name=profile&id=${profileId}`;
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const apiCall = token 
            ? axios.post(url, {}, { headers })
            : httpClient.post(url);
        try{
            const res = await apiCall;
            return res.data;
        } catch {
            return null;
        }
    }

    export const fetchServices = async (
        type: 'offer' | 'request',
        payload: ServicePayload,
        signal: AbortSignal,
    ): Promise<ServiceApiResponse | undefined> => {
        try {
            const res = await httpClient.post<ServiceApiResponse>(`service/${type}/all`, payload, { signal });
            return res.data;
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

    export const fetchAttachmentsByMilestoneId = async (
        milestoneId: string | number,
        signal?: AbortSignal
    ): Promise<Attachment[] | undefined> => {
        try {
            const filesRes = await httpClient.get(`attachment/checkpoint?checkPointId=${milestoneId}`, { signal });
            const files = filesRes.data.map((file: any) => ({ 
                id: file.id,
                name: file.name,
                size: file.fileSize,
                status: 'uploaded'
            }));

            return files
        } catch (error) {
            console.error('Error fetching uploaded files:', error);
        }
    };
    
    export const fetchContract = async (
        contractId: string | number,
        signal?: AbortSignal
    ): Promise<Contract | undefined> => {
        try {
            const res = await httpClient.get(`contract/${contractId}`, { signal });
            const contract = res.data;

            //sort the first one on the top
            const sortedMilestones = contract.milestones.reverse();
            const currentMilestone = sortedMilestones.find((milestone: Milestone) => !['not_started', 'paid'].includes(milestone.description));

            return {
                ...contract,
                currentMilestone
            };
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch contract aborted');
            } else {
                console.error('Fetch contract error:', error);
            }
        }
    };
    

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

    export const updateMilestoneStatus = async (
        milestone: Milestone,
        newStatus: MilestoneStatus,
        signal?: AbortSignal
    ): Promise<Milestone | undefined> => {
        try {
            //update_milestone
            const res = await httpClient.put(`checkpoint?id=${milestone.id}`, {
                ...milestone,
                description: newStatus,
                tasks: []
            }, { signal });

            return res.data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Update milestone aborted');
            } else {
                console.error('Fetch contract error:', error);
            }
        }
    }

    export const downloadFile = async (fileId: string, fileName: string) => {
        try {
            const { data, status, headers } = await axios.get(`/attachment/download`, {
                params: { id: fileId },
                responseType: 'blob',
            });
    
            if (status === 200) {
                const blob = new Blob([data], { type: headers['content-type'] });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            } else {
                console.error('File download failed:', status);
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };