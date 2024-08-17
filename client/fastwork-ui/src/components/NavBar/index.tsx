"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon } from '@heroicons/react/24/solid';
import SideDrawer from "../SideDrawer";
import DesktopNavLinks from "./partials/DesktopNavLinks";
import MobileNavLinks from "./partials/MobileNavLinks";
import LoginSignUpButtonGroup from "./partials/LoginSignUpButtonGroup";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AuthUserAvatarDropDown from "./partials/AuthUserAvatarDropDown";

const NavBar = () => {
    const { authUser } = useSelector((state: RootState) => state.auth );
    const [showMobileNavDrawer, setShowMobileNavDrawer] = useState<boolean>(false);

    return (
        <div className="flex h-16 sticky top-0 z-50 bg-gradient-to-r from-[#35617C] to-[#10294D]">
            <div className="flex-1 space-x-5 flex items-center justify-between mx-4 md:mx-6 lg:mx-10">

                {/* jobonic logo */}
                <div className="flex items-cente space-x-3">
                    <button
                        className="flex items-center md:hidden"
                        onClick={() => setShowMobileNavDrawer(true)}
                    >
                        <Bars3Icon className="size-7 text-white hover:opacity-70 active:opacity-50" />
                    </button>
                    <Link href="/">
                        <img
                            src="/jobonic.svg"
                            alt="Jobonic Logo"
                            className="h-8 w-auto"
                        />
                    </Link>
                </div>

                {/* desktop nav links */}
                <div className="flex items-center space-x-3">
                    <div className="hidden md:block">
                        <DesktopNavLinks/>
                    </div>
                    { authUser ? (
                        !authUser.profile ? (
                            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 mt-1"
                                >
                                    <Link href="/createProfile">Create Profile</Link>
                                </button>
                            </div>
                        ) : (
                            <AuthUserAvatarDropDown/>
                        )
                    ) : (
                        <LoginSignUpButtonGroup/>
                    )}
                </div>
            </div>

            <SideDrawer
                show={showMobileNavDrawer}
                position="left"
                fullScreen
                onClose={() => setShowMobileNavDrawer(false)}
                zStack={10}
                type="front"
            >
                <MobileNavLinks/>
            </SideDrawer>
        </div>
    );
};

export default NavBar;