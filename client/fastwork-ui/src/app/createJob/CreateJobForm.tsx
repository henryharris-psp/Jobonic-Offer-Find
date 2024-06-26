// CreateJobForm.tsx

'use client';

import React, { useRef, useState } from 'react';
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { RichTextEditor } from '@mantine/rte';
import SuccessModal from '@/components/SuccessModal';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').label('Title'),
  description: Yup.string().required('Description is required').label('Description'),
  budget: Yup.string().required('Budget is required').label('Budget'),
  location: Yup.string().required('Location is required').label('Location'),
  skills: Yup.string().required('Skills are required').label('Skills'),
  hourOfCompletion: Yup.string().required('Estimated Time To Complete is required').label('Estimated Time To Complete')
});

interface FormValues {
  title: string;
  description: string;
  budget: string;
  location: string;
  skills: string;
  hourOfCompletion: string;
}

const initialValues: FormValues = {
  title: '',
  description: '',
  budget: '',
  location: '',
  skills: '',
  hourOfCompletion: ''
};

export const CreateJobForm: React.FC = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  
  const handleCloseSuccessMessage = () => setSuccess(false);
  
  const handleOnSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    console.log('Form submitted:', values);
    const URL = 'http://localhost:8080/api/v1/job';
  
    try {
      const response = await axios.post(URL, values, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      console.log('Response:', response);
      if (response.status === 200) {
        setSuccess(true);
        resetForm();
        // window.location.href = '/jobList'
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form ref={ref}>
            <h1 className='mb-2 text-black font-inter text-2xl font-semibold'>
              Create a Job
            </h1>
            <p className='mb-10 text-black text-base'>
              Double check the form before submitting.
            </p>

            {[
              { label: 'Job Title', name: 'title', type: 'text', placeholder: 'Enter the job title' },
              { label: 'Budget', name: 'budget', type: 'number', placeholder: 'Enter the budget for the job' },
              { label: 'Location', name: 'location', type: 'text', placeholder: 'Enter the job location' },
              { label: 'Required Skills', name: 'skills', type: 'text', placeholder: 'Enter the required skills' },
              { label: 'Estimated Time To Complete', name: 'hourOfCompletion', type: 'number', placeholder: 'Enter estimated hours to complete the job' }
            ].map((field, index) => (
              <div key={index} className='mb-6'>
                <InputField
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div className='mb-6'>
              <label htmlFor='description' className='block text-sm font-medium text-black mb-1'>
                Job Description
              </label>
              <Field name="description">
                {({ field }: FieldProps) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={(value: string) => setFieldValue('description', value)}
                  />
                )}
              </Field>
            </div>

            <Button type='submit' variant='btn-primary text-white' block='w-full'>
              Create Job
            </Button>
          </Form>
        )}
      </Formik>
      {success && <SuccessModal message="Job created successfully!" onClose={handleCloseSuccessMessage} />}
    </>
  );
};
