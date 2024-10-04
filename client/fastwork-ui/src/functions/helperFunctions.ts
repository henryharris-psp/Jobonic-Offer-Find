import httpClient from '@/client/httpClient';
import { Category, Contract, Attachment, Milestone, MilestoneStatus, Payment } from '@/types/general';
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
        signal?: AbortSignal,
        searchKeyword?: string,
        applyFilters: boolean = false, // New parameter to determine if filters should be applied
    ): Promise<ServiceApiResponse | undefined> => {
        try {
            if (searchKeyword) {
                // Call the Python API for search
                const response = await fetch(`http://127.0.0.1:5000/search?query=${encodeURIComponent(searchKeyword)}`, {
                    signal
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                return data;  // Return the data from the Python API
            } else if (applyFilters) {
                // Call the filters API for fetching filtered services
                const res = await httpClient.post<ServiceApiResponse>(`service/filters`, payload, { signal });
                return res.data; // Return the filtered services data
            } else {
                // Call the service API for fetching all services
                const res = await httpClient.post<ServiceApiResponse>(`service/${type}/all`, payload, { signal });
                return res.data;
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch services aborted');
            } else {
                console.error('Fetch services error:', error);
            }
        }
    };
    
    //old fetchServices func
    // export const fetchServices = async (
    //     type: 'offer' | 'request',
    //     payload: ServicePayload,
    //     signal: AbortSignal,
    // ): Promise<ServiceApiResponse | undefined> => {
    //     try {
    //         const res = await httpClient.post<ServiceApiResponse>(`service/${type}/all`, payload, { signal });
    //         return res.data;
    //     } catch (error: any) {
    //         if (error.name === 'AbortError') {
    //             console.log('Fetch services aborted');
    //         } else {
    //             console.error('Fetch services error:', error);
    //         }
    //     }
    // };
    
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

            const milestones = contract.milestones;

            //sort the first one on the top
            const sortedMilestones = milestones.reverse();
            const currentMilestone = sortedMilestones.find((milestone: Milestone) => !['not_started', 'paid'].includes(milestone.status));

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

    export const updateMilestoneStatus = async (
        milestoneId: string | number,
        newStatus: MilestoneStatus,
        signal?: AbortSignal
    ): Promise<Milestone | undefined> => {
        try {
            //update_milestone
            const res = await httpClient.put(`checkpoint?id=${milestoneId}`, {
                status: newStatus,
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

    export const downloadFile = async (
        fileId: string, 
        fileName: string
    ) => {
        try {
            const res = await httpClient.get(`attachment/download?id=${fileId}`, {
                responseType: 'blob',
            });
            
            const { data, headers, status } = res;
    
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

    export const fetchPayment = async (
        paymentId: string,
        signal?: AbortSignal
    ): Promise<Payment | undefined>  => {
        try{
            const paymentRes = await httpClient.get(`payment/${paymentId}`, { signal });
            const payment: Payment = paymentRes.data;

            let contract = null;
            let milestone = null;

            if(payment.payableType === 'CONTRACT'){
                const contractRes = await httpClient.get(`contract/${payment.payableId}`);
                contract = contractRes.data;
            } else {
                const milestoneRes = await httpClient.get(`checkpoint?id=${payment.payableId}`);
                milestone = milestoneRes.data;
            }

            const sender = await getProfileByProfileId(payment.senderId);
            const receiver = await getProfileByProfileId(payment.receiverId);

            return {
                ...payment,
                milestone,
                contract,
                sender,
                receiver
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch payment aborted');
            } else {
                console.error('Fetch payment error:', error);
            }
        }
    }