"use client";

import React, { useState, useEffect, useRef} from "react";
import { BookmarkSquareIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { RootState } from "@/store";
import httpClient from "@/client/httpClient";
import { useSelector } from "react-redux";

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
    const [skillName , setSkillName] = useState<string>("");
    const [feedbackMessage, setFeedbackMessage] = useState<{ [key: string]: string | null }>({
        skills: "",
    });
    useEffect(() => {
        fetchUserSkills();
    }, []);
    const fetchSkills = async () => {
        try {
            const response = await httpClient.get("skill/all");
            setSkillsList(response.data);
        } catch (error) {
            console.error("Error fetching skills:", error);
        }
    };
    const fetchUserSkills = async () => {

        if(!authUser?.profile.id) {
            console.log("user profile id is missing...");
            return;
        }
        try {
            const response = await httpClient.get(`/user-skill/all?profileId=${authUser?.profile.id}`);
            const displayData = response.data;
            // Check if displayData is an array and has at least one item
        if (Array.isArray(displayData) && displayData.length > 0) {
            // Access the skillList from the first item in the array
            const skills = displayData[0]?.skillList || [];
            // Extract only the skill names
            const namesOnly = skills.map((skill: any) => ({ id : skill.id , name : skill.name}));
            console.log('Skill Names:', namesOnly);
            setSelectedSkills(namesOnly); // Update state with only the names
        } else {
            console.error("Unexpected API response structure:", displayData);
        }
        } catch (error) {
            console.error("Error fetching user skills:", error);
        }
    };
    const filteredSkills = skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Remove skill
    const removeSkill = (skillToRemove: SkillInstance) => {
        const updatedSkills = selectedSkills.filter(
            (skill) => skill.id !== skillToRemove.id
        );
        setSelectedSkills(updatedSkills);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleSkillClick = (skill: SkillInstance) => {
        setSelectedSkills((prevSelectedSkills) => {
            if (prevSelectedSkills.some((s) => s.id === skill.id)) {
                return prevSelectedSkills.filter((s) => s.id !== skill.id);
            } else {
                return [...prevSelectedSkills, skill];
            }
        });
        setShowDropdown(false);
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
        <section className="flex flex-col w-[60%] justify-start ml-16 mt-4 pb-4">
            <div className="flex space-x-3 justify-start items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-950">Skills</h2>
                <PencilSquareIcon
                    className="w-6 h-6 cursor-pointer text-yellow-700"
                    onClick={() => setIsEditing(!isEditing)}
                />
            </div>

            {isEditing ? (
                <>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedSkills.map((skill) => (
                            <div
                                key={skill.id}
                                className={`bg-gray-100 text-cyan-950 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-300 flex items-center space-x-2`}
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
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            className="mb-2 rounded-lg border-none bg-gray-100 shadow-lg w-full p-4"
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
                    <div
                        onClick={handleSave}
                        className="flex justify-center items-center mt-2 p-2 w-28 shadow-lg bg-[#0B2147] text-white font-bold rounded-md cursor-pointer"
                    >
                       <BookmarkSquareIcon className="w-6 h-6 mr-2" />
                       <span>Save</span>
                    </div>
                </>
            ) : (
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    {selectedSkills.map((skill) => (
                        <div
                            key={skill.id}
                            className="bg-gray-100 text-cyan-950 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-300 flex items-center space-x-2"
                        >
                            <span className="text-cyan-950 font-bold">{skill.name}</span> {/* Display skill name */}
                            <button
                                onClick={() => removeSkill(skill)}
                                className="text-red-500 hover:text-red-700"
                            >
                                ×
                            </button>
                        </div>
                    ))}
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
