// src/utils/initializeCategories.ts
import httpClient from '@/client/httpClient';
import { baseURL } from '@/baseURL';
import { AxiosError } from 'axios';

// Function to fetch categories from the backend enum
const fetchBackendCategories = async () => {
    const response = await httpClient.get(`${baseURL}/api/v1/category/all`);
    return response.data;
};

const initializeCategories = async () => {
    try {
        const existingCategoriesResponse = await httpClient.get(`${baseURL}/api/v1/category/all`);
        const existingCategories = existingCategoriesResponse.data.map((category: { name: string }) => category.name);

        // Fetch backend categories
        const backendCategories = await fetchBackendCategories();

        for (const category of backendCategories) {
            if (!existingCategories.includes(category)) {
                try {
                    await httpClient.post(`${baseURL}/api/v1/category`, { name: category });
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.error('Error adding category:', error.response?.data || error.message);
                    } else {
                        console.error('Error adding category:', error);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching existing categories:', error);
    }
};

export default initializeCategories;

