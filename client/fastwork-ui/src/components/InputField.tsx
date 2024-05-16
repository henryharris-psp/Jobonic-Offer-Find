'use client'
import React, { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import eye from '@/../public/eye-on.svg'
import eyeOff from '@/../public/eye-off.svg'
import { Field, ErrorMessage, useFormikContext } from 'formik'

interface InputFieldProps {
  as?: string
  label?: string
  name: string
  type?: string
  placeholder?: string
  className?: string
  value?: string
  isDisabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({
  as,
  label,
  name,
  type = 'text',
  placeholder,
  className = 'input input-bordered focus:outline-0 hover:outline-0 w-full',
  value,
  isDisabled = false,
  onChange
}: InputFieldProps): React.ReactNode => {
  const [showPassword, setShowPassword] = useState(false)
  const formik: any = useFormikContext()
  const { setFieldValue, errors } = useFormikContext()

  const handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const { name, value } = event.target;
    try {
      await setFieldValue(name, value.trim() === '' ? '' : value);
      if (typeof onChange === 'function') {
        onChange(event);
      }
    } catch (error) {
      console.error('Error setting field value:', error);
    }
  };
  
  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-black mb-1'>
        {label}
      </label>
      <div className='relative'>
        <Field
          as={as}
          disabled={isDisabled}
          type={showPassword ? 'text' : type}
          id={name} name={name} value={formik.values[name] || value || ''}
          className={`${className} text-black ${
            formik?.errors[name] && formik?.touched[name]
              ? 'border border-red-500 hover:border-red-500 focus:border-red-500 hover:outline-0 focus:outline-0'
              : 'border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 hover:border-gray-400'
          } h-10 rounded-md`}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {type === 'password' && (
          <button
            className='absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer hover:bg-gray-200 rounded-r-md'
            onClick={() =>
              setShowPassword(!showPassword)}
          >
            {showPassword ? <Image src={eye} alt='' /> : <Image src={eyeOff} alt='' />}
          </button>
        )}
      </div>

      <ErrorMessage name={name} component='div' className='text-red-500 text-sm mt-1' />
    </div>
  )
}

export default InputField
