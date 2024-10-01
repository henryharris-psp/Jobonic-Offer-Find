// src/utils/initializeSkills.ts
import httpClient from "@/client/httpClient";
import { parseCSVFile } from "@/utils/parseCSVFile";
import { v4 as uuid } from "uuid";

const initialiseSkills = async () => {
    try {
        // Fetch and parse the CSV file
        const response = await  fetch("/skillList.csv");
        const blob = await response.blob();
        const file = new File([blob], "skills.csv");
        const skills = await parseCSVFile(file);

        // Fetch existing skills from the database
        const existingSkillsResponse = await httpClient.post('skill/page-all', {
            pageNumber: 1,
            pageSize: 100,
            sortBy: 'id',
            sortOrder: 'DESC',
            filter: {
                searchKeyword: ''
            }
        });
        
        const existingSkills = existingSkillsResponse.data.content.map((skill: { name: string }) => skill.name );

        const newSkills = skills.filter( skill => !existingSkills.includes(skill));

        if(newSkills.length > 0){
            const createNewSkills = async () => {
                const apiCalls = newSkills.map((newSkill) =>
                    httpClient.post("skill", {
                        id: uuid(),
                        name: newSkill,
                    })
                    .then((res) => res.data)
                    .catch((error) => {
                        console.error("Error Creating New skill", error);
                    })
                );
    
                try {
                    const results = await Promise.all(apiCalls);
                    console.log("All new skills created successfully:", results);
                } catch (error) {
                    console.error("One new skill failed to create:", error);
                }
            };
            // createNewSkills();
        }
    } catch (error) {
        console.error("Error initializing skills:", error);
    }
};

export default initialiseSkills;

