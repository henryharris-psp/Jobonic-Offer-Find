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
    id: string | number,
    milestoneId?: string | number,
    name: string
}

export interface Milestone {
    id: string | number,
    contractId?: string | number,
    name: string,
    tasks: Task[],
    dueDate: string,
    price: number
}

export interface Contract {
    id: string | number,
    price: number,
    deliverable: string,
    isFreelancerConfirmed: boolean,
    isEmployerConfirmed: boolean,
    milestones: Milestone[],
}

export type TailwindSizes = "xs" | "sm" | "" | "lg" | "xl" | "2xl" | "3xl" | "4xl";