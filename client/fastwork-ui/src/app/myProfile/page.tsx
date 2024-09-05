"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import httpClient from "@/client/httpClient";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { PencilIcon, PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Skills from "@/components/profile/Skill";
import EducationComponent from "@/components/profile/Education";
import ExperienceComponent from "@/components/profile/Experience";
import FinancialForm from "@/components/profile/Form";

const MyProfile = () => {

    const {authUser} = useSelector((state : RootState) => state.auth);

    const [isEditing, setIsEditing] = useState(false);

    return( 


        <div className="flex flex-col rounded-lg justify-center max-w-full m-16 border-none">
    
    <section className="w-full">
                        <h2 className="text-center m-16 font-bold text-3xl">
                            {authUser?.username.toUpperCase()} Profile
                        </h2>
                    </section><section className="flex justify-start ml-16 items-center text-gray-900 w-full">
                        <Image
                            src="/profile.png"
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="rounded-full" />
                        <h3 className="ml-16 font-bold text-2xl">
                            {authUser?.username.toLocaleUpperCase()}
                        </h3>
                    </section>
                    <section className="flex flex-col justify-start ml-16 mt-4 pb-4">
                        <div className="flex justify-start items-center space-x-3">
                        <h3 className="text-2xl font-bold text-gray-900">About Me</h3>
                        <PencilSquareIcon className="w-6 h-6" onClick={() => setIsEditing(!isEditing)} />
                        </div>
                        <p className="text-md text-gray-600">

                        I am a passionate and results-driven Software Developer with experience in building and optimizing web applications <br />
                         using modern technologies such as Java, Spring Boot, React, and Oracle Database. <br />
                          I have a strong foundation in both front-end and back-end development, enabling me to create scalable,<br />
                           responsive, and user-centric solutions. I thrive in collaborative environments and enjoy solving complex problems <br />
                            through innovative code. With a keen eye for detail and a commitment to continuous learning, <br />
                         I am dedicated to delivering high-quality software that meets business goals and enhances user experiences.
                        </p>

                    </section>
                    <Skills />
                    <EducationComponent />
                    <ExperienceComponent />
                    <FinancialForm />
        </div>
    )
}

export default MyProfile