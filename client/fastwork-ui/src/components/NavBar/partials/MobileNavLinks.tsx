import { pageLinks } from '@/data/nav-bar'
import { UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MobileNavLinks = () => {
  return (
    <div className="flex-1 bg-white rounded-l-lg">
        <div className="flex flex-col mt-14">

            <div className="flex flex-col space-y-3 justify-center items-center p-3">
                <Image
                    alt="avata"
                    src="/group-image.jpg"
                    className="rounded-full"
                    width={70}
                    height={70}
                />
                <span className="font-bold text-cyan-800">
                    Laconic User
                </span>
            </div>

            <div className="flex flex-col">
                { pageLinks.map( page =>
                    <Link
                        href={page.path}
                        className="flex flex-row items-center justify-between h-12 hover:bg-gray-100"
                    >
                        <div className="flex items-center justify-center h-full w-12 space-x-2">
                            <UserIcon className="w-5 h-5 text-gray-600"/>
                        </div>
                        <div className="flex items-center justify-between flex-1 h-full border-b border-b-gray-100">
                            <span className="text-sm text-gray-600">
                                { page.name }
                            </span>
                        </div>
                    </Link>  
                )}
            </div>
        </div>
    </div>
  )
}

export default MobileNavLinks