// src/utils/initializeCategories.ts
import httpClient from '@/client/httpClient';
import { baseURL } from '@/baseURL';
import { parseCSVFile } from '@/utils/parseCSVFile';

// Function to fetch categories from the backend enum
const initialiseCategories = async () => {
    try {
        // Fetch and parse the CSV file
        const response = await fetch('/workCategories.csv');
        const blob = await response.blob();
        const file = new File([blob], 'categories.csv');
        const categories = await parseCSVFile(file);

        // Fetch existing categories from the database
        const existingCategoriesResponse = await httpClient.get(`${baseURL}/api/v1/category/all`);
        const existingCategories = existingCategoriesResponse.data;

        // Check if the number of categories in the CSV file is larger
        if (categories.length > existingCategories.length) {
            // Post new categories
            for (const category of categories) {
                // Check if the category is already present in existing categories
                if (!existingCategories.some((existingCategory: { name: string }) => existingCategory.name === category)) {
                    try {
                        const payload = {
                            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Example ID, consider replacing with actual logic
                            name: category,
                        };
                        const response = await httpClient.post(`${baseURL}/api/v1/category`, payload);
                        console.log(`Category ${category} posted successfully`, response.data);
                    } catch (error) {
                        console.error(`Error posting category ${category}:`, error);
                    }
                }
            }
        } else {
            console.log('No new categories to add. Fetching existing categories.');
            console.log('Existing categories:', existingCategories);
        }

        const returnResponse = await httpClient.get(`${baseURL}/api/v1/category/all`);
        return returnResponse;
    } catch (error) {
        console.error('Error initializing categories:', error);
    }
};

export default initialiseCategories;