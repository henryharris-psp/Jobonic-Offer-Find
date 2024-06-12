import React from 'react'

interface FormContainerProps {
  children: React.ReactNode,
  className?: string
  marginTop?: string
}

const FormContainer = ({ children, className = ' ', marginTop = 'mt-28' }: FormContainerProps): React.ReactNode => {
  return (
    <section
      className='flex-grow'
      style={{
        background: 'linear-gradient( 89.5deg,  rgba(66,144,251,1) 0.4%, rgba(131,204,255,1) 100.3% )',
      }}
    >
      <div className={`${className} container px-4 sm:px-6 pb-36 h-full flex justify-center items-center`}>
        <div className={`bg-gray-100 px-4 sm:px-10 py-10 rounded-lg my-2.5 ${marginTop}`} style={{ height: '80%', width: '70%' }}>
          {children}
        </div>
      </div>
    </section>
  )
}

export default FormContainer
