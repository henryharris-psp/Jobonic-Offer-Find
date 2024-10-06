import { PageLink } from '@/types/general';
import { v4 as uuid } from 'uuid';

export const availableLanguages: { label: string, code: string }[] = [
    { label: 'English', code: 'en' },
    { label: '中文', code: 'zh' },
    { label: 'ไทย', code: 'th' }
];

export const pageLinks: PageLink[] = [
    {
        id: uuid(),
        path: '/about',
        name: 'About Us'
    },
    {
        id: uuid(),
        path: '/findServices',
        name: 'Hire'
    },
    {
        id: uuid(),
        path: '/offerServices',
        name: 'Apply Job'
    },
    {
        id: uuid(),
        path: '/chat',
        name: 'Messages'
    },
    {
        id: uuid(),
        path: '/privileges',
        name: 'Privileges'
    }
];