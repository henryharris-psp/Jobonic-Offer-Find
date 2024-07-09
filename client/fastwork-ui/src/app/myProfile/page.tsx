'use client'

import React, { RefObject, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

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

    const [feedbackMessage, setFeedbackMessage] = useState<{ [key: string]: string }>({
        "aboutMe": '',
        "skills": '',
        "experience": '',
        "education": '',
        "otherInfo": '',
    });

    const handleEdit = (ref: RefObject<HTMLInputElement>, inputKey: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.stopPropagation();
        setEnabledInputs((prevState) => ({
            ...prevState,
            [inputKey]: true,
        }));
        if (ref.current) {
            ref.current.focus();
        }
    };

    const handleSave = async (inputKey: string) => {
        let fieldData = '';
        switch (inputKey) {
            case 'aboutMe':
                fieldData = aboutMeField;
                break;
            case 'skill':
                fieldData = skillsField;
                break;
            case 'experience':
                fieldData = experienceField;
                break;
            case 'education':
                fieldData = educationField;
                break;
            case 'otherInfo':
                fieldData = otherInfoField;
                break;
            default:
                return;
        }

        try {
            const response = await axios.post(`http://localhost:8081/api/v1/${inputKey}`, {
                id: 'F10782E32FCF4523ABEFE988C6B339CF', // Replace with actual ID
                name: fieldData,
            });
            console.log('Save successful:', response.data);
            setEnabledInputs((prevState) => ({
                ...prevState,
                [inputKey]: false,
            }));
            setFeedbackMessage((prevState) => ({
                ...prevState,
                [inputKey]: 'Save successful!',
            }));
        } catch (error) {
            console.error('Error saving data:', error);
            setFeedbackMessage((prevState) => ({
                ...prevState,
                [inputKey]: 'Error saving data.',
            }));
        }
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
                <h2 className="text-2xl font-medium text-gray-400 mb-4 text-center">Here&apos;s what we found from your profile</h2>
                : null}
            <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Let&apos;s create your Jobonic profile!</h3>

            {/* Profile Picture and Name */}
            <div className="flex items-center justify-start w-full max-w-md mb-16">
                <Image src="/profile-pic.jpg" alt="Profile Picture" width={100} height={100} className="rounded-full"/>
                <h3 className="text-2xl font-semibold text-gray-900 ml-8">emm</h3>
            </div>

            {/* About Me */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">About Me</h2>
                    <svg onClick={(e) => handleEdit(aboutMeRef, "aboutMe", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z"/>
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-400">This was written with AI from what you&apos;ve written. Click to edit and make it more you!</h3>
                <input type="text" id="about-me" placeholder={!aboutMeField ? 'incoming bza student from nus' : aboutMeField}
                       className={`text-black ${(enabledInputs["aboutMe"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                       ref={aboutMeRef}
                       disabled={!enabledInputs["aboutMe"]}
                       onChange={(e) => setAboutMeField(e.target.value)}
                />
                {enabledInputs["aboutMe"] && <button onClick={() => handleSave("aboutMe")} className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded">Save</button>}
                {feedbackMessage["aboutMe"] && <p className="text-sm mt-2">{feedbackMessage["aboutMe"]}</p>}
            </div>

            {/* Skills */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                    <svg onClick={(e) => handleEdit(skillsRef, "skills", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z"/>
                    </svg>
                </div>
                <input type="text" id="skills" placeholder={!skillsField ? 'Enter something about yourself' : skillsField}
                       className={`text-black ${(enabledInputs["skills"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                       ref={skillsRef}
                       disabled={!enabledInputs["skills"]}
                       onChange={(e) => setSkillsField(e.target.value)}
                />
                {enabledInputs["skills"] && <button onClick={() => handleSave("skill")} className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded">Save</button>}
                {feedbackMessage["skills"] && <p className="text-sm mt-2">{feedbackMessage["skills"]}</p>}
            </div>

            {/* Education */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                    <svg onClick={(e) => handleEdit(educationRef, "education", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z"/>
                    </svg>
                </div>
                <input type="text" id="education" placeholder={!educationField ? 'Enter something about yourself' : educationField}
                       className={`text-black ${(enabledInputs["education"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                       ref={educationRef}
                       disabled={!enabledInputs["education"]}
                       onChange={(e) => setEducationField(e.target.value)}
                />
                {enabledInputs["education"] && <button onClick={() => handleSave("education")} className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded">Save</button>}
                {feedbackMessage["education"] && <p className="text-sm mt-2">{feedbackMessage["education"]}</p>}
            </div>

            {/* Experience */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
                    <svg onClick={(e) => handleEdit(experienceRef, "experience", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z"/>
                    </svg>
                </div>
                <input type="text" id="experience" placeholder={!experienceField ? 'Enter something about yourself' : experienceField}
                       className={`text-black ${(enabledInputs["experience"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                       ref={experienceRef}
                       disabled={!enabledInputs["experience"]}
                       onChange={(e) => setExperienceField(e.target.value)}
                />
                {enabledInputs["experience"] && <button onClick={() => handleSave("experience")} className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded">Save</button>}
                {feedbackMessage["experience"] && <p className="text-sm mt-2">{feedbackMessage["experience"]}</p>}
            </div>

            {/* Other Information */}
            <div className="flex flex-col justify-start w-full pb-16">
                <div className="flex space-x-2">
                    <h2 className="text-2xl font-bold text-gray-900">Other Information</h2>
                    <svg onClick={(e) => handleEdit(otherInfoRef, "otherInfo", e)} className="w-8 h-8 text-orange-400 dark:text-white cursor-pointer flex justify-center items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.304 4.844L17.156 7.696M7 7H4a1 1 0 00-1 1v10a1 1 0 001 1h11a1 1 0 001-1v-4.5M19.409 3.59a2.017 2.017 0 010 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 012.852 0z"/>
                    </svg>
                </div>
                <input type="text" id="otherInfo" placeholder={!otherInfoField ? 'Enter something about yourself' : otherInfoField}
                       className={`text-black ${(enabledInputs["otherInfo"]) ? 'border bg-white' : 'border-none bg-transparent'} rounded`}
                       ref={otherInfoRef}
                       disabled={!enabledInputs["otherInfo"]}
                       onChange={(e) => setOtherInfoField(e.target.value)}
                />
                {enabledInputs["otherInfo"] && <button onClick={() => handleSave("otherInfo")} className="mt-2 bg-[#0B2147] hover:bg-[#E1824F] text-white font-bold py-2 px-4 rounded">Save</button>}
                {feedbackMessage["otherInfo"] && <p className="text-sm mt-2">{feedbackMessage["otherInfo"]}</p>}
            </div>
        </div>
    )
}
