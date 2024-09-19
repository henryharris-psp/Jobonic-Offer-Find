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
import Marquee from "@/components/chat/ProgressList/Marquee/Marquee";

const MyProfile = () => {

    const { authUser } = useSelector((state: RootState) => state.auth);

    const [isEditing, setIsEditing] = useState(false);

    const [isEditingPosition, setIsEditingPosition] = useState(false);

    const [description, setDescription] = useState<string>('');

    const [position, setPosition] = useState<string>('');

    // Fetch user data and populate the description
    const fetchUserData = async () => {
        try {
            const response = await httpClient.get(`/user?id=${authUser?.profile.id}`);

            console.log('User data', response);
            const userData = response.data;
            setDescription(userData.description || ""); // Set description if it exists
            setPosition(userData.position || "");

            console.log(' Description is : ' , userData.description);
            console.log('Position is : ' , userData.position);
            //console.log('Description : ', userData.description);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    // Fetch user data when the component mounts
    useEffect(() => {
        if (authUser?.profile.id && !description && !position) {
            fetchUserData();
        }
    }, [authUser?.profile.id, description, position]);

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
    const handlePosition = async () => {
        try {
            const response = await httpClient.put(`/user?id=${authUser?.profile.id}`, {
                position,
            });
            console.log("Position save successfully...");
            setIsEditingPosition(false);
        } catch (error) {
            console.log("Error occurred while saving the Position name", error);
        }
    }



    return (


        <div className="flex flex-col rounded-lg justify-center max-w-full mx-28 my-12 border-none">

            <section className="w-full">
                <h2 className="text-center mb-6 font-bold text-cyan-950 text-3xl">
                    {authUser?.username.toUpperCase()} Profile
                </h2>
            </section><section className="flex justify-start ml-16 items-center text-cyan-950 w-full">
                <Image
                    src="/profile.png"
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full shadow-lg border border-stone-400 mr-6" />

                <div className="flex flex-col items-center justify-center">
                    <h3 className="font-bold text-2xl text-cyan-950">
                        {authUser?.username.toLocaleUpperCase()}
                    </h3>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-bold pr-2">{position}</p>
                        <PencilSquareIcon
                            className="w-6 h-6 cursor-pointer text-yellow-700"
                            onClick={() => setIsEditingPosition(!isEditingPosition)} />
                    </div>
                    {isEditingPosition ? (
                    <>

                        <input
                            type="text"
                            value={position}
                            className="text-cyan-900 border-none rounded-lg bg-gray-100 shadow-lg"
                            onChange={(e) => setPosition(e.target.value)} />
                        <div className="flex justify-center items-center border-none mt-4 p-2 w-28 shadow-lg bg-[#0B2147] text-white font-bold rounded-lg cursor-pointer" onClick={handlePosition}>
                            <BookmarkSquareIcon className="w-6 h-6 mr-2" />
                            <span>Save</span>
                        </div>
                    </>
                ) : (
                    ''
                )}
                </div>
                

            </section>
            <section className="flex flex-col w-[60%] justify-start ml-16 mt-4 pb-4">
                <div className="flex justify-start sm:w-[60%] md:w-[60%] lg:w-[60%] items-center space-x-3 mb-6 animate-pulse">
                    <h3 className="text-2xl font-bold text-cyan-950 ">About Me</h3>
                    <PencilSquareIcon
                        className="w-6 h-6 cursor-pointer text-yellow-700"
                        onClick={() => setIsEditing(!isEditing)}
                    />
                </div>
                {isEditing ? (
                    <>
                        <textarea
                            className="w-full p-6 shadow-xl border-none font-semibold rounded-lg bg-gray-50 text-cyan-950"
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
                    <p className="text-md text-cyan-950 bg-gray-50 font-semibold shadow-md p-4 rounded-lg shadow-[#bbf4f3]">{description}</p>
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