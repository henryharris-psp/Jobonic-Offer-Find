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