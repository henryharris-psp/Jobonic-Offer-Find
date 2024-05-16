'use client'

import React from "react";
import Link from "next/link";
import logo from "@/app/assets/logo.png";
import Image from "next/image"

interface NavBarProps {
  showOnlyLogo?: boolean
}

const Navbar = ({ showOnlyLogo = false }: NavBarProps) => {
    const handleLogoClick = () => {
        window.location.href = '/'
    }
  return (
      <section className="w-full h-16 sticky top-0 z-50"
      style={{
        background: 'linear-gradient( 89.5deg, rgba(131,204,255,1) 0.4%, rgba(66,144,251,1) 100.3% )',
      }}
      >
        <div className="flex container h-full">
          <div className="flex h-full">
            <Image src={logo} alt="logo" className="w-24 h-26 hover:cursor-pointer" onClick={handleLogoClick}></Image>
          </div>
          {!showOnlyLogo &&
          <div className="flex px-10">
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
                            <p>Chat</p>
                        </Link>
                    </li>
                </ul>
          </div>}
        </div>
      </section>
  );
};

export default Navbar;