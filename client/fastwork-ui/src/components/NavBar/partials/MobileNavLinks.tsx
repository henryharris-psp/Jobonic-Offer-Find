import { pageLinks } from '@/data/nav-bar'
import { UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const MobileNavLinks = () => {
  return (
    <div className="flex-1 bg-gradient-to-b from-[#E0F7FA] to-[#b8edf4]">
        <div className="flex flex-col mt-14">

            <div className="flex flex-col space-y-4 justify-center items-center p-3">
                <div className="bg-cyan-600 rounded-full h-20 w-20">

                </div>
                <span className="font-bold text-[#35617C]">
                    UserName
                </span>
            </div>

            <div className="flex flex-col">
                { pageLinks.map( page =>
                    <Link
                        href={page.path}
                        className="flex flex-row items-center justify-between h-12"
                    >
                        <div className="flex items-center justify-center h-full w-12 space-x-2">
                            <UserIcon className="text-cyan-700 w-5 h-5"/>
                        </div>
                        <div className="flex items-center justify-between flex-1 h-full border-b border-b-cyan-200">
                            <span className="text-sm text-cyan-700">
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