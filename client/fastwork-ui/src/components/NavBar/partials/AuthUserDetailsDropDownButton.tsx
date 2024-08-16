import React, { useState } from "react";
import CaretDownIcon from "../../../../public/icons/CaretDownIcon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";

const AuthUserDetailsDropDownButton = () => {
    const { authUser } = useSelector( (state: RootState) => state.auth );
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        // dispatch(logout());
    }
    return (
        <li
            className="p-2 hover:bg-white hover:text-[#35617C] rounded-md"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <button className="flex items-center space-x-2">
                <img
                    src="/group-image.jpg"
                    alt="User Avatar"
                    className="lg:w-8 lg:h-8 sm:w-6 sm:h-6 rounded-full object-cover"
                />
                <label>{authUser?.firstName}</label>
                <CaretDownIcon
                    className={`w-4 h-4 transition-transform${
                        isHover
                            ? "rotate-180 text-black"
                            : "text-white"
                    }`}
                />
            </button>

            {isHover && (
                <ul className="text-black absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <li className="p-2 hover:bg-gray-100 hover:rounded-t-md cursor-pointer">
                        <label htmlFor="">{authUser?.email}</label>
                    </li>
                    <hr />
                    <li className="p-2 hover:bg-gray-100 hover:rounded-t-md cusor-pointer">
                        <Link href="/myDashboard">My Dashboard</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myProfile">My Profile</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myRewardsEmployer">My Rewards</Link>
                    </li>
                    <li
                        className="p-2 hover:bg-gray-100 hover:rounded-b-md cursor-pointer"
                        onClick={handleLogOut}
                    >
                        Sign Out
                    </li>
                </ul>
            )}
        </li>
    );
};

export default AuthUserDetailsDropDownButton;