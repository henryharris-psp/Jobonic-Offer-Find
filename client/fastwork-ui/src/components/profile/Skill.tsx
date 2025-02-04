"use client";

import React, { useState, useEffect, useRef } from "react";
import { BookmarkSquareIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { RootState } from "@/store";
import httpClient from "@/client/httpClient";
import { useSelector } from "react-redux";
import { Skill } from "@/types/general";

type SkillInstance = {
    id: string;
    name: string;
};
const Skills = () => {
    const { authUser } = useSelector((state: RootState) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [skills, setSkillsList] = useState<SkillInstance[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<SkillInstance[]>([]); // Changed to store objects
    const [userSkillsList, setUserSkillsList] = useState<SkillInstance[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [userId, setUserId] = useState(0);
    const [skillName, setSkillName] = useState<string>("");
    const [feedbackMessage, setFeedbackMessage] = useState<{ [key: string]: string | null }>({
        skills: "",
    });
    useEffect(() => {
        fetchUserSkills();
    }, []);
    const fetchSkills = async () => {
        try {
            const res = await httpClient.post('skill/page-all', {
                pageNumber: 1,
                pageSize: 100,
                sortBy: 'id',
                sortOrder: 'DESC',
                filter: {
                    searchKeyword: ''
                }
            });
            setSkillsList(res.data.content);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };
    const fetchUserSkills = async () => {
        if (!authUser?.profile.id) {
            console.log("User profile ID is missing...");
            return;
        }
        try {
            const response = await httpClient.get(`/user-skill/all?profileId=${authUser?.profile.id}`);
            const displayData = response.data;

            // Check if displayData is an array and contains valid data
            if (Array.isArray(displayData) && displayData.length > 0) {
                const skills = displayData[0]?.skillList || [];
                const namesOnly = skills.map((skill: any) => ({ id: skill.id, name: skill.name }));
                console.log('Skill Names:', namesOnly);
                setSelectedSkills(namesOnly); // Update the state with the skills
            } else {
                console.error("Unexpected API response structure:", displayData);
            }
        } catch (error) {
            console.error("Error fetching user skills:", error);
        }
    };

    // Fetch the skills when the component mounts
    useEffect(() => {
        fetchUserSkills();
    }, []);

    const filteredSkills = skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSkillClick = (skill: SkillInstance) => {
        // Check if the skill is already selected to prevent duplicates
        if (!selectedSkills.some((s) => s.id === skill.id)) {
            setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, skill]);
        }

        // Hide the dropdown after selecting a skill
        setShowDropdown(false);
    };

    // Remove skill
    const removeSkill = (skillToRemove: SkillInstance) => {
        const updatedSkills = selectedSkills.filter(
            (skill) => skill.id !== skillToRemove.id
        );
        setSelectedSkills(updatedSkills);
    };


    const handleSave = async () => {
        try {
            const skillIdsParams = selectedSkills
                .map((skill) => `skillIds=${skill.id}`)
                .join("&");
            const response = await httpClient.post(`user-skill?profileId=${authUser?.profile.id}&${skillIdsParams}`);
            console.log("Save successful:", response.data);
            setIsEditing(false);
            setTimeout(() => setFeedbackMessage({}), 3000);
        } catch (error) {
            console.error("Error saving skills:", error);
        }
    };
    return (
        <section className="flex flex-col justify-start lg:w-[60%] mt-4 pb-4">
            <div className="flex space-x-3 justify-start items-center mb-6">
                <h2 className="text-xl font-bold text-cyan-950">Skills</h2>
                <PencilSquareIcon
                    className="w-5 h-5 cursor-pointer text-black"
                    onClick={() => setIsEditing(!isEditing)}
                />
            </div>

            {isEditing ? (
                <>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className="bg-gray-100 text-cyan-950 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-300 flex items-center space-x-2"
                                onClick={() => removeSkill(skill)}
                            >
                                <span className="text-cyan-950 font-bold">{skill.name}</span>
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="text-red-500 hover:text-red-700 font-bold border-sm border-gray-500 rounded-full"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="relative mt-4">
                        <input
                            type="text"
                            placeholder="Search skills..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 300)}  // Increase timeout to ensure click is registered
                            className="mb-2 rounded-lg bg-gray-50 border-gray-300 shadow-md w-full p-3"
                        />

                        {showDropdown && filteredSkills.length > 0 && (
                            <div
                                ref={dropdownRef}
                                className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto"
                            >
                                {filteredSkills.map((skill) => (
                                    <button
                                        key={skill.id}
                                        className={`w-full text-left px-4 py-2 mb-1 rounded-lg ${selectedSkills.some((s) => s.id === skill.id)
                                            ? "bg-white text-black"
                                            : "bg-white text-gray-900"
                                            } hover:bg-gray-100`}
                                        onClick={() => handleSkillClick(skill)}
                                    >
                                        {skill.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleSave}
                        className="flex justify-center items-center mt-2 p-3 w-28 shadow-lg bg-[#0B2147] text-white text-sm font-medium rounded-2xl cursor-pointer"
                    >
                        <BookmarkSquareIcon className="w-5 h-5 mr-2" />
                        <span>Save</span>
                    </button>
                </>
            ) : (
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    {selectedSkills.length > 0 ? (
                        selectedSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className="bg-sky-100 text-cyan-950 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300 flex items-center space-x-2"
                            >
                                <span className="text-cyan-950 font-bold">{skill.name}</span> {/* Display skill name */}
                                <button
                                    onClick={() => removeSkill(skill)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No skills found</p>
                    )}
                </div>
            )}

            {feedbackMessage["skills"] && (
                <p className="text-sm mt-2 text-green-800 bg-green-100 p-2 border border-green-400 rounded">
                    {feedbackMessage["skills"]}
                </p>
            )}
        </section>
    );
};

export default Skills;
