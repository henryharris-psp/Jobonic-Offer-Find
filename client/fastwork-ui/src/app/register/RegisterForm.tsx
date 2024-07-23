'use client';

import Button from "@/components/Button";
import Form from "@/components/Form";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useRef, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import {token, baseURL} from "@/baseURL";
import { useRouter } from "next/navigation";
import httpClient from "@/client/httpClient";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label('First Name'),
  lastname: Yup.string().required().label('Last Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(8).required().label('Password'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Password confirmation must match the password')
    .label('Confirm Password')
});

export const RegisterForm = (): React.ReactNode => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const ref = useRef();

  const handlePasswordChange = (event: { target: any }): any => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOnSubmit = async (values: { [key: string]: any }): Promise<any> => {
    console.log('handleOnSubmit');
    const URL = `${baseURL}/api/v1/user`;
    const payload = {
      "id": 0,
      "username": "string",
      "firstName": values.firstName,
      "lastName": values.lastName,
      "email": values.email,
      "companyName": "string",
      "phoneNumber": "string",
      "address": "string",
      "image": "string",
      "cardNumber": "string",
      "cardExpiryDate": "2024-07-19",
      "walletAddress": "string",
      "review": 0,
      "userExperienceList": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "profileId": 0,
          "company": "string",
          "startDate": "2024-07-19",
          "endDate": "2024-07-19"
        }
      ],
      "userEducationList": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "profileId": 0,
          "institute": "string",
          "degree": "string",
          "startDate": "2024-07-19",
          "endDate": "2024-07-19"
        }
      ],
      "skills": [
        {
          "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "name": "string"
        }
      ],
      "userId": 1
    };
    console.log(payload);
    try {
      const response = await httpClient.post(URL, payload);
      console.log('Response:', response.data);
      //router.push('/');
      //return response;
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <Form
          onSubmit={() => handleOnSubmit(formValues)}
          validationSchema={validationSchema}
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          innerRef={ref}>
        <h1 className="mb-6 text-black font-inter text-2xl font-semibold text-center">
          Sign Up
        </h1>

        <div className="mb-6">
          <InputField label="First Name" type="text" name="firstName" onChange={(e) => setFormValues((prevState) => ({
            ...prevState,
            ['firstName']: e.target.value,
          }))}
            placeholder="Your First Name"/>
        </div>

        <div className="mb-6">
          <InputField label="Last Name" type="text" name="lastName" placeholder="Your Last Name"/>
        </div>

        <div className="mb-6">
          <InputField label="Email Address" type="email" name="email" placeholder="Email address"/>
        </div>

        <div className="mb-6">
          <InputField label="Password" name="password" onChange={handlePasswordChange} type="password"
                      placeholder="Your Password"/>
        </div>

        <div className="mb-6">
          <InputField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm Password"/>
        </div>

        <div className="flex items-center justify-center">
          <Button onClick={() => handleOnSubmit} type="button"
                  variant="btn-primary flex justify-center text-white bg-[#0C2348] hover:bg-[#D0693B] focus:ring-4 focus:outline-none focus:ring-[#0C2348]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#0C2348]/55 me-2 mb-2">
            Create Account
          </Button>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <button type="button"
                  className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 viewBox="0 0 18 19">
              <path fillRule="evenodd"
                    d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                    clipRule="evenodd"/>
            </svg>
            Create with Google
          </button>
          <button type="button"
                  className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/55 me-2 mb-2">
            <svg className="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple"
                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
            </svg>
            Create with Apple
          </button>
        </div>

        <span className="block text-center mt-7 text-base text-black">
          Already have an account?
          <Link href="/login" className="text-blue-600 underline hover:text-blue-400 hover:underline ml-2">
            Login
          </Link>
        </span>
      </Form>
    </div>
  );
};
