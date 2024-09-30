export type TailwindSizes = "xs" | "sm" | "" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
export type AttachmentStatus = "pending" | "uploaded" | "failed";

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

export type MilestoneStatus = 
    'not_started' | 
    'waiting_for_submission' | 
    'submitted' |
    'paid';

export interface Milestone {
    id: string,
    contractId?: string | number,
    title: string,
    dueDate: string,
    price: number,
    tasks: Task[],
    attachments?: Attachment[];
    status: MilestoneStatus

    //not_required
    serviceId?: string | number,
    matchId?: string | number,
    numberOfHoursCompleted?: number,
}

// export interface PriceNegotiation {
    
// }

export interface Contract {
    id: string | number;
    price: number
    deliverable: string;
    acceptBy: string[] | number[];
    milestones: Milestone[];
    currentMilestone: Milestone | null;
    profileId: string | number;
    matchesId: string | number;
    payoutNegotiations: string[]
}

export interface Payment {
    transactionId: string; //otherwise, paymentId
    amount: number;
    date: string;
    paymentMethod: string;
    senderName: string;
    receiverName: string;
}

export interface Attachment {
    id: string;
    name: string;
    originalName?: string;
    fileSize: string;
    source?: File;
    status: AttachmentStatus
}

//by pyae sone phyo
    export interface CardProps {
        title: string;
        earned: string;
        description: {
            avatar: string;
            username: string;
            review: string;
        }[];
        details: string[];
    }
    
    export interface ServiceRequestDTO {
        id: string;
        submissionDeadline: string;
        workExample: string;
    }
    
    export interface Service {
        id: string;
        serviceOfferDTO?: any;
        serviceRequestDTO?: ServiceRequestDTO;
        profileId: number;
        title: string;
        employmentType: string,
        description: string,
        description1: string,
        description2: string,
        description3: string,
        languageSpoken: string,
        location: string,
        categoryId: string,
        categoryName?: string,
        price: number,
        priceUnit: string
    }
