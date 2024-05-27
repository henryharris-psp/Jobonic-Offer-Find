import React from 'react';
import SearchBar from '../../components/SearchBar';
import NavBar from '../../components/NavBar';
import JobCard from '@/components/JobCard';

export default function JobPage(): React.ReactNode {
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
      title: 'Software Engineer',
      company: 'ABC Technologies',
      location: 'New York',
      type: 'Remote',
      time: 'Flexible',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Minimum 3 years of experience in software development. Proficiency in Python, R, and machine learning algorithms.',
    },
    {
      title: 'Data Scientist',
      company: 'XYZ Brothers Ultimate Corporation',
      location: 'San Francisco',
      type: 'Office',
      time: 'FullTime',
      description: 'Pellentesque nec neque eu quam tempus ultrices. Proficiency in Python, R, and machine learning algorithms. Minimum 3 years of experience in software development.'
    },
    {
      title: 'AI Scientist',
      company: 'ABC Brothers Corporation',
      location: 'Kathmandu',
      type: 'Remote',
      time: 'PartTime',
      description: 'Pellentesque nec neque eu quam tempus ultrices. Proficiency in Python, R, and machine learning algorithms.',
    },
    {
      title: 'Content Writer',
      company: 'KGF Publishing',
      location: 'Pokhara',
      type: 'Remote',
      time: 'Flexible',
      description: 'Pellentesque nec neque eu quam tempus ultrices.',
    },
  ];

  return (
    <div className='bg-gray-100'>
      <NavBar/>
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
          <JobCard jobs={jobDataList} />
        </div>
      </div>
    </div>
  );
}
