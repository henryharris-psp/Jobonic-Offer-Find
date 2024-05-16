'use client'

import Button from "@/components/Button"
import Form from "@/components/Form"
import InputField from "@/components/InputField"
import Link from "next/link"
import { useRef, useState } from "react"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label('Full Name'),
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().min(8).required().label('Password'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Password confirmation must match the password')
      .label('Confirm Password')
  })

export const RegisterForm = (): React.ReactNode => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    const ref = useRef()
  const [showDropDown, setShowDropDown] = useState(false)
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  })

  const handlePasswordChange = (event: { target: any }): any => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })

    if (value.trim() !== '') {
      const updatedRequirements = {
        length: value.length >= 8 && value.length <= 12,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        specialChar: /[!@#$%^&*]/.test(value)
      }
      setRequirements(updatedRequirements)

      const allRequirementsMet = Object.values(updatedRequirements).every(req => req)

      setShowDropDown(!allRequirementsMet)
    } else {
      setShowDropDown(false)
    }
  }

    return(
        <Form
        onSubmit={() => console.log('Register Form submitted')}
        validationSchema={validationSchema}
        initialValues={{
        name: '',
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
        <InputField label='Full Name' type='text' name='name' placeholder='Your Full Name' />
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