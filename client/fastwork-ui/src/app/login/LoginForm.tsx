'use client';
import Button from '@/components/Button';
import Link from 'next/link';
import Form from '@/components/Form';
import InputField from '@/components/InputField';
import * as Yup from 'yup';
import axios from 'axios';
import { decodeJWT } from '../helper/decoder';

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const baseUrl = process.env.NEXT_PUBLIC_AUTHORIZE_SERVER

export const LoginForm = (): React.ReactNode => {

  // const onSubmit = async (values: { [key: string]: any }): Promise<void> => {
  //   try {
  //     console.log('Log in form submitted:', values);
  //     if (values.email === loginDetails.email && values.password === loginDetails.password) {
  //       window.location.href = '/';
  //     } else {
  //       alert('Invalid Credentials');
  //     }
  //   } catch (error: any) {
  //     console.log('Error logging in:', error.message);
  //   }
  // };
  const onSubmit = async (
    values: { [key: string]: any }
  ): Promise<void> => {
    const URL =`${baseUrl}/v1/login`;
    try {
      const response = await axios.post(URL, values, {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          console.log('Response:', response);
          
          if(response.data) {
          console.log('Log in form submitted:')
          const tokens = {
            refreshToken: response.data.refresh_token,
            refreshTokenExpires: response.data.refresh_expires_in,
            accessToken: response.data.access_token,
            accessTokenExpires: Date.now() + response.data.expires_in * 1000,
          }
          const tokensString = JSON.stringify(tokens);
          localStorage.setItem('tokens', tokensString);

          const decodedPayload = decodeJWT(tokens.accessToken);
          console.log('DECO', decodedPayload)
          const { name, email, userid } = decodedPayload;
          const userInfo = {name, email, userid}
          console.log('USER', userInfo)
          localStorage.setItem('userInfo', JSON.stringify(userInfo));

          window.location.href = '/'
        } else {
          alert('Invalid Credentials')
        }
    } catch (error: any) {
      console.log('Error logging in:', error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-black font-bold text-lg text-center pb-6">Log In</h1>
        <Form initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <div className="mb-6">
            <InputField label="Email" name="username" type="email" placeholder="Email" />
          </div>
          <div className="mb-6">
            <InputField label="Password" name="password" type="password" placeholder="Password" />
          </div>
          <div className="flex justify-center items-center">
            <Button
              type="submit"
              variant="btn-primary flex justify-center text-white bg-[#0B2147] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-[#0C2348]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#0C2348]/55 me-2">
              Login
            </Button>
          </div>
          <div className="text-center mb-4 mt-3">
            <Link className="inline-block text-blue-600 underline hover:text-blue-400 hover:underline pl-1 text-sm" href="/forgotPassword">
              Forgot your password?
            </Link>
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <button type="button" className="text-white bg-[#4285F4] hover:bg-[#357ae8] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
              </svg>
              Sign in with Google
            </button>
            <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/55 me-2 mb-2">
              <svg className="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
              </svg>
              Sign in with Apple
            </button>
          </div>
          <div className="mt-4 text-center text-black">
          Don&apos;t have an account?
            <Link href="/register" className="text-blue-600 hover:text-blue-400 underline pl-2">
              Sign up now!
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

