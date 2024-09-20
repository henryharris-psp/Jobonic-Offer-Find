export interface Category {
    id: string;
    name: string;
}

export interface Skill {
    id: string;
    name: string;
}

export interface PageLink {
    id: string,
    path: string,
    name: string
}

export interface Task {
    id: string,
    checkpointId?: string,
    name: string
}

export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    status: boolean;
}

export interface Milestone {
    id: string,
    contractId?: string | number,
    title: string,
    dueDate: string,
    price: number,
    tasks: Task[],
    uploadedFiles?: UploadedFile[];
    //not_required
    serviceId?: string | number,
    matchId?: string | number,
    numberOfHoursCompleted?: number,
    description?: string,
}

export interface Contract {
    id: string | number;
    price: number
    deliverable: string;
    acceptBy: string[] | number[];
    milestones: Milestone[];
    profileId: string | number;
    matchesId: string | number;
}

export interface Payment {
    transactionId: string;
    amount: number;
    billedTo: string;
    date: string;
    paymentMethod: string;
    senderName: string;
    receiveName: string;
}

export type TailwindSizes = "xs" | "sm" | "" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";