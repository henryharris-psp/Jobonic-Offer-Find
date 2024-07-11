'use client'

import React from "react";
import Image from 'next/image';
import location from "@/../public/location-pin.svg";
import { useRouter } from "next/navigation";

interface ServiceRequest {
  title: string;
  work_category: string;
  company: string;
  location: string;
  employment_type: string;
  description_1: string;
  description_2: string;
  description_3: string;
  examples_of_work: string;
  submission_deadline: string;
  budget: string;
  language: string;
  days_left: string;
}

interface ServiceRequestCardProps {
  serviceRequest?: ServiceRequest;
  hasProfile: boolean;
  profilePic: string;
}

const ServiceRequestCard = ({ serviceRequest, hasProfile, profilePic }: ServiceRequestCardProps): React.ReactElement => {
  const router = useRouter();

  const handleServiceRequestClick = () => {
    console.log('Service request card clicked');
    router.push('/description')
  }

  const handleApply = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (hasProfile) {
      router.push('/selectSkills');
    } else {
      router.push('/createProfile');
    }
  };

  const handleChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push('/chat');
  };

  return (
    <div className="job-div">
      <div className="job-card hover:cursor-pointer bg-[#CFEDF4] p-4 rounded-lg shadow-md" onClick={handleServiceRequestClick}>
        {/* Profile Pic */}
        {/* fix spacing horizontally later */}
        <div className="flex items-center space-x-1">
          <span>
            <img src="client/fastwork-ui/public/jobonic.svg" alt="Profile Pic" className="h-8 w-8 border rounded-full mr-1"/>
          </span>
          <span className="font-semibold text-sm underline">{serviceRequest?.company}</span>
          <p className="font-semibold text-sm">is looking for</p>
        </div>

        <h2 className="text-lg font-bold">{serviceRequest?.title}</h2> 
        <div className="flex flex-row justify-between">
          <div className="flex space-x-2">
            <p className="text-sm text-gray-500">{serviceRequest?.work_category}</p>
            <p className="text-xs" style={styles.chip}>{serviceRequest?.employment_type}</p>
          </div>
          <div className="flex flex-row mb-1 pr-2">
            <Image className="w-5 h-5" src={location} alt={location} />
            <p className="text-xs">{serviceRequest?.location}</p>
          </div>
        </div>
        <p className="job-description text-sm">{serviceRequest?.description_1}</p>
        <p className="job-description text-sm">{serviceRequest?.description_2}</p>
        <p className="job-description text-sm">{serviceRequest?.description_3}</p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <button onClick={handleChat}>
            <svg className="w-10 h-10 text-[#0B2147] dark:text-white hover:text-[#D0693B]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clipRule="evenodd"/>
            </svg>
          </button>
          <button className="bg-[#0B2147] text-white rounded-xl px-4 py-2 hover:bg-[#D0693B] text-sm" onClick={handleApply} style={{ borderColor: 'transparent' }}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  chip: {
    padding: '0.25rem 0.5rem',
    borderRadius: '999px',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontSize: '0.75rem',
    fontWeight: 500,
  }
};

export default ServiceRequestCard;

