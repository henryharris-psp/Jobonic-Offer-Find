'use client';

import Form from "@/components/Form";
import InputField from "@/components/InputField";
import Link from "next/link";
import { useEffect, useRef, useState, MouseEvent } from "react";
import * as Yup from "yup";
import {baseURL, SERVER_AUTH} from "@/baseURL";
import { useRouter } from "next/navigation";
import httpClient from "@/client/httpClient";
import httpAuth from "@/client/httpAuth";
import { toast } from "react-toastify";
import Button from "@/components/Button";
// Validation Schemas
const validationSchemaAuth = Yup.object().shape({
    firstname: Yup.string().required().label('First Name'),
    lastname: Yup.string().required().label('Last Name'),
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().min(8).required().label('Password'),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')], 'Password confirmation must match the password')
        .label('Confirm Password')
});

const validationSchemaCheckOTP = Yup.object().shape({
    checkOTP: Yup.string().required().label('Check OTP'),
});

const validationSchemaJobonic = Yup.object().shape({
    phoneNumber: Yup.string().required().label('Phone Number'),
    address: Yup.string().required().label('Address'),
    cardNumber: Yup.string().required().label('Card Number'),
    cardExpiryDate: Yup.string().required().label('Card Expiry Date'),
});

interface RegisterForm {
    authRegister: boolean;
    checkOTP: boolean;
    jobonicRegister: boolean;
}

const initialRegisterFormState: RegisterForm = {
    authRegister: true,
    checkOTP: false,
    jobonicRegister: false,
};

type UserLogin = {
    username: string,
    password: string
}

export const RegisterForm: React.FC = () => {
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);
    const [registerForm, setRegisterForm] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userLogin, setUserLogin] = useState<UserLogin>({
        username: '',
        password: ''
    });

    const handleSubmitAuthRegister = async (values: { [key: string]: any }): Promise<void> => {
        const URL = `${SERVER_AUTH}/v1/user/signup`;
        const payload = {
            username: values.username,
            password: values.password,
            email: values.email,
            firstName: values.firstname,
            lastName: values.lastname,
            emailVerified: true,
            applicationNameCode: "jobonic"
        };
        try {
            const response = await httpAuth.post(URL, payload);
            const userData = response.data;

            const userId = userData.userId || userData.id;

            console.log('User Id :' , userData);

            setUserLogin((prevState) => ({
                ...prevState,
                username: values.email,
                password: values.password
            }));
            localStorage.setItem('userId', userData);
            localStorage.setItem('registerFormPage', 'checkOTP');
            setRegisterForm(localStorage.getItem('registerFormPage'));
            setUserId(userId);
        } catch (error) {
            toast.error('Username is invalid');
            console.error('Error:', error);
        }
    };

    const handleSubmitCheckOTP = async (values: { [key: string]: any }): Promise<void> => {
        const userId = localStorage.getItem('userId');

        const URL = `${SERVER_AUTH}/v1/login/verify/otp?userId=${userId}&otp=${values.checkOTP}`;
        try {
            await httpAuth.post(URL);

            const laconicAuthPageUrl = process.env.NEXT_PUBLIC_LACONIC_AUTH_PAGE_URL;
            window.location.href = `${laconicAuthPageUrl}/authentication?page=logout`;

            // Show success toast message
            toast.success('Success verify OTP');
        } catch (error) {
            toast.error('OTP is invalid');
            console.error('Error:', error);
        }
    };

    const handleSubmitJobonicRegister = async (values: { [key: string]: any }): Promise<void> => {
        const URL = `${SERVER_AUTH}/v1/user/signup`;
        const payload = {
            companyName: values.companyName,
            phoneNumber: values.phoneNumber,
            address: values.address,
            image: "",
            cardNumber: values.cardNumber,
            cardExpiryDate: values.cardExpiryDate,
            walletAddress: values.walletAddress,
            review: 0,
            userExperienceList: [],
            userEducationList: [],
            skills: [],
            userId: userId
        };
        try {
            await httpClient.post(URL, payload);
            localStorage.setItem('registerFormPage', 'authRegister');
            window.location.href = '/myProfile';
            setRegisterForm(localStorage.getItem('registerFormPage'));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const checkPage = localStorage.getItem('registerFormPage');
        if (!checkPage) {
            localStorage.setItem('registerFormPage', 'authRegister');
        }
        setRegisterForm(localStorage.getItem('registerFormPage'));
    }, []);

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
            {registerForm === 'authRegister' && (
                <Form
                    onSubmit={handleSubmitAuthRegister}
                    validationSchema={validationSchemaAuth}
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        username: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    innerRef={ref}
                >
                    <h1 className="mb-6 text-black font-inter text-2xl font-semibold text-center">Sign Up</h1>
                    <div className="mb-6">
                        <InputField label="First Name" type="text" name="firstname" placeholder="Your First Name" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Last Name" type="text" name="lastname" placeholder="Your Last Name" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Email Address" type="email" name="email" placeholder="Email address" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Username" type="text" name="username" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Password" name="password" type="password" placeholder="Your Password" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm Password" />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                        title="Create User"
                        onClick={()=>handleSubmitAuthRegister(ref.current?.values)}
                        />
                    </div>
                </Form>
            )}
            {registerForm === 'checkOTP' && (
                <Form
                    onSubmit={handleSubmitCheckOTP}
                    validationSchema={validationSchemaCheckOTP}
                    initialValues={{ checkOTP: '' }}
                    innerRef={ref}
                >
                    <h1 className="mb-6 text-black font-inter text-2xl font-semibold text-center">Verify the OTP</h1>
                    <div className="mb-6">
                        <InputField label="Check OTP In Email" type="text" name="checkOTP" placeholder="OTP Number" />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button title="Confirm OTP" onClick={()=> handleSubmitCheckOTP(ref.current?.values)}/>
                        <button
                            type="button"
                            onClick={() => setRegisterForm('authRegister')}
                            className="btn-primary flex justify-center text-white bg-blue-900 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-900/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-blue-900/55 me-2 ml-2"
                        >
                            Back to Register
                        </button>
                    </div>
                </Form>
            )}
            {registerForm === 'jobonicRegister' && (
                <Form
                    onSubmit={handleSubmitJobonicRegister}
                    validationSchema={validationSchemaJobonic}
                    initialValues={{
                        phoneNumber: '',
                        address: '',
                        cardNumber: '',
                        cardExpiryDate: '',
                        walletAddress: ''
                    }}
                    innerRef={ref}
                >
                    <h1 className="mb-6 text-black font-inter text-2xl font-semibold text-center">Complete Your Jobonic Registration</h1>
                    <div className="mb-6">
                        <InputField label="Phone Number" type="text" name="phoneNumber" placeholder="Phone Number" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Address" type="text" name="address" placeholder="Address" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Card Number" type="text" name="cardNumber" placeholder="Card Number" />
                    </div>
                    <div className="mb-6">
                        <InputField label="Card Expiry Date" type="text" name="cardExpiryDate" placeholder="Card Expiry Date" />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            title="Complete Registration"
                            onClick={() => handleSubmitJobonicRegister(ref.current?.values)}
                        />
                        <Button 
                         title="Back to register"
                         onClick={() => setRegisterForm('authRegister')}
                        />
                    </div>
                </Form>
            )}
            <div className="mt-6 text-sm text-center text-gray-500">
                Already have an account?{' '}
                <Link href="https://auth.laconic.co.th/authentication?page=login">
                    <span className="font-medium text-blue-600 hover:text-orange-500">Login here</span>
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
