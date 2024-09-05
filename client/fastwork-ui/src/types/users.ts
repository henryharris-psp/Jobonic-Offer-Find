import { Skill } from "./general";

type Role = {
    id: number;
    code: string;
    name: string;
};

type ApplicationRole = {
    id: number;
    applicationNameCode: string;
    applicationName: string;
    roleList: Role[];
};


export interface LaconicUser {
    firstName: string;
    lastName: string;
    id: number;
    username: string;
    name_english: string | null;
    name_local: string | null;
    email: string;
    sso_id: string;
    image_url: string | null;
    last_login_date: string;
    roles: ApplicationRole[];
    modules: any[];
};

export interface UserExperience {
    id: string | number;
    profileId: number,      
    company: string,
    startDate: string,
    endDate: string
}

export interface UserEducation {
    id: string | number;
    name: string;
    profileId: number,
    institute: string,
    degree: string,
    startDate: string,
    endDate: string
}

export interface Profile {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    address: string;
    image: string | null;
    cardNumber: string;
    cardExpiryDate: string;
    walletAddress: string;
    // number of reviewers
    numReviews: number;
    userExperienceList: UserExperience[];
    userEducationList: UserEducation[];
    skills: Skill[];
    userId: number;
    // add number of services sold in backend
    numSold?: number;
    // add rating in backend
    rating?: number;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    name_english: string | null;
    name_local: string | null;
    email: string;
    sso_id: string;
    image_url: string | null;
    last_login_date: string | null;
    roles: any;
    profile: Profile;
}