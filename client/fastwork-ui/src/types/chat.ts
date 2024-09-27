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
import { Contract, Payment } from "./general";
import { Service } from "./service";
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

// export interface Service {
//     name: string;
//     image: string;
//     bullet1: string;
//     bullet2: string;
//     bullet3: string;
//     rating: number;
//     reviews: number;
//     price: string;
//     description: string;
//     reviewsDetail: { reviewer: string; comment: string; rating: number }[];
//     numSold: number;
// }

//new
export interface Match {
    id: string;
    serviceId: string;
    profileId: string | null;
    employeeId: string | null;
    status: string;
    payment: Payment | null;

    //not_required
    deliverable: string;
    paymentTotal: number;
    paymentMode: string;
    numberOfCheckPoint: number;
    numberOfCheckpointsLeft: 0,
}

export type MediaType = 
    'text' | 
    'image' | 
    'contract' | 
    'service' |
    'milestone' |
    'chat_room' |
    'payment_request' |
    'full_payment' | 
    'milestone_payment' |
    'price_negotiation';

export interface Message {
    id: string | number;
    room_id: number;
    sender_id: number | string; //string is for system
    media_type: MediaType 
    content: string;
    created_at: string;
};

export type CollaborationStatus = 
    'enquiring' |
    'applied' |
    'invited' |
    'signing_contract' |
    'payment_verification' |
    'to_submit' |
    'to_review' |
    'contract_termination' |
    'completed' |
    'cancelled';
;

export type FreelancerChatStatus = 
    'enquiring' |
    'applied' |
    'to_submit' | 
    'waiting_for_submission' |
    'waiting_for_review' |
    'completed' |
    'cancelled';

export type EmployeerChatStatus = 
    'enquiring' |
    'invited' | //TODO: temporary
    'applicant' |
    'waiting_for_submission' |
    'to_approve' |
    'to_review' |
    'completed' |
    'cancelled';

export interface ChatRoom {
    id: number | string;
    freelancer_id: number; //profileId 
    employer_id: number; //profileId
    match_id: number | string;
    match: Match | null;
    service_id: number | string; //TODO: remove
    service: Service | null;
    sender: Profile;
    receiver: Profile;
    status: FreelancerChatStatus | EmployeerChatStatus
    created_at: string;
    messages: Message[],
    isNew?: boolean,
    latestContract: Contract,
    authUserType: 'freelancer' | 'employer'
}