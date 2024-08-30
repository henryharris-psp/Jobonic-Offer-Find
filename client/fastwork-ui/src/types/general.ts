export interface Category {
    id: string;
    name: string;
}

export interface PageLink {
    id: string,
    path: string,
    name: string
}

export type TailwindSizes = "xs" | "sm" | "" | "lg" | "xl" | "2xl" | "3xl" | "4xl";