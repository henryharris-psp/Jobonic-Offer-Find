'use client'
import Button from "@/components/Button"
import InputField from "@/components/InputField"
import React, { useEffect, useState } from "react"
import Form from "./Form"
import * as Yup from "yup"
import { useSearchParams } from "next/navigation"
import axios from "axios"

interface FormValues {
  email: string
  name: string
  coverLetter: string
}

const initialValues: FormValues = {
  email: '',
  name: '',
  coverLetter: ''
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  name: Yup.string().required().label('Name'),
  coverLetter: Yup.string().required().label('Cover Letter')
})

interface JobDescriptionData {
  title: string,
  company: string,
  location: string,
  description: string,
  responsibilities: string[],
  requirements: string[],
  formTitle: string
}

interface JobDescriptionProps {
  data: JobDescriptionData
}

const JobDescription = ({ data }: JobDescriptionProps): React.ReactElement => {
  const [job, setJob] = useState<JobDescriptionData | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const getJobById = async (id: string) => {
    const URL = `http://localhost:8080/api/v1/job?id=${id}`;

    try {
      const response = await axios.get(URL);
      console.log('Job:', response.data);
      setJob(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (id) {
      getJobById(id);
    }
  }, [id]);

  const handleSubmit = async (
    values: { [key: string]: any }
  ): Promise<void> => {
    console.log('Form submitted:', values)
  }

  return (
    <>
      <header className="py-8 px-4 md:px-6 lg:px-8" style={{
        background: 'linear-gradient( 89.5deg,  rgba(66,144,251,1) 0.4%, rgba(131,204,255,1) 100.3% )',
      }}>
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <div className="mr-8">
              <h1 className="text-3xl font-bold text-black">{data.title}</h1>
              <p className="text-black">{data.company} - {data.location}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-auto">
              <Button size="xl bg-blue-500 text-white hover:bg-blue-600">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </header>
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-100 ">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="text-black mb-8">
              {data.description}
            </p>
            <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              {data.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Requirements</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              {data.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 h-[80%]">
            <h2 className="text-2xl font-bold mb-4">{data.formTitle}</h2>
            <Form
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <div>
                <InputField name="name" label="Name" placeholder="Enter your name" />
              </div>
              <div>
                <InputField name="email" label="Email" placeholder="Enter your email" type="email" />
              </div>
              <div className="flex items-center space-x-4 h-16">
                <label htmlFor="resume" className="text-gray-700">Resume:</label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  className="block text-sm text-gray-900 bg-blue-200 rounded-lg border border-gray-300 cursor-pointer focus:outline-none p-2"
                />
              </div>
              <div>
                <InputField as="textarea" className="min-h-[150px] w-full" name="coverLetter" label="Cover Letter" placeholder="Write your cover letter" />
              </div>
              <Button size="lg" type="submit" variant="btn-primary w-full hover:bg-blue-500">
                Submit Application
              </Button>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}

export default JobDescription
