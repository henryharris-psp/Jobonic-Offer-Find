'use client'

import React from "react";
import Image from 'next/image';
import location from "@/../public/location-pin.svg";
import { useRouter } from "next/navigation";

interface ServiceRequest {
  title: string;
  category: string;
  company: string;
  location: string;
  type: string;
  bullet1: string;
  bullet2: string;
  bullet3: string;
}

interface ServiceRequestCardProps {
  serviceRequest: ServiceRequest;
  hasProfile: boolean;
}

const ServiceRequestCard = ({ serviceRequest, hasProfile }: ServiceRequestCardProps): React.ReactElement => {
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
        <h2 className="text-lg font-bold mb-2">{serviceRequest.title}</h2>
        <p className="text-sm text-gray-500 mb-1">{serviceRequest.category}</p>
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-sm">{serviceRequest.company}</p>
          <div className="flex flex-row mb-1 pr-2">
            <Image className="w-5 h-5" src={location} alt={location} />
            <p className="text-xs">{serviceRequest.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs" style={styles.chip}>{serviceRequest.type}</p>
        </div>
        <p className="job-description text-md">{serviceRequest.bullet1}</p>
        <p className="job-description text-md">{serviceRequest.bullet2}</p>
        <p className="job-description text-md">{serviceRequest.bullet3}</p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <button onClick={handleChat}>
            <svg className="w-10 h-10 text-[#0B2147] dark:text-white hover:text-[#D0693B]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
            </svg>
          </button>
          <button className="bg-[#0B2147] text-white rounded-xl px-4 py-2 hover:bg-[#D0693B]" onClick={handleApply} style={{ borderColor: 'transparent' }}>
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

