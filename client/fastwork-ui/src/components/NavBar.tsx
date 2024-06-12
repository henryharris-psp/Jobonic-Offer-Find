'use client'

import React, { useState } from "react";
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import Image from "next/image"
import Drawer from "@/components/Drawer";
import Settings from "@/components/Settings";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import avatar from "@/../public/avatar.svg"

interface NavBarProps {
  showOnlyLogo?: boolean
  isEmployer?: boolean
}

const Navbar = ({ showOnlyLogo = false, isEmployer = false }: NavBarProps) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const router = useRouter()

  const dropdownItems: DropdownItem[] = [
    {
      icon: <Icon name='profile' />,
      content: 'Profile',
      onClick: () => setIsDrawerOpen(true),
    },
    {
      icon: <Icon name='fi-rr-settings' />,
      content: 'Settings',
      onClick: () => setIsDrawerOpen(true),
    },
    {
      icon: <Icon name='fi-rr-sign-out' />,
      content: 'Log Out',
      onClick: () => {
        router.push('/login')
      },

    }
  ]


    const handleLogoClick = () => {
        window.location.href = '/'
    }

    const handleDrawerCloseClicked = (): void => {
      setIsDrawerOpen(false)
    }
  return (
      <section className="h-16 sticky top-0 z-50"
      style={{
        background: 'linear-gradient( 89.5deg, rgba(131,204,255,1) 0.4%, rgba(66,144,251,1) 100.3% )',
      }}
      >
        <div className="flex container h-full w-full">
          <div className="flex h-full">
            <Image src={logo} alt="logo" className="w-24 h-26 hover:cursor-pointer" onClick={handleLogoClick}></Image>
          </div>
          {!showOnlyLogo &&
          <><div className="flex h-full ml-6">
            <ul className="hidden md:flex gap-x-6 text-white justify-between items-center">
              <li>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <p>Services</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contacts</p>
                </Link>
              </li>
              <li>
                <Link href="/chat">
                  <p>Messages</p>
                </Link>
              </li>
              <li>
                <Link href="/description/createJob">
                  <p>Create Job</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-1 justify-end items-center mr-[-200px]">
            <Dropdown icon='caret-down' items={dropdownItems} className="hover:bg-blue-300" />
          </div>
            </>
          }

            <Drawer drawerOpen={isDrawerOpen} title='Settings' handleClose={handleDrawerCloseClicked} showBackArrow width='w-full sm:w-1/3'>
              <Settings />
            </Drawer>
        </div>
      </section>
  );
};

export default Navbar;