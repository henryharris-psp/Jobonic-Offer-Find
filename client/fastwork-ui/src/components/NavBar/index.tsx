"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Drawer from "@/components/Drawer";
import Settings from "@/components/Settings";
import { useRouter, usePathname } from "next/navigation";
import { AUTH_UI_URL, baseURL, SERVER_AUTH } from "@/baseURL";
import httpAuth from "@/client/httpAuth";
import { Bars3Icon } from '@heroicons/react/24/solid';
import { availableLanguages, pageLinks } from "@/data/nav-bar";
import SideDrawer from "../SideDrawer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CaretUpIcon from "../../../public/icons/CaretDownIcon";
import DropDownButton from "../DropDownButton";
import DesktopNavLinks from "./partials/DesktopNavLinks";
import MobileNavLinks from "./partials/MobileNavLinks";

export interface NavBarProps {
    showOnlyLogo?: boolean;
    isEmployer?: boolean;
    signedIn?: boolean;
}

const NavBar = ({
    showOnlyLogo = false,
    isEmployer = false,
    signedIn = true,
}: NavBarProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const router = useRouter();
    const pathname = usePathname();
    const [token, setToken] = useState<string | null>(null);
    const [registerForm, setRegisterForm] = useState<string | null>(null);
    const [user, setUser] = useState<UserAuthData>({
        id: null,
        username: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        setToken(localStorage.getItem("access_token"));
        setRegisterForm(localStorage.getItem("registerFormPage"));
    }, []);

    const fetchUserAuth = async () => {
        const response = await httpAuth.get(`${SERVER_AUTH}/v1/user/init-data`);
        setUser(response.data);
    };

    const handleDropdownToggle = useCallback(() => {
        setIsDropdownOpen((prev) => !prev);
    }, []);

    const handleLanguageDropdownToggle = useCallback(() => {
        setIsLanguageDropdownOpen((prev) => !prev);
    }, []);

    const handleSignOut = useCallback(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setToken(null);
        setIsDropdownOpen(false);
        router.push("/");
    }, [router]);

    const handleLogoClick = useCallback(() => {
        router.push("/");
    }, [router]);

    const handleDrawerCloseClicked = useCallback((): void => {
        setIsDrawerOpen(false);
    }, []);

    const handleLogin = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        window.location.href = `${AUTH_UI_URL}/authentication?page=logout`;
    };

    const getLinkClass = useCallback(
        (path: string) => {
            return pathname === path ? "bg-white text-[#35617C]" : "";
        },
        [pathname]
    );

    useEffect(() => {
        if (token) {
            void fetchUserAuth();
        }
    }, [token]);


    //new
    const { isMobile } = useSelector((state: RootState) => state.ui);
    const [showMobileNavDrawer, setShowMobileNavDrawer] = useState<boolean>(false);

    return (
        <div className="h-16 p-4 sticky top-0 z-50 bg-gradient-to-r from-[#35617C] to-[#10294D]">
            <div className="container mx-auto flex h-full items-center justify-between">
                <div className="flex items-center justify-center">
                    <span
                        className="text-2xl font-semibold text-white cursor-pointer flex items-center"
                        onClick={handleLogoClick}
                    >
                        <img
                            src="/jobonic.svg"
                            alt="Jobonic Logo"
                            className="h-8 w-auto"
                        />
                    </span>
                </div>
                
                { isMobile ? (
                    //mobile nav drawer toggle
                    <button 
                        className="flex items-center"
                        onClick={() => setShowMobileNavDrawer(true)}
                    >
                        <Bars3Icon className="size-8 text-white hover:opacity-70 active:opacity-50" />
                    </button>
                ) : (
                    <DesktopNavLinks
                        registerForm={registerForm}
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    />
                )}
            </div>

            <SideDrawer
                show={showMobileNavDrawer}
                position="right"
                fullScreen
                onClose={() => setShowMobileNavDrawer(false)}
                zStack={10}
            >
                <MobileNavLinks/>
            </SideDrawer>
        </div>
    );
};

export default NavBar;
