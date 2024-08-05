export interface Message {
    id: number | string;
    sender?: string;
    avatar?: string;
    text?: string;
    type?: 'deal' | 'message' | 'apply' | 'service offer';
    image?: string;
    title?: string;
    rating?: number;
    description?: string[];
    price?: string;
    sentByCurrentUser?: boolean;
  }
  
  export interface ActiveChat {
    id: number;
    fullName: string;
    avatar: string;
    messages: Message[];
    type: 'client' | 'service_provider';
    status: string;
  }
  
  export interface People {
    id: number;
    fullName: string;
    avatar: string;
    messages: Message[];
    type: 'client' | 'service_provider';
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
  
  export interface CurrentUser {
    id: number;
    email: string;
    username: string;
    avatar: string;
    userid: number;
  }