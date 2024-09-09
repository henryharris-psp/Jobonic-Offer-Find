"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { BookmarkSquareIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Skills from "@/components/profile/Skill";
import EducationComponent from "@/components/profile/Education";
import ExperienceComponent from "@/components/profile/Experience";
import FinancialForm from "@/components/profile/Form";
import httpAuth from "@/client/httpAuth";
import httpClient from "@/client/httpClient";

const MyProfile = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);

    const [isEditing, setIsEditing] = useState(false);

    const [description, setDescription] = useState<string>('');



    // Fetch user data and populate the description
    const fetchUserData = async () => {
        try {
            const response = await httpClient.get(`/user?id=${authUser?.profile.id}`);

            console.log('User data', response);
            const userData = response.data;
            setDescription(userData.description || ""); // Set description if it exists
            console.log('Description : ', userData.description);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        if (authUser?.profile.id && !description) {
            fetchUserData();
        }
    }, [authUser?.profile.id, description]);

    // Save the description to the backend
    const handleDescription = async () => {
        try {
            const response = await httpClient.put(`/user?id=${authUser?.profile.id}`, {
                description,
            });
            console.log("Description saved successfully.");
            setIsEditing(false); // Close the editing mode after saving

        } catch (error) {
            console.error("Error occurred while saving the description", error);
        }
    };

    return (


        <div className="flex flex-col rounded-lg justify-center max-w-full m-16 border-none">

            <section className="w-full">
                <h2 className="text-center m-16 font-bold text-cyan-950 text-3xl">
                    {authUser?.username.toUpperCase()} Profile
                </h2>
            </section><section className="flex justify-start ml-16 items-center text-cyan-950 w-full">
                <Image
                    src="/profile.png"
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full shadow-lg border border-stone-400" />
                <h3 className="ml-12 font-bold text-2xl text-cyan-950">
                    {authUser?.username.toLocaleUpperCase()}
                </h3>
            </section>
            <section className="flex flex-col w-[60%] justify-start ml-16 mt-4 pb-4">
                <div className="flex justify-start items-center space-x-3 mb-6 animate-pulse">
                    <h3 className="text-2xl font-bold text-cyan-950 ">About Me</h3>
                    <PencilSquareIcon
                        className="w-6 h-6 cursor-pointer text-yellow-700"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </div>
                {isEditing ? (
                    <>
                        <textarea
                            className="w-full mt-2 p-6 shadow-xl border-none font-bold rounded-lg bg-gray-100 text-cyan-950"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4} />
                            <div
                                className=" flex justify-center items-center mt-4 p-2 w-28 shadow-lg bg-[#0B2147] text-white font-bold rounded-md cursor-pointer"
                                onClick={handleDescription}
                            >
                            <BookmarkSquareIcon className="w-6 h-6 mr-2" />
                            <span>Save</span>
                        </div>
                    </>
                ) : (
                    <p className="text-md text-cyan-950 bg-gray-100 font-bold shadow-md py-2 px-4 rounded-lg shadow-[#77CAC8]">{description}</p>
                )}

            </section>
            <Skills />
            <EducationComponent />
            <ExperienceComponent />
            <FinancialForm />
        </div>
    )
}

export default MyProfile