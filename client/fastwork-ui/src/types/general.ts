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
    checkpointId?: string | number,
    name: string
}

export interface Milestone {
    id: string | number,
    contractId?: string | number,
    title: string,
    dueDate: string,
    price: number,
    tasks: Task[],

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

export type TailwindSizes = "xs" | "sm" | "" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";