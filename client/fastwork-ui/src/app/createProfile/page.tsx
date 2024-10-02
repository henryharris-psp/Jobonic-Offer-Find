'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import httpClient from '@/client/httpClient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateAuthUser } from '@/store/reducers/authReducer';

const countryCodes = [
    { code: '+65', name: 'Singapore' },
    { code: '+66', name: 'Thailand' },
    { code: '+91', name: 'India' },
    // Add more country codes here
];

export default function CreateProfile(): React.ReactNode {
    const router = useRouter();
    const dispatch = useDispatch();

    const { authUser } = useSelector((state: RootState) => state.auth);
    const [userId, setUserId] = useState<string | null>(null);
    const [page1, setPage1] = useState(false);
    const [page2, setPage2] = useState(false);
    const [page3, setPage3] = useState(false);

    const [countryCode, setCountryCode] = useState(countryCodes[0].code);
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [roles, setRoles] = useState([]);
    const [email, setEmail] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [image, setImage] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiryDate, setCardExpiryDate] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [numReviews, setNumReviews] = useState(0);
    const [userExperienceList, setUserExperienceList] = useState([]);
    const [userEducationList, setUserEducationList] = useState([]);
    const [skills, setSkills] = useState([]);
    const [phoneError, setPhoneError] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store the file
    const [fileError, setFileError] = useState('');
    const [isSubmitted , setIsSubmitted] = useState(false);
    const handleBack = () => {
        if (page3) {
            setPage3(false);
        } else if (page2) {
            setPage2(false);
        } else if (page1) {
            setPage1(false);
        } else {
            router.back();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file); // Store the selected file
            setFileError(''); // Clear error if file is selected
        }
    };


    const handleNext = () => {
        if (!contactNumber) {
            setPhoneError('Phone number is required...');
            return; // Stop here if validation fails
        } else {
            setPhoneError(''); // Clear error if phone number is provided
            // Proceed to the next step (or submit form)
            console.log('Proceeding with valid data...');
        }
        if (!page1) {
            setPage1(true);
        } else if (!page2) {
            setPage2(true);
        } else if (!page3) {
            setPage3(true);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const laconicAuthServerUrl = process.env.NEXT_PUBLIC_LACONIC_AUTH_SERVER_URL;
                const response = await httpClient.get(`${laconicAuthServerUrl}/user/init-data`);
                const userData = response.data;
                console.log('User Data Id: ', userData.id);
                setUserId(userData.id); // Set dynamic userId
                setContactNumber(userData.phoneNumber);
                setAddress(userData.address);
                setRoles(userData.roles);
                setEmail(userData.email || '');
                setCompanyName(userData.companyName || '');
                setImage(userData.image || '');
                setCardNumber(userData.cardNumber || '');
                setCardExpiryDate(userData.cardExpiryDate || '');
                setWalletAddress(userData.walletAddress || '');
                setNumReviews(userData.numReviews || 0);
                setUserExperienceList(userData.userExperienceList || []);
                setUserEducationList(userData.userEducationList || []);
                setSkills(userData.skills || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Prevent default form submission
    
        if (!selectedFile) { // Check if a file is uploaded
            setFileError('Please upload a file'); // Show error message if no file is selected
            return; // Stop further execution
        }
    
        setPage3(true); // Proceed to page 3 only if file is uploaded
    
        if (!userId) {
            console.error('User ID is not available.');
            return;
        }
    
        const fullPhoneNumber = `${countryCode}${contactNumber}`;
        const userData = {
            id: userId, // Dynamic userId
            email,
            companyName,
            phoneNumber: fullPhoneNumber,
            address,
            image,
            cardNumber,
            cardExpiryDate,
            walletAddress,
            numReviews,
            userExperienceList,
            userEducationList,
            skills,
            userId: userId,
        };
    
        try {
            const res = await httpClient.post(`/user`, userData);
            const newProfile = res.data;
            dispatch(updateAuthUser({
                ...authUser,
                profile: newProfile
            }))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error updating user from Axios:', error.response?.data || error.message);
            } else {
                console.error('Error updating user:', error);
            }
        }
    };
    
    if (!page1 && !page2 && !page3) {
        return !authUser ? (
            <div className="flex-1 h-screen flex items-center justify-center">
                <span>Please Login first</span>
            </div>
        ) : (
            <div className="flex flex-col justify-center items-center mx-auto w-[50%] my-12">
                <h2 className="text-xl w-auto font-bold text-cyan-900 mb-2 text-center">
                    It seems like you do not have a profile yet.
                </h2>
                <h2 className="text-xl font-bold text-cyan-900 mb-6 text-center">
                    Let&apos;s make a Jobonic Profile
                </h2>
                {/* Flex container for country code and phone number */}
                <div className="max-w-4xl mx-auto w-full flex justify-center items-center gap-4 relative">
                    <div className="w-34-m">
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="p-3 text-cyan-900 border font-semibold border-gray-300 rounded-lg bg-gray-100 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                        >
                            {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <input
                            type="tel"
                            id="contact-number"
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChange={(e) => {
                                setContactNumber(e.target.value); // Update phone number state
                                if (e.target.value) {
                                    setPhoneError(''); // Clear error when the phone number is valid
                                }
                            }}
                            className="p-3 text-cyan-900 border font-semibold border-gray-300 rounded-lg bg-gray-100 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                        />

                    </div>
                </div>
                {phoneError && <p className='font-semibold text-red-500 mt-1 text-sm'>{phoneError}</p>}

                <div className="max-w-4xl mx-auto w-full mt-4">
                    <textarea
                        cols={5}
                        id="address"
                        placeholder="home/company address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="p-3 text-cyan-900 border font-semibold border-gray-300 rounded-lg bg-gray-100 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                    />
                </div>
                <div className="mt-4 flex justify-center items-center">
                    <button
                        onClick={handleBack}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm mr-5"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm"
                        style={{ borderColor: 'transparent' }}
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    } else if (page1 && !page2 && !page3) {
        return (
            <div className="flex flex-col justify-center items-center mx-auto w-[50%] my-12">
                <h2 className="text-2xl font-bold text-cyan-900 mb-6 text-center">Verify your phone number</h2>
                <div className="max-w-xl mx-auto w-full flex flex-col justify-center items-center">
                    <div className=" w-full mb-4"
                    >
                        <input type="text" id="phone-number-otp" placeholder="Phone number OTP"
                            value={phoneOtp}
                            onChange={(e) => setPhoneOtp(e.target.value)}
                            className="p-3 w-full font-semibold text-cyan-900 border border-gray-300 rounded-lg bg-gray-100 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-4" />
                    </div>
                    <div className="w-full mb-4"
                    >
                        <a href="#" id="resend-otp-link" className="text-blue-600 hover:text-teal-600 font-semibold text-sm text-center">Resend OTP</a>
                    </div>
                </div>
                <div className="mt-4 flex justify-center items-center">
                    <button
                        onClick={handleBack}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm mr-5"
                    >
                        Back
                    </button>
                    <button onClick={() => setPage2(true)}
                        className="text-white fontd-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm"
                        style={{ borderColor: 'transparent' }}>Verify OTP
                    </button>
                </div>
            </div>
        );
    } else if (page1 && page2 && !page3) {
        return (
            <div className="flex flex-col justify-center items-center mx-auto w-[50%] my-12">
                <h2 className="text-2xl font-bold text-cyan-900 mb-2 text-center">Verify your identity</h2>
                <h3 className="text-2xl font-bold text-cyan-900 mb-4 text-center">Upload a picture of your ID card so we can confirm you are a real person</h3>
                <div className="max-w-4xl mx-auto w-full mt-8 mb-8">
                    <label className="block mb-2 text-sm text-cyan-900 ml-4 font-semibold dark:text-white" htmlFor="file_input">Upload file</label>
                    <input className="block w-full text-sm font-semibold text-cyan-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file_input"
                        type="file"
                        onChange={handleFileChange}
                    />
                    {fileError && <p className="text-red-500 font-semibold text-sm mt-2">{fileError}</p>} 
                </div>
                <Image src={'/thai-national-id.jpg'} alt="thai-id" width={250} height={250} />
                <div className="mt-4">
                    <button
                        onClick={handleBack}
                        className="text-white bg-[#0B2147] font-semibold hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm mr-5"
                        style={{ borderColor: 'transparent' }}
                    >
                        Back
                    </button>
                    <button onClick={(event: React.FormEvent<HTMLButtonElement>) => handleSubmit(event)}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm"
                        style={{ borderColor: 'transparent' }}>Submit
                    </button>

                </div>

            </div>
        );
    } else if (page1 && page2 && page3) {
        return (
            <div className="flex flex-col justify-center items-center mx-auto w-[50%] my-12">
                <h2 className="text-2xl font-bold text-cyan-900 mb-2 text-center">Share more about yourself!</h2>
                <h2 className="text-xl font-semibold text-gray-400 mb-4 text-center">A detailed profile adds to your credibility as you offer services.</h2>
                <div className="mt-4 grid grid-cols-1">
                    <button onClick={() => router.push('/myProfile')}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm mb-4"
                        style={{ borderColor: 'transparent' }}>Upload from LinkedIn
                    </button>
                    <button onClick={() => router.push('/myProfile')}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm mb-4"
                        style={{ borderColor: 'transparent' }}>Upload resume
                    </button>
                    <button onClick={() => router.push('/myProfile')}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm mb-4"
                        style={{ borderColor: 'transparent' }}>Create profile manually
                    </button>
                    <button
                        onClick={handleBack}
                        className="text-white font-semibold bg-[#0B2147] hover:bg-[#D0693B] pt-3 pb-3 pl-8 pr-8 rounded-2xl text-sm"
                        style={{ borderColor: 'transparent' }}
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    return null;
}


