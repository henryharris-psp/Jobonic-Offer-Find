// src/utils/initializeCategories.ts
import httpClient from '@/client/httpClient';
import { baseURL } from '@/baseURL';
import { AxiosError } from 'axios';

const predefinedCategories = [
    { name: 'Administrative' },
    { name: 'Agriculture and natural resources' },
    { name: 'Construction and trades' },
    { name: 'Project Management' },
    { name: 'Corporate Affairs' },
    { name: 'Creative and Media' },
    { name: 'Education and training' },
    { name: 'Engineering' },
    { name: 'Finance & Accounting' },
    { name: 'Healthcare and medical' },
    { name: 'Hospitality and tourism' },
    { name: 'Event Planning and Management' },
    { name: 'Entertainment' },
    { name: 'Human resources and recruiting' },
    { name: 'Information Technology' },
    { name: 'Web Development' },
    { name: 'Artificial Intelligence and Machine Learning' },
    { name: 'Legal and law enforcement' },
    { name: 'Manufacturing' },
    { name: 'Sales & Marketing' },
    { name: 'Science & research' },
];

const initializeCategories = async () => {
    try {
        const existingCategoriesResponse = await httpClient.get(`${baseURL}/api/v1/category/all`);
        const existingCategories = existingCategoriesResponse.data.map((category: { name: string }) => category.name);

        for (const category of predefinedCategories) {
            if (!existingCategories.includes(category.name)) {
                try {
                    await httpClient.post(`${baseURL}/api/v1/category`, category);
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
