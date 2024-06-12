'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '../../components/SearchBar';
import NavBar from '../../components/NavBar';
import JobCard from '@/components/JobCard';
import axios from 'axios';

export default function JobPage(): React.ReactNode {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  const getAllJobs = async () => {
    const URL = 'http://localhost:8080/api/v1/job/all';
    const requestData = {
      pageNumber: 1,
      pageSize: 100,
      sortBy: "",
      sortOrder: "DESC",
      filter: {
        searchKeyword: ""
      }
    };

    try {
      const response = await axios.post(URL, requestData);
      console.log('Response:', response.data);
      setJobs(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const categories = [
    "Development and IT",
    "AI Services",
    "HR and Training",
    "Graphic and Design",
    "Marketing and Advertising",
    "Write and Translate"
  ];

  const jobDataList = [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Software Engineer',
      company: 'ABC Technologies',
      location: 'New York',
      type: 'Remote',
      time: 'Flexible',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Minimum 3 years of experience in software development. Proficiency in Python, R, and machine learning algorithms.',
    },
    {
      id: '9f6c7b10-0910-4bb3-a245-53bc676e67d4',
      title: 'Data Scientist',
      company: 'XYZ Brothers Ultimate Corporation',
      location: 'San Francisco',
      type: 'Office',
      time: 'FullTime',
      description: 'Pellentesque nec neque eu quam tempus ultrices. Proficiency in Python, R, and machine learning algorithms. Minimum 3 years of experience in software development.'
    },
    {
      id: '3c77fc8c-2458-41d8-b524-065e69b71b0c',
      title: 'AI Scientist',
      company: 'ABC Brothers Corporation',
      location: 'Kathmandu',
      type: 'Remote',
      time: 'PartTime',
      description: 'Pellentesque nec neque eu quam tempus ultrices. Proficiency in Python, R, and machine learning algorithms.',
    },
    {
      id: 'b3da8f6a-92da-4ea0-9f24-856be25594d5',
      title: 'Content Writer',
      company: 'KGF Publishing',
      location: 'Pokhara',
      type: 'Remote',
      time: 'Flexible',
      description: 'Pellentesque nec neque eu quam tempus ultrices.',
    },
  ];

  const handleJobClick = (id: number) => {
    console.log('Job card clicked', id);
    router.push(`/description?id=${id}`);
  };

  return (
    <div className='bg-gray-100'>
      <NavBar />
      <SearchBar style={{
        background: 'linear-gradient( 89.5deg,  rgba(66,144,251,1) 0.4%, rgba(131,204,255,1) 100.3% )',
      }} />
      <div className='flex justify-between'>
        <div className="job-category overflow-y-auto">
          <h2 className='font-semibold text-center'>Work Category</h2>
          {categories.map((category, index) => (
            <div key={index} className="py-2 border-b border-gray-400 hover:text-blue-500 cursor-pointer">{category}</div>
          ))}
        </div>
        <div className="flex-grow overflow-y-auto">
          <JobCard jobs={jobDataList} onJobClick={handleJobClick} />
        </div>
      </div>
    </div>
  );
}
