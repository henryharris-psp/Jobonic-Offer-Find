'use client'
import { useFormikContext } from 'formik'
import { ReactNode } from 'react'

interface ButtonProps {
  title?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  border?: string
  block?: string
  size?: string
  variant?: string
  tabIndex?: number
  role?: 'button'
  children: ReactNode
  onClick?: () => void
}

const Button = ({
  title,
  type,
  border,
  block,
  size,
  variant,
  tabIndex,
  role,
  children,
  onClick,
}: ButtonProps): React.ReactElement => {
  const submitButton = useFormikContext()
  const buttonClasses = [border, block, size, variant].filter(Boolean).join(' ')
  let buttonClassName = `btn ${buttonClasses} disabled:bg-primary `
  if (submitButton?.isSubmitting) buttonClassName += 'opacity-40'

  const handleSubmit = async () => {
    submitButton?.handleSubmit()
  }

  return (
      <button
          type={type}
          className={buttonClassName}
          disabled={submitButton?.isSubmitting}
          tabIndex={tabIndex}
          role={role}
          onClick={handleSubmit}
      >
        {submitButton?.isSubmitting ? "Loading": children}
        {title}
      </button>
  //<span className='loading loading-spinner loading-md text-white '/>
  );
};

export default Button;
