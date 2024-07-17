'use client';

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Drawer from "@/components/Drawer";
import Settings from "@/components/Settings";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { AUTH_UI_URL } from "@/baseURL";

interface NavBarProps {
  showOnlyLogo?: boolean;
  isEmployer?: boolean;
  signedIn?: boolean;
}

const NavbarComponent = ({ showOnlyLogo = false, isEmployer = false, signedIn = true }: NavBarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, []);


  const handleDropdownToggle = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleLanguageDropdownToggle = useCallback(() => {
    setIsLanguageDropdownOpen((prev) => !prev);
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setIsDropdownOpen(false);
    router.push("/");
  }, [router]);

  const handleLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    setIsLanguageDropdownOpen(false);
  }, []);

  const handleDrawerCloseClicked = useCallback((): void => {
    setIsDrawerOpen(false);
  }, []);

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    window.location.href = `${AUTH_UI_URL}/authentication?page=logout`;
  };

  const getLinkClass = useCallback((path: string) => {
    return pathname === path ? "bg-white text-[#35617C]" : "";
  }, [pathname]);

  return (
    <div
      className="h-16 p-4 sticky top-0 z-50"
      style={{
        background: "linear-gradient(to right, #35617C, #10294D)",
      }}
    >
      <div className="container mx-auto flex h-full items-center justify-between">
        <div className="flex items-center justify-center">
          <span className="text-2xl font-semibold text-white cursor-pointer flex items-center"
            onClick={handleLogoClick}>
            <img  src="/jobonic.svg" alt="Jobonic Logo" className="h-8 w-auto" />
          </span>
        </div>
        {!showOnlyLogo && (
          <div className="flex items-center space-x-4 text-sm">
            <ul className="flex gap-x-4 text-white items-center font-medium">
              <li className={`p-2 hover:bg-white hover:text-[#35617C] rounded-md ${getLinkClass('/about')}`}>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li className={`p-2 hover:bg-white hover:text-[#35617C] rounded-md ${getLinkClass('/findServices')}`}>
                <Link href="/findServices">
                  <p>Find Services</p>
                </Link>
              </li>
              <li className={`p-2 hover:bg-white hover:text-[#35617C] rounded-md ${getLinkClass('/offerServices')}`}>
                <Link href="/offerServices">
                  <p>Offer Services</p>
                </Link>
              </li>
              <li className={`p-2 hover:bg-white hover:text-[#35617C] rounded-md ${getLinkClass('/chat')}`}>
                <Link href="/chat">
                  <p>Messages</p>
                </Link>
              </li>
              <li className={`p-2 hover:bg-white hover:text-[#35617C] rounded-md ${getLinkClass('/privileges')}`}>
                <Link href="/privileges">
                  <p>Privileges</p>
                </Link>
              </li>
              <li className="p-2 hover:bg-white hover:text-[#35617C] rounded-md relative"
                onMouseEnter={() => setIsLanguageDropdownOpen(true)}
                onMouseLeave={() => setIsLanguageDropdownOpen(false)}>
                <button
                  className="flex items-center space-x-2">
                  <p>{selectedLanguage}</p>
                  <svg
                    className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isLanguageDropdownOpen && (
                  <ul className="text-black absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                    onMouseEnter={() => setIsLanguageDropdownOpen(true)}
                    onMouseLeave={() => setIsLanguageDropdownOpen(false)}>
                    <li className="p-2 hover:bg-gray-100 hover:rounded-t-md cursor-pointer" onClick={() => handleLanguageChange('English')}>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        English
                      </a>
                    </li>
                    <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleLanguageChange('中文')}>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        中文
                      </a>
                    </li>
                    <li className="p-2 hover:bg-gray-100 hover:rounded-b-md cursor-pointer" onClick={() => handleLanguageChange('ไทย')}>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        ไทย
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              {!signedIn && (
                <li className={`p-2 hover:bg-white hover:text-[#35617C] rounded-md ${getLinkClass('/login')}`}>
                  <Link href="/login">
                    <p>Sign In</p>
                  </Link>
                </li>
              )}
              {/* {signedIn &&  */}
              {!token ? (
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={(e) => void handleLogin(e)}
                  >
                    Log In
                  </button>
                </div>
              ) : (
                <li className="p-2 hover:bg-white hover:text-[#35617C] rounded-md relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}>
                  <button
                    className="flex items-center space-x-2"
                  >
                    <img src="/group-image.jpg" alt="User Avatar" className="lg:w-8 lg:h-8 sm:w-6 sm:h-6 rounded-full object-cover" />
                    <svg
                      className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.292 7.292a1 1 0 011.414 0L10 10.586l3.293-3.294a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <ul className="text-black absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}>
                      <li className="p-2 hover:bg-gray-100 hover:rounded-t-md cursor-pointer">
                        <Link href="/myDashboard">My Dashboard</Link>
                      </li>
                      <li className="p-2 hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myProfile">My Profile</Link>
                      </li>
                      <li className="p-2 hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myRewardsEmployer">My Rewards</Link>
                      </li>
                      <li className="p-2 hover:bg-gray-100 hover:rounded-b-md cursor-pointer" onClick={handleSignOut}>
                        Sign Out
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        )}
        <Drawer
          drawerOpen={isDrawerOpen}
          title="Settings"
          handleClose={handleDrawerCloseClicked}
          showBackArrow
          width="w-full sm:w-1/3"
        >
          <Settings />
        </Drawer>
      </div>
    </div>
  );
};

export default NavbarComponent;





