import httpClient from '@/client/httpClient';
import { parseCSVFile } from '@/utils/parseCSVFile';

const initialiseCategories = async () => {
    try {
        // Fetch and parse the CSV file
        const csvResponse = await fetch('/workCategories.csv');
        const blob = await csvResponse.blob();
        const file = new File([blob], 'categories.csv');
        const csvCategories: string[] = await parseCSVFile(file);

        // Fetch all categories from the backend API
        const fetchCategories = async () => {
            try {
                const response = await httpClient.get('/category/all');
                const backendCategories = response.data;

                // Filter backend categories by name to ensure uniqueness
                const uniqueCategoriesByName = Array.from(
                    new Map(
                        backendCategories.map((category: { name: string }) => [category.name, category])
                    ).values()
                );

                console.log("Filtered Categories:", uniqueCategoriesByName);
                return uniqueCategoriesByName;
            } catch (error) {
                console.error("Error fetching categories:", error);
                return [];
            }
        };

        // Fetch existing categories from the database
        const existingCategories = await fetchCategories();

        // Add new categories from CSV if they don't exist in the backend
        for (const category of csvCategories) {
            if (!existingCategories.some((existingCategory: { name: string }) => existingCategory.name === category)) {
                try {
                    const payload = {
                        id: generateUniqueId(), // Replace with actual ID generation logic
                        name: category,
                    };
                    const response = await httpClient.post(`/category`, payload);
                    console.log(`Category ${category} posted successfully`, response.data);
                } catch (error) {
                    console.error(`Error posting category ${category}:`, error);
                }
            }
        }

        const finalCategoriesResponse = await httpClient.get(`/category/all`);
        return finalCategoriesResponse;
    } catch (error) {
        console.error('Error initializing categories:', error);
        return null;
    }
};

// Example function to generate unique IDs (you can replace this with your own logic)
const generateUniqueId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export default initialiseCategories;
