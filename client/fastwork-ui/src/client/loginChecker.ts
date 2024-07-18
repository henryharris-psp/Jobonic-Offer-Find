"use client"
import { AUTH_UI_URL } from '@/baseURL';
import {useEffect} from 'react';

const useLoginChecker = () => {
    useEffect(() => {
        const checkAuthentication = () => {
            if (localStorage.getItem('access_token') === null) {
                window.location.href = `/`;
            }
        };
        if (window.location.pathname !== `${AUTH_UI_URL}`) {
            checkAuthentication();
        }
    }, []);
};

export default useLoginChecker;