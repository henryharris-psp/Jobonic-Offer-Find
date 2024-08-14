import { Language } from '@/types/ui';
import { v4 as uuid } from 'uuid';

export const availableLanguages: Language[] = ['English', '中文', 'ไทย'];

export const pageLinks = [
    {
        id: uuid(),
        path: '/about',
        name: 'About Us'
    },
    {
        id: uuid(),
        path: '/findServices',
        name: 'Find Services'
    },
    {
        id: uuid(),
        path: '/offerServices',
        name: 'Offer Services'
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