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
    userExperienceList: string[];
    userEducationList: string[];
    skills: string[];
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
    last_login_date: string | null,
    roles: any,
    profile: Profile
}