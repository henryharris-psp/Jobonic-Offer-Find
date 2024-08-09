"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import httpClient from "@/client/httpClient";
import { baseURL, SERVER_AUTH, token } from "@/baseURL";

// Define types for the User and SkillInstance
type User = {
    name: string;
    services: string[];
    description: string;
    skills: string[];
    experience: string[];
    education: string[];
    otherInformation: string[];
};

type SkillInstance = {
    id: string;
    name: string;
};

// Component to select skills and experience
function ComponentSelectSkills() {
    const router = useRouter(); // Initialize router for navigation
    const searchParams = useSearchParams(); // Get URL search parameters
    const serviceId = searchParams.get("serviceId"); // Get the 'serviceId' from the URL parameters

    // Dummy user data for experience display
    const user: User = {
        name: "emm",
        services: ["Service 1", "Service 2", "Service 3"],
        description: "This is a dummy description.",
        skills: ["UI/UX Design", "Photography", "Pottery", "Driving"],
        experience: [
            "UI/UX Designer in Google",
            "Freelance Photographer for 5 years",
            "Pottery Certificate",
        ],
        education: ["School 1", "School 2", "School 3"],
        otherInformation: ["random", "languages", "certifications"],
    };

    // State variables to manage selected experience, skills, service data, and search term
    const [selectedExperience, setSelectedExperience] = useState<string>("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [serviceData, setServiceData] = useState<any>(null);
    const [skills, setSkillsList] = useState<SkillInstance[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Fetch service data using the service ID
    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await httpClient.get(`${SERVER_AUTH}/v1/user/init-data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': 'application/json'
                    }
                });
                const userData = response.data;
                const userId = userData.id;

                const servicesResponse = await httpClient.get(`http://localhost:8081/api/v1/service/user`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "accept": "application/json",
                    },
                    params: { profileId: userId }
                });

                const service = servicesResponse.data.find((service: any) => service.id === serviceId);
                setServiceData(service);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchServiceData();
    }, [serviceId]);

    // Fetch all available skills
    const fetchSkills = async () => {
        try {
            const response = await httpClient.get(`${baseURL}/api/v1/skill/all`);
            console.log("Skills fetched:", response.data);
            setSkillsList(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };

    // Fetch skills when the component mounts
    useEffect(() => {
        fetchSkills();
    }, []);

    // Handle click on experience item
    const handleExperienceClick = (experience: string) => {
        setSelectedExperience(experience);
    };

    // Handle click on skill item, toggle selection
    const handleSkillClick = (skill: SkillInstance) => {
        setSelectedSkills((prevSelectedSkills) => {
            if (prevSelectedSkills.includes(skill.name)) {
                return prevSelectedSkills.filter((s) => s !== skill.name);
            } else {
                return [...prevSelectedSkills, skill.name];
            }
        });
    };

    // Handle save skills and experience, and update service data
    const handleSaveSkillsExperience = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!serviceId || !serviceData) {
            console.error("Service ID or service data is not available.");
            return;
        }

        const updateData = {
            id: serviceData.serviceOfferDTO.id,
            description: serviceData.serviceOfferDTO.description,
            bankCardNumber: serviceData.serviceOfferDTO.bankCardNumber,
            email: serviceData.serviceOfferDTO.email,
            startDate: serviceData.serviceOfferDTO.startDate,
            phone: serviceData.serviceOfferDTO.phone,
            address: serviceData.serviceOfferDTO.address,
            skills: selectedSkills.join(", "), // Join selected skills into a comma-separated string
            experience: selectedExperience,
            draftCount: serviceData.serviceOfferDTO.draftCount,
            title: "Teacher",
            workCategory: "DEVELOPMENT",
            employmentType: "PART_TIME",
            descriptionI: "Code",
            descriptionII: "Teach",
            descriptionIII: "Play with kids",
            price: 2,
            languageSpoken: "English",
            location: "On Nut"
        };

        const endpoint = `http://localhost:8081/api/v1/service/updateOffer?serviceOfferId=${serviceData.serviceOfferDTO.id}`;
        console.log('Updating service with data:', updateData);
        console.log('Endpoint:', endpoint);

        try {
            const response = await httpClient.put(endpoint, updateData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            router.push("/aiServiceMatches"); // Redirect to service matches page after updating
        } catch (error) {
            console.error("Error saving skills and experience:", error);
        }
    };

    // Filter skills based on search term
    const filteredSkills = skills.filter(skill =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="m-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
                Select the skills and experience that match this service
            </h2>
            {/* Skills and Experience wrapper */}
            <div className="flex flex-col justify-around w-full px-80 pb-4">
                {/* Display Skills */}
                <div className="pb-4">
                    <h3 className="text-2xl font-bold mb-2 text-center">Skills</h3>
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
                                className={`btn ${selectedSkills.includes(skill.name)
                                    ? "bg-[#0B2147] text-white"
                                    : "bg-white text-gray-900"
                                } border border-gray-300 rounded-lg p-2 mb-2`}
                                onClick={() => handleSkillClick(skill)}
                            >
                                {skill.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Display Experience */}
                <div>
                    <h3 className="text-2xl font-bold mb-2 text-center">Experience</h3>
                    <div className="flex flex-col">
                        {user.experience.map((exp, index) => (
                            <button
                                key={index}
                                className={`btn ${selectedExperience === exp
                                    ? "bg-[#0B2147] text-white"
                                    : "bg-white text-gray-900"
                                } border border-gray-300 rounded-lg p-2 mb-2`}
                                onClick={() => handleExperienceClick(exp)}
                            >
                                {exp}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full mt-4">
                <button
                    onClick={(e) => handleSaveSkillsExperience(e)}
                    className="text-white bg-[#0B2147] hover:bg-[#D0693B] py-2 px-6 rounded-lg text-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

// Main component with suspense for lazy loading
function SelectSkills() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ComponentSelectSkills />
            </Suspense>
        </div>
    );
}

export default SelectSkills;
