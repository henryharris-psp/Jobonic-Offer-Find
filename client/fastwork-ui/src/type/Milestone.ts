export interface Milestone {
    id: string;
    title: string;
    price: number;
    tasks: string[];
    isOpen: boolean;
    serviceId: string;
    uploadedFiles?: { name: string; size: number; }[];
}