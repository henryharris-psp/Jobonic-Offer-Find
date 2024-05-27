import Link from 'next/link'
import React, { useState } from 'react'

const Settings = (): React.ReactNode => {

  return (
    <div className='mx-5'>
      <ul className='space-y-2'>
        <li className='cursor-pointer p-2 rounded flex items-center'>
          <Link
            href='#'
          >
            My Profile
          </Link>
        </li>
        <li className='cursor-pointer p-2 rounded flex items-center'>
          <Link href='#'>Terms Of Service</Link>
        </li>
        <li className='cursor-pointer p-2 rounded flex items-center'>
          <Link href='#'>Privacy Policy</Link>
        </li>
      </ul>
    </div>
  )
}

export default Settings
