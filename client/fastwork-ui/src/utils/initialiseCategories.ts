// src/utils/initializeCategories.ts
import httpClient from "@/client/httpClient";
import { parseCSVFile } from "@/utils/parseCSVFile";
import { v4 as uuid } from "uuid";

const initialiseCategories = async () => {
    try {
        // Fetch and parse the CSV file
        const response = await  fetch("/workCategories.csv");
        const blob = await response.blob();
        const file = new File([blob], "categories.csv");
        const categories = await parseCSVFile(file);

        // Fetch existing categories from the database
        const existingCategoriesResponse = await httpClient.get("category/all");
        const existingCategories = existingCategoriesResponse.data.map( (category: { name: string }) => category.name );

        const newCategories = categories.filter( category => !existingCategories.includes(category));

        if(newCategories.length > 0){
            const createNewCategories = async () => {
                const apiCalls = newCategories.map((newCategory) =>
                    httpClient.post("category", {
                        id: uuid(),
                        name: newCategory,
                    })
                    .then((res) => res.data)
                    .catch((error) => {
                        console.error("Error Creating New Category", error);
                    })
                );
    
                try {
                    const results = await Promise.all(apiCalls);
                    console.log("All new categories created successfully:", results);
                } catch (error) {
                    console.error("One new category failed to create:", error);
                }
            };
            // createNewCategories();
        }
    } catch (error) {
        console.error("Error initializing categories:", error);
    }
};

export default initialiseCategories;
