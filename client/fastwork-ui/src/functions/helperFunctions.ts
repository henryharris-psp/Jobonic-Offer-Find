import httpClient from '@/client/httpClient';

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
        const response = await httpClient.get(`user/profile`, {
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

// returns a boolean which says whether profile exists
export const checkProfile = async (profileId: number) => {
    try {
        const response = await httpClient.get('user', {
            params: {
                id: profileId
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
