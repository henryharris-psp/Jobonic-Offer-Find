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
// export interface JobData {
//     title: string;
//     company: string;
//     work_category: string;
//     employment_type: string;
//     description_1: string;
//     description_2: string;
//     description_3: string;
//     examples_of_work: string;
//     submission_deadline: Date;
//     budget: number;
//     language: string
//     location: string;
//     days_left: number
// }