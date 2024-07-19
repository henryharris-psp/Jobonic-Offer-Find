"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import httpClient from "@/client/httpClient";
import { baseURL, SERVER_AUTH, token } from "@/baseURL";

type User = {
    name: string;
    services: string[];
    description: string;
    skills: string[];
    experience: string[];
    education: string[];
    otherInformation: string[];
};

export default function SelectSkills() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceId = searchParams.get("serviceId");

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

    const [selectedExperience, setSelectedExperience] = useState<string>("");
    const [serviceData, setServiceData] = useState<any>(null);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                // Fetch user ID and email from init-data
                const response = await httpClient.get(`${SERVER_AUTH}/v1/user/init-data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': 'application/json'
                    }
                });
                const userData = response.data;
                const userId = userData.id;

                // Fetch the list of services by user ID
                const servicesResponse = await httpClient.get(`${baseURL}/api/v1/service/user`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "accept": "application/json",
                    },
                    params: { profileId: userId }
                });

                // Filter the services to find the one with the given serviceId
                const service = servicesResponse.data.find((service: any) => service.id === serviceId);
                setServiceData(service);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchServiceData();
    }, [serviceId]);

    const[skills, setSkillsList] = useState<SkillInstance[]>([]);

    const fetchSkills = async () => {
        try {
            const response = await httpClient.get(`${baseURL}/api/v1/skill/all`);
            console.log("Skills fetched:", response.data);
            setSkillsList(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    }
    useEffect(() => {
        fetchSkills();
    },[]);

    const handleExperienceClick = (experience: string) => {
        setSelectedExperience(experience);
    };

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
            skills: serviceData.serviceOfferDTO.skills,
            experience: selectedExperience,
            draftCount: serviceData.serviceOfferDTO.draftCount,
        };

        const endpoint = `${baseURL}/api/v1/service/updateOffer?serviceOfferId=${serviceData.serviceOfferDTO.id}`;
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
            router.push("/aiServiceMatches");
        } catch (error) {
            console.error("Error saving skills and experience:", error);
        }
    };

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
                    <div className="flex flex-col">
                        {skills.map((skill, index) => (
                            <button
                                key={index}
                                className={`btn ${
                                    selectedExperience === skill.name
                                        ? "bg-[#0B2147] text-white"
                                        : "bg-white text-gray-900"
                                } border border-gray-300 rounded-lg p-2 mb-2`}
                                onClick={() => handleExperienceClick(skill.name)}
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
                                className={`btn ${
                                    selectedExperience === exp
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



