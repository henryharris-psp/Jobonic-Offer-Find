'use client'
import Button from "@/components/Button"
import InputField from "@/components/InputField"
import React from "react"
import Form from "./Form"
import * as Yup from "yup"

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

const JobDescription = (): React.ReactElement => {

    const handleSubmit =async (
    values: { [key: string]: any }
  ): Promise<void>  => {
        console.log('Form submitted:', values)
      }

  return (
    <>
      <header className="py-8 px-4 md:px-6 lg:px-8" style={{
        background: '#0B2147',
      }}>
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
            <div className="mr-8">
              <h1 className="text-3xl font-bold text-white">Senior Frontend Developer</h1>
              <p className="text-white">Acme Inc. - San Francisco, CA</p>
            </div>
          </div>
        </div>
      </header>
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-100 ">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="text-black mb-8">
              We are seeking an experienced Frontend Developer to join our growing team. In this role, you will be
              responsible for building and maintaining high-performance, scalable web applications using modern
              JavaScript frameworks and libraries.
            </p>
            <h3 className="text-xl font-bold mb-4">Responsibilities</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Develop and implement complex user interfaces using React, Vue.js, or Angular</li>
              <li>Optimize web applications for performance, accessibility, and cross-browser compatibility</li>
              <li>Collaborate with designers and backend developers to ensure seamless integration</li>
              <li>Participate in code reviews and provide feedback to improve code quality</li>
              <li>Stay up-to-date with the latest frontend technologies and best practices</li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Requirements</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Bachelor's degree in Computer Science or a related field</li>
              <li>5+ years of experience in frontend web development</li>
              <li>Proficient in JavaScript, HTML, and CSS</li>
              <li>Extensive experience with React, Vue.js, or Angular</li>
              <li>Familiarity with modern frontend tooling and build processes</li>
              <li>Strong problem-solving and critical thinking skills</li>
              <li>Excellent communication and collaboration skills</li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Work Category</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Programming and Tech</li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Employment Type</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Full-time</li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Salary</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>20000 baht per month</li>
              <li>100 baht per hour </li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Location</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Remote</li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Language spoken</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>Thai</li>
              <li>English</li>
              <li>Chinese</li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Submission Deadline</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>10/8/2024</li>
            </ul>
            <h3 className="text-xl font-bold mb-4 mt-8">Examples of Work</h3>
            <ul className="list-disc pl-6 text-black space-y-2">
              <li>example</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 h-[40%]">
            <h2 className="text-2xl font-bold mb-4">Apply for this role</h2>
            <Form
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <InputField name="name" label="Name" placeholder="Enter your name" />
              </div>
              <div className="mb-2">
                <InputField name="email" label="Email" placeholder="Enter your email" type="email" />
              </div>
              <div className="flex items-center space-x-4 h-16 mb-2">
                <label htmlFor="resume" className="text-gray-700">Resume:</label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  className="block text-sm text-gray-600 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
                />
              </div>
              <div className="mb-2">
                <InputField as="textarea" className="min-h-[150px] w-full" name="coverLetter" label="Cover Letter" placeholder="Write your cover letter" />
              </div>
              <div className="flex justify-center mb-4">
                <Button size="lg" type="submit" variant="bg-[#0B2147] font-semibold text-white hover:bg-[#D0693B] py-2 px-2 rounded-md">
                  Submit Application
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  )
}
 export default JobDescription