export interface SortingValue{
    sortBy: string ;
    sortOrder: "ASC" | "DESC";
}

export interface Sorting{
    label: string;
    value: SortingValue;
}
