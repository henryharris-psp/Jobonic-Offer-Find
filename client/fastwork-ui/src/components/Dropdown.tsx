import React, { ReactNode } from 'react'
import Icon from './Icon'
import avatar from "@/../public/avatar.svg"
import Image from "next/image"

interface DropdownProps {
  items: DropdownItem[]
  icon: string
  id?: string
  row?: string
  data?: any
  buttonTitle?: string
  className?: string
  profileImage?: string
}
export interface DropdownItem {
  content: ReactNode
  icon?: ReactNode
  onClick: (id?: string, row?: string, data?: any) => void
}

const Dropdown = ({ items, icon, id, row, data, className = '', buttonTitle = '', profileImage = '' }: DropdownProps): React.ReactNode => {
  return (
    <div className='dropdown sm:dropdown-end rounded-lg'>
          <div tabIndex={0} role='button' className={`btn btn-primary bg-transparent font-normal ${className}`}>
            <Image src={profileImage ? profileImage : avatar} alt="avatar" className="w-8 h-8 rounded-full" />
            <Icon name={icon} />
          </div>
      <ul
        className={`dropdown-content z-[1] menu p-2 shadow bg-white w-52 rounded-lg`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <button
              tabIndex={0} onClick={(): void => {
                item.onClick(id, row, data)
              }}
            >
              {item.icon !== null && <span className='mr-2'>{item.icon}</span>}
              {item.content}
            </button>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Dropdown
