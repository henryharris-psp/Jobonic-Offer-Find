// CreateJob.tsx
"use client";
import React from 'react';
import FormContainer from '@/components/FormContainer';
import NavBar from '@/components/NavBar';
//import { CreateJobForm } from './CreateJobForm';

const CreateJob: React.FC = () => {
    return (
      <div className='min-h-screen w-full'>
        <NavBar />
        <FormContainer className='mx-auto mt-10'> {/* Add margin directly here */}
          {/*<CreateJobForm />*/}
        </FormContainer>
      </div>
    );
}

export default CreateJob;
