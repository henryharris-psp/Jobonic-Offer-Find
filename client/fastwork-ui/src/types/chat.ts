// export interface Message {
//     id: number | string;
//     sender?: string;
//     avatar?: string;
//     text?: string;
//     type?: "deal" | "message" | "apply" | "service offer";
//     image?: string;
//     title?: string;
//     rating?: number;
//     description?: string[];
//     price?: string;
//     sentByAuthUser: boolean;
// }

import { Profile } from "./users";

export interface ActiveChat {
    id: number;
    fullName: string;
    avatar: string;
    messages: Message[];
    type: "client" | "service_provider";
    status: string;
    sentByAuthUser: boolean
}

export interface People {
    id: number;
    fullName: string;
    avatar: string;
    messages: Message[];
    type: "client" | "service_provider";
    status: string;
}

export interface Service {
    name: string;
    image: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    rating: number;
    reviews: number;
    price: string;
    description: string;
    reviewsDetail: { reviewer: string; comment: string; rating: number }[];
    numSold: number;
}


//new
export interface Message {
    id: string | number;
    room_id: number;
    sender_id: number;
    content: string;
    created_at: string
};

export type ServiceOfferStatus = 
        'enquiring' |
        'completed' |
        'applicant' | 
        'waiting for submission' |
        'to review' |
        'waiting for final submission' |
        'rejected';

export type ServiceRequestStatus = 
        'enquiring' |
        'applied' |
        'to submit' |
        'waiting for review' |
        'waiting for final view' |
        'cancelled' |
        'completed';

export interface ChatRoom {
    id: number | string;
    freelancer_id: number; //profileId 
    employer_id: number; //profileId
    service_id: number;
    sender: Profile;
    receiver: Profile;
    service: Service;
    status: ServiceOfferStatus | ServiceRequestStatus
    created_at: string;
    messages: Message[],
    isNew?: boolean
}