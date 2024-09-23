export type BreakPoint = 'sm' | 'md' | 'lg' | 'xl';
export type Language = 'English' | '中文' | 'ไทย';

export interface Notification {
    id?: string; //uuid
    title: string;
    content: string;
    status: 'success' | 'warning' | 'danger' | 'info' | 'chat';
    timeout: number | null;
}