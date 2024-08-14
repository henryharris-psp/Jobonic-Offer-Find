// src/utils/initializeSkills.ts
import httpClient from '@/client/httpClient';
import { AxiosError } from 'axios';

const initializeSkills = async (skills: string[]) => {
    try {
        const existingSkillsResponse = await httpClient.get('skill/all');
        const existingSkills = existingSkillsResponse.data.map((skill: { name: string }) => skill.name);

        for (const skill of skills) {
            if (!existingSkills.includes(skill)) {
                try {
                    await httpClient.post('skill', { name: skill });
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.error('Error adding skill:', error.response?.data || error.message);
                    } else {
                        console.error('Error adding skill:', error);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error fetching existing skills:', error);
    }
};

export default initializeSkills;
