// src/utils/parseCSVFile.ts
import Papa from 'papaparse';

export const parseCSVFile = async (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (results) => {
                const skills = results.data.map((row: any[]) => row[0]).filter(Boolean);
                resolve(skills);
            },
            error: (error) => {
                reject(error);
            },
            header: false,
        });
    });
};
