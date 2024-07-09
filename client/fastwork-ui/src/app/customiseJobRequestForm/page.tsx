'use client'

import React, {useState} from 'react';
import CreateServiceRequestCard from '@/components/CreateServiceRequestCard';
import { useRouter } from 'next/navigation';

interface CardProps {
  title: string;
  earned: string;
  description: {
    avatar: string;
    username: string;
    review: string;
  }[];
  details: string[];
}

const CustomiseJobRequestForm: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: '',
    workCategory: '',
    employmentType: '',
    requirement1: '',
    requirement2: '',
    requirement3: '',
    exampleWork: '',
    deadline: '',
    budget: '',
    language: [] as string[],
    location: '',
  });

  const [cardProps, setCardProps] = useState<CardProps>({
    title: 'Math Tutor',
    earned: '',
    description: [
      {
        avatar: '/group-image.jpg',
        username: 'taytayxy',
        review: '',
      },
    ],
    details: [
      'Middle School',
      'Familiar with GCE O Levels',
      'Travel to my house',
      'Budget: $20/hr',
    ],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    setFormState(prevState => ({ ...prevState, language: selectedOptions }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/myProfile');
  };

  return (
      <div className="p-16 max-w-6xl mx-auto flex justify-center">
        <div className="w-2/3 pr-8">
          <h1 className="text-4xl font-bold text-center mb-8">Create Service Request</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Math Tutor"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="work-category">Work Category</label>
              <input
                type="text"
                id="work-category"
                name="work-category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Web Development"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="employment-type">Employment Type</label>
              <select
                defaultValue=""
                id="employment-type"
                name="employment-type"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option selected disabled>Select an option</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance / Project-based</option>
              </select>
            </div>
            <div>For the fields below, please fill in the necessary job information e.g. job scope, skills requirement, personality fit.</div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="requirement1">Job Description 1</label>
              <input
                type="text"
                id="requirement1"
                name="requirement1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Teach Middle School students"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="requirement2">Job Description 2</label>
              <input
                type="text"
                id="requirement2"
                name="requirement2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Familiar with GCE O Levels"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="requirement3">Job Description 3</label>
              <input
                type="text"
                id="requirement3"
                name="requirement3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Able to travel to my house"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2" htmlFor="example-work">Examples of Work</label>
              <input
                type="text"
                id="example-work"
                name="example-work"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="https://www.netflix.com"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2" htmlFor="deadline">Submission Deadline</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Select a date"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="budget">Budget</label>
              <input
                type="number"
                id="budget"
                name="budget"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="$14 / hour"
              />
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="language">Language Spoken</label>
              <select multiple
                id="language"
                name="language"
                onChange={handleLanguageChange}
                defaultValue={[]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option value={[]} disabled>Select a language</option>
                  <option value="Thai">ภาษาไทย</option>
                  <option value="English">English</option>
                  <option value="Chinese">中文</option>
              </select>
            </div>
            <div>
              <label className="required block text-lg font-semibold mb-2" htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Online / Phra Khanong / On Nut"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="bg-[#0B2147] hover:bg-[#D0693B] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#D0693B]">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/3 flex flex-col items-center justify-center">
            {/*Card should update as formed is filled in*/}
          <CreateServiceRequestCard {...cardProps}/>
          <h3 className="px-6 text-gray-500 text-justify text-xs">* how your service request card will look like</h3>
        </div>
      </div>
  );
};

export default CustomiseJobRequestForm;


