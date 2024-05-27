'use client'

import Button from "@/components/Button"
import Form from "@/components/Form"
import InputField from "@/components/InputField"
import Link from "next/link"
import { useRef, useState } from "react"
import * as Yup from "yup"
import axios from "axios"

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label('Full Name'),
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().min(8).required().label('Password'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Password confirmation must match the password')
      .label('Confirm Password')
  })

export const RegisterForm = (): React.ReactNode => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    const ref = useRef()

  const handlePasswordChange = (event: { target: any }): any => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleOnsubmit = async (values: { [key: string]: any }): Promise<any> => {
    const URL = 'http://localhost:8080/api/v1/user';
    try {
      const response = await axios.postForm(URL, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response);
      return response
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

    return(
        <Form
        onSubmit={handleOnsubmit}
        validationSchema={validationSchema}
        initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      innerRef={ref}
    >
      <h1 className='mb-2 text-black font-inter text-2xl font-semibold'>
        Create an account
      </h1>

      <p className='mb-10 text-black text-base'>Let's get started by signing up our app.</p>

      <div className='mb-6'>
        <InputField label='Full Name' type='text' name='username' placeholder='Your Full Name' />
      </div>

      <div className='mb-6'>
        <InputField label='Email Address' type='email' name='email' placeholder='Email address' />
      </div>

      <div className='mb-6'>
      <InputField label='Password' name='password' onChange={handlePasswordChange} type='password' placeholder='Your Password' />
      </div>

      <div className='mb-6'>
        <InputField label='Confirm Password' type='password' name='confirmPassword' placeholder='Confirm Password' />
      </div>

      <Button type='submit' variant='btn-primary text-white' block='w-full'>Create</Button>

      <span className='block text-center mt-7 text-base text-black'>
        Already have an account ?
        <Link
          href='/login'
          className='text-blue-400 hover:text-blue-500 hover:underline ml-2'
        >
          Login
        </Link>
      </span>
    </Form>
    )
}