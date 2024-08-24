import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { unAuthenticate } from "@/store/reducers/authReducer";
import Image from "next/image";

const AuthUserAvatarDropDown = () => {
    const { authUser } = useSelector( (state: RootState) => state.auth );
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(unAuthenticate());
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <button className="flex items-center space-x-1 text-black rounded">
                <Image
                    height={40}
                    width={40}
                    src="/group-image.jpg"
                    alt="User Avatar"
                    className="rounded-full border border-white"
                />
            </button>
            {isHover && (
                <ul className="text-black absolute right-0 w-48 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    { !authUser?.profile ? (
                        <li className="flex justify-center p-2">
                            <Link
                                href="/createProfile"
                                className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center"
                            >
                                Create Profile
                            </Link>
                        </li>
                    ) : ''}
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer">
                        <label htmlFor="">{authUser?.profile.firstName}</label>
                    </li>
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer">
                        <label htmlFor="">{authUser?.profile.id} {authUser?.email}</label>
                    </li>
                    <hr />
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer">
                        <Link href="/myDashboard">My Dashboard</Link>
                    </li>
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myProfile">My Profile</Link>
                    </li>
                    <li className="px-4 py-3 text-sm hover:bg-gray-100 text-black cursor-pointer">
                        <Link href="/myRewardsEmployer">My Rewards</Link>
                    </li>
                    <li
                        className="px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogOut}
                    >
                        Sign Out
                    </li>
                </ul>
            )}
        </div>
    );
};

export default AuthUserAvatarDropDown;