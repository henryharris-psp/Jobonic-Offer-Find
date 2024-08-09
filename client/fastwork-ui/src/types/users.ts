export interface User {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    companyName: string,
    phoneNumber: string,
    address: string,
    image: string,
    cardNumber: string,
    cardExpiryDate: string,
    walletAddress: string,
    // number of reviewers
    numReviews: number,
    userExperienceList: string[],
    userEducationList: string[],
    skills: string[],
    userId: number,
    // add number of services sold in backend
    numSold?: number,
    // add rating in backend
    rating?: number,
}