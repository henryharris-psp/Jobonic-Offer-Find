"use client";

import React, { RefObject, useState, useRef, useEffect } from "react";
import Image from "next/image";
import {baseURL, SERVER_AUTH, token} from "@/baseURL";
import { useRouter } from "next/navigation";
import httpClient from '@/client/httpClient';

type EducationInstance = {
    id: string;
    profileId: number;
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
};

type ExperienceInstance = {
    id: string;
    profileId: number;
    company: string;
    startDate: string;
    endDate: string;
};

type User = {
    "id": number,
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "companyName": string,
    "phoneNumber": string,
    "address": string,
    "image": string,
    "cardNumber": string,
    "cardExpiryDate": string,
    "walletAddress": string,
    "review": number,
    "userExperienceList": ExperienceInstance[],
    "userEducationList": EducationInstance[],
    "skills": [
    {
        "id": string,
        "name": string
    }
],
    "userId": number
}

export default function MyProfile(): React.ReactNode {
    const [manualProfile, setManualProfile] = useState(true);

    // userProfilefields
    const [userId, setUserId] = useState(0);
    const [companyName, setCompanyName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardExpiryDate, setCardExpiryDate] = useState<Date>(new Date());
    const [walletAddress, setWalletAddress] = useState<string>("");
    const [review, setReview] = useState<number>(0);

    const [aboutMeField, setAboutMeField] = useState<string>("");
    const [skillsField, setSkillsField] = useState<string>("");

    const [experienceList, setExperienceList] = useState<ExperienceInstance[]>([]);
    const [companyField, setCompanyField] = useState<string>("");
    const [experienceStartDateField, setExperienceStartDateField] = useState<string>("");
    const [experienceEndDateField, setExperienceEndDateField] = useState<string>("");

    const [educationList, setEducationList] = useState<EducationInstance[]>([]);
    const [educationEntry, setEducationEntry] = useState<EducationInstance>();
    const [institutionField, setInstitutionField] = useState<string>("");
    const [degreeField, setDegreeField] = useState<string>("");
    const [startDateField, setStartDateField] = useState<string>("");
    const [endDateField, setEndDateField] = useState<string>("");
    const [formState, setFormState] = useState({
        education: {
            id: '',
            profileId: 0,
            institute: '',
            degree: '',
            startDate: '',
            endDate: '',
        },
        experience: {
            id: '',
            profileId: 0,
            company: '',
            experienceStartDate: '',
            experienceEndDate: '',
        }
    });

    const [otherInfoField, setOtherInfoField] = useState<string>("");

    // Focus Control
    const aboutMeRef = useRef<HTMLInputElement>(null);
    const skillsRef = useRef<HTMLInputElement>(null);
    const institutionRef = useRef<HTMLInputElement>(null);
    const degreeRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const otherInfoRef = useRef<HTMLInputElement>(null);
    const companyRef = useRef<HTMLInputElement>(null);
    const experienceStartDateRef = useRef<HTMLInputElement>(null);
    const experienceEndDateRef = useRef<HTMLInputElement>(null);

    const [showFields, setShowFields] = useState(false); //education
    const [showExperienceFields, setShowExperienceFields] = useState(false);
    const [skills, setSkillsList] = useState<SkillInstance[]>([]);

    const [enabledInputs, setEnabledInputs] = useState<{
        [key: string]: boolean;
    }>({
        aboutMe: false,
        skills: false,
        "user-experience": false,
        "user-education": false,
        otherInfo: false,
    });

    const [showNewEntry, setShowNewEntry] = useState<{
        [key: string]: boolean;
    }>({
        aboutMe: false,
        skills: false,
        "user-experience": false,
        "user-education": false,
        otherInfo: false,
    });

    const [feedbackMessage, setFeedbackMessage] = useState<{
        [key: string]: string;
    }>({
        aboutMe: "",
        skills: "",
        "user-experience": "",
        "user-education": "",
        otherInfo: "",
    });

    const [data, setData] = useState<{
        [key: string]: [];
    }>({
        aboutMe: [],
        skills: [],
        "user-experience": [],
        "user-education": [],
        otherInfo: [],
    });

    const router = useRouter();
    const dummyPostId = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
    const replaceURL = 'http://localhost:8081'

    // const handleEdit = (ref: RefObject<HTMLInputElement>, inputKey: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    //     event.stopPropagation();
    //     setEnabledInputs((prevState) => ({
    //         ...prevState,
    //         [inputKey]: true,
    //     }));
    //     if (ref.current) {
    //         ref.current.focus();
    //     }
    // };

    const addMode = (
        inputKey: string,
        event: React.MouseEvent<SVGSVGElement, MouseEvent>
    ) => {
        event.stopPropagation();
        setEnabledInputs((prevState) => ({
            ...prevState,
            [inputKey]: !enabledInputs[inputKey],
        }));
        setShowNewEntry((prevState) => ({
            ...prevState,
            [inputKey]: !showNewEntry[inputKey],
        }));
        console.log(inputKey);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setFormState(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSave = async (inputKey: string) => {
        console.log(`handleSave called for ${inputKey}`);
        console.log(formState);
        console.log(formState.education);
        let educationEntry = {
            id: dummyPostId,
            profileId: userId,
            institute: formState.education.institute,
            degree: formState.education.degree,
            startDate: formState.education.startDate,
            endDate: formState.education.endDate,
        }
        let experienceEntry = {
            id: dummyPostId,
            profileId: userId,
            company: formState.experience.company,
            startDate: formState.experience.experienceStartDate,
            endDate: formState.experience.experienceEndDate,
        }
        console.log(educationEntry);
        console.log(experienceEntry);
        try {
            if (inputKey == "user-education") {
                const response = await httpClient.post(`${replaceURL}/api/v1/${inputKey}`, educationEntry, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });
                console.log("Save successful:", response.data);
            } else if (inputKey == 'user-experience') {
                const response = await httpClient.post(`${replaceURL}/api/v1/${inputKey}`, experienceEntry, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                console.log("Save successful:", response.data);
            }
            // setEnabledInputs((prevState) => ({
            //     ...prevState,
            //     [inputKey]: false,
            // }));
            if (inputKey == "user-education") {
                setEducationList((prevList:EducationInstance[]) => [...prevList, educationEntry]);
            } else if (inputKey == "user-experience") {
                setExperienceList((prevList:ExperienceInstance[]) => [...prevList, experienceEntry]);
            }
            setShowNewEntry((prevState) => ({
                ...prevState,
                [inputKey]: false,
            }));
            setFeedbackMessage((prevState) => ({
                ...prevState,
                [inputKey]: "Save successful!",
            }));
        } catch (error) {
            console.log("fail");
            console.error("Error saving data:", error);
            setFeedbackMessage((prevState) => ({
                ...prevState,
                [inputKey]: "Error saving data.",
            }));
        }
    };
    const fetchSkills = async () => {
        try {
            const response = await httpClient.get(`${baseURL}/api/v1/skill/all`);
            //console.log("Skills fetched:", response.data);
            setSkillsList(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    }

    const fetchEducation = async () => {
        try {
            const response = await httpClient.get(`${replaceURL}/api/v1/user-education/all?userId=${userId}`);
            //console.log("Skills fetched:", response.data);
            const displayData = response.data.reverse();
            setEducationList(displayData);
        } catch (error) {
            console.error("Error fetching education:", error);
        }
    }

    const fetchExperience = async () => {
        try {
            const response = await httpClient.get(`${replaceURL}/api/v1/user-experience/all?userId=${userId}`);
            //console.log("Skills fetched:", response.data);
            const displayData = response.data.reverse();
            setExperienceList(displayData);
        } catch (error) {
            console.error("Error fetching experience:", error);
        }
    }

    useEffect(() => {
        fetchSkills();
        //fetchEducation();
    }, []);

    // Fetch userdata
    useEffect(() => {
        let abortController = new AbortController();
        const fetchUserData = async () => {
            try {
                const initResponse = await httpClient.get(`${SERVER_AUTH}/v1/user/init-data`);
                const authServerUserId = initResponse.data;
                const authId = authServerUserId.id;

                const userDataResponse = await httpClient.get(`${replaceURL}/api/v1/user/profile?id=${authId}`);
                const userData = userDataResponse.data;
                console.log(userData);
                const jobonicId = userData.id;
                console.log(jobonicId);
                setUserId(jobonicId);

                setCompanyName(userData.companyName);
                setPhoneNumber(userData.phoneNumber);
                setAddress(userData.address);
                setImage(userData.image);
                setCardNumber(userData.cardNumber);
                setCardExpiryDate(userData.cardExpiryDate);
                setWalletAddress(userData.walletAddress);
                setReview(userData.review);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
        return () => {
            abortController.abort();
        };
    }, []);

    useEffect(() => {
        // This effect runs whenever userId changes
        console.log('User ID updated:', userId);
        fetchEducation();
        fetchExperience();
    }, [userId]);

    return (
        <div className="m-16">
            {manualProfile ? (
                <h2 className="text-2xl font-medium text-gray-400 mb-4 text-center">
                    Here&apos;s what we found from your profile
                </h2>
            ) : null}
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                Let&apos;s create your Jobonic profile!
            </h3>

            {/* Profile Picture and Name */}
            <div className="flex items-center justify-start w-full max-w-md mb-16">
                <Image
                    src="/profile-pic.jpg"
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
                <h3 className="text-2xl font-semibold text-gray-900 ml-8">emm</h3>
            </div>

            {/* About Me */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
                    {/* <svg onClick={(e) => handleEdit(aboutMeRef, "aboutMe", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z" />
                    </svg> */}
                </div>
                <h3 className="text-lg font-medium text-gray-400">
                    This was written with AI from what you&apos;ve written. Click to edit
                    and make it more you!
                </h3>
                <input
                    type="text"
                    id="about-me"
                    placeholder={
                        !aboutMeField ? "incoming bza student from nus" : aboutMeField
                    }
                    className={`text-black ${enabledInputs["aboutMe"]
                        ? "border bg-white"
                        : "border-none bg-transparent"
                        } rounded`}
                    ref={aboutMeRef}
                    disabled={!enabledInputs["aboutMe"]}
                    onChange={(e) => setAboutMeField(e.target.value)}
                />
                {enabledInputs["aboutMe"] && (
                    <button
                        onClick={() => handleSave("aboutMe")}
                        className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                )}
                {feedbackMessage["aboutMe"] && (
                    <p className="text-sm mt-2">{feedbackMessage["aboutMe"]}</p>
                )}
            </div>

            {/* Skills */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                    {/* <svg onClick={(e) => handleEdit(skillsRef, "skills", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z" />
                    </svg> */}
                </div>
                <form className="max-w-sm">
                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a skills</option>
                        {
                            skills.map((skill, index) => (
                                <option key={index} value={skill.name}>{skill.name}</option>
                            ))
                        }
                    </select>
                </form>
                {enabledInputs["skills"] && (
                    <button
                        onClick={() => handleSave("skill")}
                        className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                )}
                {feedbackMessage["skills"] && (
                    <p className="text-sm mt-2">{feedbackMessage["skills"]}</p>
                )}
            </div>

            {/* Education */}
            <div className="flex flex-col justify-start w-full pb-16 space-y-2.5">
                <div className="flex flex-row space-x-2 items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                    <svg
                        onClick={(e) => addMode("user-education", e)}
                        className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <h3 className="text-xs text-grey-400 items-center select-none">Add Education</h3>
                </div>
                <div className="">
                    {showNewEntry['user-education'] && (
                        <div className='space-y-2.5 bg-white p-4 border-b'>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Education Institution</h3>
                                <input
                                    type="text"
                                    id="institute"
                                    placeholder="Enter your institution"
                                    className={`text-black col-span-2 ${enabledInputs["user-education"]
                                        ? "border bg-white"
                                        : "border-none bg-transparent"
                                    } rounded`}
                                    ref={institutionRef}
                                    disabled={!enabledInputs["user-education"]}
                                    onChange={handleChange}/>
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Degree</h3>
                                <input
                                    type="text"
                                    id="degree"
                                    placeholder="Enter your degree"
                                    className={`text-black w-full col-span-2 ${enabledInputs["user-education"]
                                        ? "border bg-white"
                                        : "border-none bg-transparent"
                                    } rounded`}
                                    ref={degreeRef}
                                    disabled={!enabledInputs["user-education"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Start Date</h3>
                                <input
                                    type="date"
                                    id="startDate"
                                    placeholder="Enter start date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${enabledInputs["user-education"]
                                        ? "border bg-white"
                                        : "border-none bg-transparent"
                                    } rounded`}
                                    ref={startDateRef}
                                    disabled={!enabledInputs["user-education"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">End Date</h3>
                                <input
                                    type="date"
                                    id="endDate"
                                    placeholder="Enter end date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${enabledInputs["user-education"]
                                        ? "border bg-white"
                                        : "border-none bg-transparent"
                                    } rounded`}
                                    ref={endDateRef}
                                    disabled={!enabledInputs["user-education"]}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                    {educationList.map((education, index) => (
                        <div key={index} className="space-y-2.5 bg-white p-4 border-b">
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Education Institution</h3>
                                <input
                                    type="text"
                                    id="institute"
                                    value={education.institute}
                                    className="text-black col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Degree</h3>
                                <input
                                    type="text"
                                    id="degree"
                                    value={education.degree}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Start Date</h3>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={education.startDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">End Date</h3>
                                <input
                                    type="date"
                                    id="endDate"
                                    value={education.endDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                        </div>
                    ))}

                    {enabledInputs["user-education"] && (
                        <button onClick={() => handleSave("user-education")}
                            className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                    )}
                    {feedbackMessage["education"] && (
                        <p className="text-sm mt-2">{feedbackMessage["education"]}</p>
                    )}
                </div>
            </div>

            {/* Experience */}
            <div className="flex flex-col justify-start w-full pb-16 space-y-2.5">
                <div className="flex flex-row space-x-2 items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                    <svg
                        onClick={(e) => addMode("user-experience", e)}
                        className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <h3 className="text-xs text-grey-400 items-center select-none">Add Experience</h3>
                </div>
                <div className="">
                    {showNewEntry['user-experience'] && (
                        <div className='space-y-2.5 bg-white p-4 border-b'>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Company</h3>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder="Enter your company"
                                    className={`text-black col-span-2 ${enabledInputs["user-experience"]
                                        ? "border bg-white"
                                        : "border-none bg-transparent"
                                    } rounded`}
                                    ref={companyRef}
                                    disabled={!enabledInputs["user-experience"]}
                                    onChange={handleChange}/>
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Start Date</h3>
                                <input
                                    type="date"
                                    id="experienceStartDate"
                                    placeholder="Enter start date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${enabledInputs["user-experience"]
                                        ? "border bg-white"
                                        : "border-none bg-transparent"
                                    } rounded`}
                                    ref={experienceStartDateRef}
                                    disabled={!enabledInputs["user-experience"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">End Date</h3>
                                <input
                                    type="date"
                                    id="experienceEndDate"
                                    placeholder="Enter end date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${enabledInputs["user-experience"]
                                        ? "border bg-white"
                                        : "border-none bg-transparent"
                                    } rounded`}
                                    ref={experienceEndDateRef}
                                    disabled={!enabledInputs["user-experience"]}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                    {experienceList.map((exp, index) => (
                        <div key={index} className="space-y-2.5 bg-white p-4 border-b">
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Company</h3>
                                <input
                                    type="text"
                                    id="company"
                                    value={exp.company}
                                    className="text-black col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Start Date</h3>
                                <input
                                    type="date"
                                    id="experienceStartDate"
                                    value={exp.startDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">End Date</h3>
                                <input
                                    type="date"
                                    id="experienceEndDate"
                                    value={exp.endDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                        </div>
                    ))}

                    {enabledInputs["user-experience"] && (
                        <button onClick={() => handleSave("user-experience")}
                                className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                    )}
                    {feedbackMessage["experience"] && (
                        <p className="text-sm mt-2">{feedbackMessage["experience"]}</p>
                    )}
                </div>
            </div>

            {/* Other Information */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Other Information
                    </h2>
                    {/* <svg onClick={(e) => handleEdit(otherInfoRef, "otherInfo", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z" />
                    </svg> */}
                </div>
                <input
                    type="text"
                    id="otherInfo"
                    placeholder={
                        !otherInfoField ? "Enter something about yourself" : otherInfoField
                    }
                    className={`text-black ${enabledInputs["otherInfo"]
                        ? "border bg-white"
                        : "border-none bg-transparent"
                    } rounded`}
                    ref={otherInfoRef}
                    disabled={!enabledInputs["otherInfo"]}
                    onChange={(e) => setOtherInfoField(e.target.value)}
                />
                {enabledInputs["otherInfo"] && (
                    <button
                        onClick={() => handleSave("otherInfo")}
                        className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                )}
                {feedbackMessage["otherInfo"] && (
                    <p className="text-sm mt-2">{feedbackMessage["otherInfo"]}</p>
                )}
            </div>
        </div>
    );
}
