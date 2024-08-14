// export interface Service {
//     id: string;
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

export interface ServiceRequestDTO {
    id: string;
    submissionDeadline: string;
    workExample: string;
};
  
export interface Service {
    id: string,
    serviceOfferDTO: any[],
    serviceRequestDTO: {
      id: string,
      submissionDeadline: string,
      workExample: string
    },
    profileDTO: {
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
      numReviews: number,
      userExperienceList: [],
      userEducationList: [],
      skills: string[],
      userId: number,
      // add number of services sold in backend
      numSold?: number,
      // add rating in backend
      rating?: number,
    },
    title: string,
    employmentType: string,
    description: string,
    description1: string,
    description2: string,
    description3: string,
    languageSpoken: string,
    location: string,
    categoryDTO: {
      id: string,
      name: string
    },
    price: number,
    priceUnit: string
    // remove after implementing reviews table
    reviewsDetail?: { reviewer: string; comment: string; rating: number }[];
}