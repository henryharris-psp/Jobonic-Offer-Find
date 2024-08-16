'use client';

import React from 'react';
import Button from '@/components/Button';
import Link from 'next/link';
import Form from '@/components/Form';
import InputField from '@/components/InputField';
import * as Yup from 'yup';
import axios from 'axios';
import { decodeJWT } from '../helper/decoder';
import { useAuth } from '../context/AuthContext';
import MyGoogleButton from '../button/MyGoogleButton';
import MyAppleLoginButton from '../button/AppleButton';
import {AUTH_UI_URL, baseURL, SERVER_AUTH} from '@/baseURL';

interface LoginFormValues {
    username: string;
    password: string;
}

const initialValues: LoginFormValues = {
    username: '',
    password: '',
};

const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export const LoginForm = (): React.ReactNode => {
    const { googleSignIn } = useAuth();
    const { appleSignIn } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log('Google Sign-In error:', error);
        }
    };

    const handleAppleSignIn = async () => {
        try {
            appleSignIn();
        } catch (error) {
            console.log('Apple Sign-In error:', error);
        }
    };

    const onSubmit = async (values: { [key: string]: any }): Promise<void> => {
        const URL = `${SERVER_AUTH}/v1/login`;
        try {
            const response = await axios.post(URL, values, {
                headers: {
                     'Content-Type': 'application/x-www-form-urlencoded',

                },
            });
            console.log('Response:', response);

            if (response.data) {
                console.log('Log in form submitted:');
                const tokens = {
                    refreshToken: response.data.refresh_token,
                    refreshTokenExpires: response.data.refresh_expires_in,
                    accessToken: response.data.access_token,
                    accessTokenExpires: Date.now() + response.data.expires_in * 1000,
                };
                const tokensString = JSON.stringify(tokens);
                localStorage.setItem('tokens', tokensString);

                const decodedPayload = decodeJWT(tokens.accessToken);
                console.log('Decoded Payload:', decodedPayload);
                const { name, email, userid } = decodedPayload;
                const userInfo = { name, email, userid };
                console.log('User Info:', userInfo);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));

                window.location.href = '/';
            } else {
                alert('Invalid Credentials');
            }
        } catch (error: any) {
            console.log('Error logging in:', error.message);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center">
            <div className="p-8 rounded-lg shadow-md w-full max-w-3xl bg-gray-100 max-w-md">
                <div className="">
                    <h1 className="font-bold text-3xl text-center text-[#002D74]">Login</h1>
                    <p className="text-sm mt-4 mb-4 text-[#002D74]">
                        <b>If you are already a member, easily log in</b>
                    </p>
                    <Form initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <div className="mb-5">
                            <InputField label="Email" name="username" type="email" placeholder="Email" />
                        </div>
                        <div className="mb-6">
                            <InputField label="Password" name="password" type="password" placeholder="Password" />
                        </div>
                        <div className="flex justify-center items-center mb-6">
                            <Button
                                type="submit"
                                variant="btn-primary flex justify-center w-full text-white bg-[#0B2147] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-[#0C2348]/50 rounded-xl px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#0C2348]/55"
                            >
                                <b>Login</b>
                            </Button>
                        </div>

                        <div className="text-center mb-4 mt-3">
                            <Link
                                className="inline-block text-blue-600 underline hover:text-blue-400 hover:underline pl-1 text-sm"
                                href="/forgotPassword"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </Form>
                    <div className="mt-5 grid grid-cols-3 items-center text-gray-500 mb-5">
                        <hr className="border-gray-500" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-500" />
                    </div>

                    <MyGoogleButton onClick={handleGoogleSignIn} />
                    <MyAppleLoginButton onClick={handleAppleSignIn} />
                </div>
            </div>
        </section>
    );
};
