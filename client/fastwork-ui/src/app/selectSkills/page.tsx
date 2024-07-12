"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {baseURL, token} from "@/baseURL";

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

  const [selectedSkills, setSelectedSkills] = useState<String>('');
  const [selectedExperience, setSelectedExperience] = useState<String>('');

  const handleSkillClick = (skill: string) => {
    // if (selectedSkills.includes(skill)) {
    //   setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    // } else {
    //   setSelectedSkills([...selectedSkills, skill]);
    // }
    setSelectedSkills(skill);
  };

  const handleExperienceClick = (experience: string) => {
    // if (selectedExperience.includes(experience)) {
    //   setSelectedExperience(
    //     selectedExperience.filter((exp) => exp !== experience)
    //   );
    // } else {
    //   setSelectedExperience([...selectedExperience, experience]);
    // }
    setSelectedExperience(experience);
  };

  const handleSaveSkillsExperience = async (e: React.MouseEvent) => {
      e.preventDefault();
      // const test = await axios.get(`${baseURL}/api/v1/service`,
      //     {headers: {
      //             'Authorization': `Bearer ${token}`,
      //             'Content-Type': 'application/json',
      //         }, params: {
      //             id: '9bf58ef5-9b61-4cdd-808d-3c6ceb5c16f1'}
      //     });
      // console.log(test.data);
        console.log(selectedSkills);
      const savedData =
          {
              "id": "36a02172-b48c-496e-a234-7684939e1cf4",
              "description": "string",
              "bankCardNumber": "string",
              "email": "string",
              "startDate": "2024-07-11",
              "phone": "string",
              "address": "string",
              "skills": selectedSkills,
              "experience": selectedExperience,
              "draftCount": 0
          }

    // const response = await axios.put(`${baseURL}/api/v1/service/updateOffer`, savedData,
    //     {headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       }, params: {
    //         id: '023065b7-35ef-4b5d-8c88-6bc7ca677e3c'}
    //     });
    // console.log(response.data);
    router.push("/aiServiceMatches")
  }

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
            {user.skills.map((skill, index) => (
              <button
                key={index}
                className={`btn ${
                  selectedSkills.includes(skill)
                    ? "bg-[#0B2147] text-white"
                    : "bg-white text-gray-900"
                } border border-gray-300 rounded-lg p-2 mb-2`}
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
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
                  selectedExperience.includes(exp)
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
