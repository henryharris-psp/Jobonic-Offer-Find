"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const handleSkillClick = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleExperienceClick = (experience: string) => {
    if (selectedExperience.includes(experience)) {
      setSelectedExperience(
        selectedExperience.filter((exp) => exp !== experience)
      );
    } else {
      setSelectedExperience([...selectedExperience, experience]);
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
          onClick={() => router.push("/aiServiceMatches")}
          className="text-white bg-[#0B2147] hover:bg-[#D0693B] py-2 px-6 rounded-lg text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
