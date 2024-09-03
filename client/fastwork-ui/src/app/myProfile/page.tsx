"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import httpClient from "@/client/httpClient";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

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

type SkillInstance = {
    id: string;
    name: string;
};

type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    address: string;
    image: string;
    cardNumber: string;
    cardExpiryDate: string;
    walletAddress: string;
    review: number;
    userExperienceList: ExperienceInstance[];
    userEducationList: EducationInstance[];
    skills: [
        {
            id: string;
            name: string;
        }
    ];
    userId: number;
};

const MyProfile = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);

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
    const [cryptoType, setCryptoType] = useState<string>("");
    const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
    const [review, setReview] = useState<number>(0);

    const [aboutMeField, setAboutMeField] = useState<string>("");
    const [skillsField, setSkillsField] = useState<string>("");

    const [experienceList, setExperienceList] = useState<ExperienceInstance[]>(
        []
    );
    const [companyField, setCompanyField] = useState<string>("");
    const [experienceStartDateField, setExperienceStartDateField] =
        useState<string>("");
    const [experienceEndDateField, setExperienceEndDateField] =
        useState<string>("");

    const [educationList, setEducationList] = useState<EducationInstance[]>([]);
    const [institutionField, setInstitutionField] = useState<string>("");
    const [degreeField, setDegreeField] = useState<string>("");
    const [startDateField, setStartDateField] = useState<string>("");
    const [endDateField, setEndDateField] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("CREDIT_CARD");
    const [receivePaymentMethod, setReceivePaymentMethod] =
        useState<string>("CREDIT_CARD");

    const [formState, setFormState] = useState({
        education: {
            id: "",
            profileId: 0,
            institute: "",
            degree: "",
            startDate: "",
            endDate: "",
        },
        experience: {
            id: "",
            profileId: 0,
            company: "",
            experienceStartDate: "",
            experienceEndDate: "",
        },
    });

    const [otherInfoField, setOtherInfoField] = useState<string>("");

    // Focus Control
    const aboutMeRef = useRef<HTMLInputElement>(null);
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
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [userSkillsList, setUserSkillsList] = useState<SkillInstance[]>([]);

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
        console.log(showNewEntry[inputKey]);
    };

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { id, value } = event.target;
        const [section, field] = id.split(".");
        // setFormState((prevState) => ({
        //     ...prevState,
        //     [section]: {
        //         ...prevState[section],
        //         [field]: value,
        //     },
        // }));
    };

    const handleSave = async (inputKey: string) => {
        console.log(`handleSave called for ${inputKey}`);
        console.log(formState);
        console.log(formState.education);
        //setUserId(await (getProfileId()));
        //const userId = await getProfileId();
        let educationEntry = {
            id: dummyPostId,
            profileId: userId,
            institute: formState.education.institute,
            degree: formState.education.degree,
            startDate: formState.education.startDate,
            endDate: formState.education.endDate,
        };
        let experienceEntry = {
            id: dummyPostId,
            profileId: userId,
            company: formState.experience.company,
            startDate: formState.experience.experienceStartDate,
            endDate: formState.experience.experienceEndDate,
        };
        let skillsEntry = {
            profileId: userId,
            skillIds: selectedSkills,
        };
        console.log(educationEntry);
        console.log(experienceEntry);
        console.log(selectedSkills);
        try {
            if (inputKey == "user-education") {
                const response = await httpClient.post(inputKey, educationEntry );
                console.log("Save successful:", response.data);
            } else if (inputKey == "user-experience") {
                const response = await httpClient.post(inputKey, experienceEntry );
                console.log("Save successful:", response.data);
            } else if (inputKey == "skills") {
                const skillIdsParams = selectedSkills
                    .map((skillId) => `skillIds=${skillId}`)
                    .join("&");
                const response = await httpClient.post(`user-skill?profileId=${userId}&${skillIdsParams}`);
                console.log("Save successful:", response.data);
            }
            if (inputKey == "user-education") {
                setEducationList((prevList: EducationInstance[]) => [
                    ...prevList,
                    educationEntry,
                ]);
                console.log(educationList);
            } else if (inputKey == "user-experience") {
                setExperienceList((prevList: ExperienceInstance[]) => [
                    ...prevList,
                    experienceEntry,
                ]);
                console.log(experienceList);
            } else if (inputKey == "skills") {
                //setSkillsField(skillsEntry.skills);
                console.log(skillsField);
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
            const response = await httpClient.get("skill/all");
            setSkillsList(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    const fetchUserSkills = async () => {
        try {
            const response = await httpClient.get(`user-skill/all?profileId=${userId}`);
            const displayData = response.data.reverse();
            setUserSkillsList(displayData);
        } catch (error) {
            console.error("Error fetching user skills:", error);
        }
    };

    const fetchEducation = async () => {
        try {
            const response = await httpClient.get(`user-education/all?userId=${userId}`);
            const displayData = response.data.reverse();
            setEducationList(displayData);
        } catch (error) {
            console.error("Error fetching education:", error);
        }
    };

    const fetchExperience = async () => {
        //const userId = await getProfileId();
        try {
            const response = await httpClient.get(`user-experience/all?userId=${userId}`);
            const displayData = response.data.reverse();
            setExperienceList(displayData);
        } catch (error) {
            console.error("Error fetching experience:", error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    useEffect(() => {
        console.log(skills);
    }, [skills]);

    useEffect(() => {
        console.log(userSkillsList);
    }, [userSkillsList]);

    // Fetch userdata
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUserData = async () => {
            try {
                const res = await httpClient.post(`user/get-user-all-info/${authUser?.id}`, {}, { signal });
                const userData = res.data;
                const jobonicId = userData.id;

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
        return () => controller.abort();
    }, []);

    useEffect(() => {
        // This effect runs whenever userId changes
        fetchEducation();
        fetchExperience();
        fetchUserSkills();
        console.log(userId);
    }, [userId]);

    const filteredSkills = skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSkillClick = (skill: SkillInstance) => {
        console.log(skill.name);
        setSelectedSkills((prevSelectedSkills) => {
            // fix code
            if (prevSelectedSkills.includes(skill.id)) {
                return prevSelectedSkills.filter((s) => s !== skill.id);
            } else {
                return [...prevSelectedSkills, skill.id];
            }
        });
    };

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
                <h3 className="text-2xl font-semibold text-gray-900 ml-8">
                    emm
                </h3>
            </div>

            {/* About Me */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        About Me
                    </h2>
                </div>
                <h3 className="text-lg font-medium text-gray-400">
                    This was written with AI from what you&apos;ve written.
                    Click to edit and make it more you!
                </h3>
                <input
                    type="text"
                    id="about-me"
                    placeholder={
                        !aboutMeField
                            ? "incoming bza student from nus"
                            : aboutMeField
                    }
                    className={`text-black ${
                        enabledInputs["aboutMe"]
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
                </div>
                <div className="flex flex-wrap mb-4">
                    {userSkillsList.map((skill) => (
                        <div
                            key={skill.id}
                            className="bg-gray-200 text-gray-900 p-2 m-1 rounded"
                        >
                            {skill.name}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
                />
                <div className="flex flex-col max-h-80 overflow-y-auto">
                    {filteredSkills.map((skill, index) => (
                        <button
                            key={index}
                            className={`btn ${
                                selectedSkills.includes(skill.name)
                                    ? "bg-[#0B2147] text-white"
                                    : "bg-white text-gray-900"
                            } border border-gray-300 rounded-lg p-2 mb-2`}
                            onClick={() => handleSkillClick(skill)}
                        >
                            {skill.name}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => handleSave("skills")}
                    className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded"
                >
                    Save
                </button>
                {feedbackMessage["skills"] && (
                    <p className="text-sm mt-2">{feedbackMessage["skills"]}</p>
                )}
            </div>

            {/* Education */}
            <div className="flex flex-col justify-start w-full pb-16 space-y-2.5">
                <div className="flex flex-row space-x-2 items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Education
                    </h2>
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
                    <h3 className="text-xs text-grey-400 items-center select-none">
                        Add Education
                    </h3>
                </div>
                <div className="">
                    {showNewEntry["user-education"] && (
                        <div className="space-y-2.5 bg-white p-4 border-b">
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">
                                    Education Institution
                                </h3>
                                <input
                                    type="text"
                                    id="education.institute"
                                    placeholder="Enter your institution"
                                    className={`text-black col-span-2 ${
                                        enabledInputs["user-education"]
                                            ? "border bg-white"
                                            : "border-none bg-transparent"
                                    } rounded`}
                                    ref={institutionRef}
                                    disabled={!enabledInputs["user-education"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Degree</h3>
                                <input
                                    type="text"
                                    id="education.degree"
                                    placeholder="Enter your degree"
                                    className={`text-black w-full col-span-2 ${
                                        enabledInputs["user-education"]
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
                                    id="education.startDate"
                                    placeholder="Enter start date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${
                                        enabledInputs["user-education"]
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
                                    id="education.endDate"
                                    placeholder="Enter end date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${
                                        enabledInputs["user-education"]
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
                        <div
                            key={index}
                            className="space-y-2.5 bg-white p-4 border-b"
                        >
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">
                                    Education Institution
                                </h3>
                                <input
                                    type="text"
                                    id="education.institute"
                                    value={education.institute}
                                    className="text-black col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Degree</h3>
                                <input
                                    type="text"
                                    id="education.degree"
                                    value={education.degree}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Start Date</h3>
                                <input
                                    type="date"
                                    id="education.startDate"
                                    value={education.startDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">End Date</h3>
                                <input
                                    type="date"
                                    id="education.endDate"
                                    value={education.endDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                        </div>
                    ))}

                    {enabledInputs["user-education"] && (
                        <button
                            onClick={() => handleSave("user-education")}
                            className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    )}
                    {feedbackMessage["education"] && (
                        <p className="text-sm mt-2">
                            {feedbackMessage["education"]}
                        </p>
                    )}
                </div>
            </div>

            {/* Experience */}
            <div className="flex flex-col justify-start w-full pb-16 space-y-2.5">
                <div className="flex flex-row space-x-2 items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Experience
                    </h2>
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
                    <h3 className="text-xs text-grey-400 items-center select-none">
                        Add Experience
                    </h3>
                </div>
                <div className="">
                    {showNewEntry["user-experience"] && (
                        <div className="space-y-2.5 bg-white p-4 border-b">
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Company</h3>
                                <input
                                    type="text"
                                    id="experience.company"
                                    placeholder="Enter your company"
                                    className={`text-black col-span-2 ${
                                        enabledInputs["user-experience"]
                                            ? "border bg-white"
                                            : "border-none bg-transparent"
                                    } rounded`}
                                    ref={companyRef}
                                    disabled={!enabledInputs["user-experience"]}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Start Date</h3>
                                <input
                                    type="date"
                                    id="experience.experienceStartDate"
                                    placeholder="Enter start date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${
                                        enabledInputs["user-experience"]
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
                                    id="experience.experienceEndDate"
                                    placeholder="Enter end date (YYYY-MM-DD)"
                                    className={`text-black w-full col-span-2 ${
                                        enabledInputs["user-experience"]
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
                        <div
                            key={index}
                            className="space-y-2.5 bg-white p-4 border-b"
                        >
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Company</h3>
                                <input
                                    type="text"
                                    id="experience.company"
                                    value={exp.company}
                                    className="text-black col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">Start Date</h3>
                                <input
                                    type="date"
                                    id="experience.experienceStartDate"
                                    value={exp.startDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-3 items-center">
                                <h3 className="flex flex-col">End Date</h3>
                                <input
                                    type="date"
                                    id="experience.experienceEndDate"
                                    value={exp.endDate}
                                    className="text-black w-full col-span-2 border bg-white rounded"
                                    disabled
                                />
                            </div>
                        </div>
                    ))}

                    {enabledInputs["user-experience"] && (
                        <button
                            onClick={() => handleSave("user-experience")}
                            className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    )}
                    {feedbackMessage["experience"] && (
                        <p className="text-sm mt-2">
                            {feedbackMessage["experience"]}
                        </p>
                    )}
                </div>
            </div>

            {/* Other Information */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Other Information
                    </h2>
                </div>
                <input
                    type="text"
                    id="otherInfo"
                    placeholder={
                        !otherInfoField
                            ? "Enter something about yourself"
                            : otherInfoField
                    }
                    className={`text-black ${
                        enabledInputs["otherInfo"]
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
                    <p className="text-sm mt-2">
                        {feedbackMessage["otherInfo"]}
                    </p>
                )}
            </div>

            {/* Additional Financial Information */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Financial Information
                    </h2>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="credit-card"
                    >
                        Credit Card Number
                    </label>
                    <input
                        type="text"
                        id="credit-card"
                        placeholder="e.g. 1234 5678 9123 4567"
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="card-expiry-date"
                    >
                        Card Expiry Date
                    </label>
                    <input
                        type="text"
                        id="card-expiry-date"
                        placeholder="MM/YY"
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) =>
                            setCardExpiryDate(e.target.value as unknown as Date)
                        }
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="bank-account"
                    >
                        Bank Account Number
                    </label>
                    <input
                        type="text"
                        id="bank-account"
                        placeholder="e.g. 1234567890"
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="crypto-address"
                    >
                        Cryptocurrency Address
                    </label>
                    <input
                        type="text"
                        id="crypto-address"
                        placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setWalletAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="crypto-type"
                    >
                        Type of Cryptocurrency
                    </label>
                    <input
                        type="text"
                        id="crypto-type"
                        placeholder="e.g. Bitcoin, Ethereum"
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setCryptoType(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="payment-method"
                    >
                        Select how you want to pay
                    </label>
                    <select
                        id="payment-method"
                        value={paymentMethod}
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="CRYPTOCURRENCY">Cryptocurrency</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-lg font-semibold mb-2"
                        htmlFor="payment-receive-method"
                    >
                        Select how you want to be paid
                    </label>
                    <select
                        id="payment-receive-method"
                        value={receivePaymentMethod}
                        className="block w-full p-5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) =>
                            setReceivePaymentMethod(e.target.value)
                        }
                    >
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="CRYPTOCURRENCY">Cryptocurrency</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;