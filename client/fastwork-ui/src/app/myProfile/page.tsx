'use client'

import React, { ReactEventHandler, RefObject } from 'react';
import {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import { set } from 'firebase/database';

export default function MyProfile(): React.ReactNode {
    const [manualProfile, setManualProfile] = useState(true);
    
    const [aboutMeField, setAboutMeField] = useState<string>('');
    const [skillsField, setSkillsField] = useState<string>('');
    const [experienceField, setExperienceField] = useState<string>('');
    const [educationField, setEducationField] = useState<string>('');
    const [otherInfoField, setOtherInfoField] = useState<string>('');

    const aboutMeRef = useRef<HTMLInputElement>(null);
    const skillsRef = useRef<HTMLInputElement>(null);
    const experienceRef = useRef<HTMLInputElement>(null);
    const educationRef = useRef<HTMLInputElement>(null);
    const otherInfoRef = useRef<HTMLInputElement>(null);

    const [enabledInputs, setEnabledInputs] = useState<{ [key: string]: boolean }>({
        "aboutMe": false,
        "skills": false,
        "experience": false,
        "education": false,
        "otherInfo": false,
      });

    const handleEdit = (ref: RefObject<HTMLDivElement>, inputKey: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        setEnabledInputs((prevState) => ({
            ...prevState,
            [inputKey]: true,
        }));
        if (ref.current) {
            ref.current.focus();
        };
    };

    const handleClickInside = (inputKey: string) => {
        setEnabledInputs((prevState) => ({
            ...prevState,
            [inputKey]: true,
        }));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const inputs = [aboutMeRef, skillsRef, experienceRef, educationRef, otherInfoRef];
            const clickedOutside = inputs.every(ref => ref && !ref.current?.contains(event.target as Node));

            if (clickedOutside) {
                setEnabledInputs((prevState) => ({
                    aboutMe: false,
                    skills: false,
                    experience: false,
                    education: false,
                    otherInfo: false,
                }));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="m-16">
            {manualProfile ? 
                <h2 className="text-2xl font-medium text-gray-400 mb-4 text-center">Here's what we found from your profile</h2>
            : null}
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Let's create your Jobonic profile!</h3>

            {/* Profile Picture and Name */}
            <div className="flex items-center justify-start w-full max-w-md mb-16">
                <Image src="/profile-pic.jpg" alt="Profile Picture" width={100} height={100} className="rounded-full"/>
                <h3 className="text-2xl font-semibold text-gray-900 ml-8">emm</h3>
            </div>

            {/* My Services Offers*/}

            {/* About Me*/}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
                    <svg onClick={(e) => handleEdit(aboutMeRef, "aboutMe", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-400">This was written with AI from what you've written. Click to edit and make it more you!</h3>
                <input type="text" id="about-me" placeholder={!aboutMeField ? 'incoming bza student from nus' : aboutMeField}
                    className={`text-black ${(enabledInputs["aboutMe"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                    ref={aboutMeRef}
                    disabled={!enabledInputs["aboutMe"]}/>
            </div>

            {/* Skills */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                    <svg onClick={(e) => handleEdit(skillsRef, "skills", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                </div>
                <input type="text" id="skills" placeholder={!skillsField ? 'Enter something about yourself' : skillsField}
                    className={`text-black ${(enabledInputs["skills"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                    ref={skillsRef}
                    disabled={!enabledInputs["skills"]}/>
            </div>

            {/* Education */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                    <svg onClick={(e) => handleEdit(educationRef, "education", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                </div>
                <input type="text" id="education" placeholder={!educationField ? 'Enter something about yourself' : educationField}
                    className={`text-black ${(enabledInputs["education"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                    ref={educationRef}
                    disabled={!enabledInputs["education"]}/>
            </div>

            {/* Experience */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                    <svg onClick={(e) => handleEdit(experienceRef, "experience", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                </div>
                <input type="text" id="experience" placeholder={!experienceField ? 'Enter something about yourself' : experienceField}
                    className={`text-black ${(enabledInputs["experience"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                    ref={experienceRef}
                    disabled={!enabledInputs["experience"]}/>
            </div>

            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Other Information</h2>
                    <svg onClick={(e) => handleEdit(otherInfoRef, "otherInfo", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                    </svg>
                </div>
                <input type="text" id="otherInfo" placeholder={!otherInfoField ? 'Enter something about yourself' : otherInfoField}
                    className={`text-black ${(enabledInputs["otherInfo"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                    ref={otherInfoRef}
                    disabled={!enabledInputs["otherInfo"]}/>
            </div>
        </div>
    )
}

