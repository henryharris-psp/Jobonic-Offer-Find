'use client'

import React from "react";
import Image from 'next/image'
import location from "@/../public/location-pin.svg"

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  time: string;
  description: string;
}

interface JobCardProps {
  jobs: Job[];
}

const JobCard = ({jobs}: JobCardProps): React.ReactElement => {
  const handleJobClick = () => {
    console.log('Job card clicked');
    window.location.href = '/description'
  }

return(
  <div className="job-div">
      <h2 className='font-bold text-xl m-4'> All Jobs</h2>
        {jobs?.map((job, index) => (
                <div key={index} className="job-card hover:cursor-pointer" onClick={handleJobClick}>
                    <h2 className="text-lg font-bold mb-2">{job.title}</h2>
                    <div className="flex flex-row justify-between mb-1">
                      <p className="font-semibold">{job.company}</p>
                      <div className="flex flex-row mb-2">
                        <Image className="w-5 h-5" src={location} alt=''/>
                        <p className="text-sm">{job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                    <p style={styles.chip}>{job.type}</p>
                    <p style={styles.chip}>{job.time}</p>
                   </div>
                    <p className="job-description">{job.description}</p>
                </div>
            ))}
    </div>
)
}

const styles = {
  chip: {
    padding: '0.25rem 0.5rem',
    borderRadius: '999px',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    fontSize: '0.875rem',
    fontWeight: 500,
  }
};

export default JobCard;